package com.faisal.tasktracker.service;

import com.faisal.tasktracker.dto.QueryIntent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class IntentDetectionService {

    private static final Logger log = LoggerFactory.getLogger(IntentDetectionService.class);

    private static final Pattern DATE_PATTERN = Pattern.compile(
            "\\b(\\d{4}-\\d{2}-\\d{2})\\b|today|tomorrow|yesterday|this week|last week",
            Pattern.CASE_INSENSITIVE);

    public QueryIntent detect(String message) {
        log.info(">>> Intent Detection Started for message: \"{}\"", message);

        if (message == null || message.trim().isEmpty()) {
            log.warn("Message is null or empty. Defaulting to ALL intent.");
            return QueryIntent.forAll();
        }

        String trimmedMessage = message.trim();
        String lower = trimmedMessage.toLowerCase();

        log.debug("Lowercase message: \"{}\"", lower);

        // Extract words
        List<String> words = Arrays.asList(trimmedMessage.split("\\s+"));
        log.debug("Split words: {}", words);

        // Filter potential name tokens
        List<String> potentialNames = words.stream()
                .filter(w -> w.length() > 2)
                .filter(w -> !isCommonWord(w.toLowerCase()))
                .map(w -> w.replaceAll("[^a-zA-Z]", ""))  // Remove punctuation, numbers, etc.
                .filter(w -> !w.isEmpty())
                .toList();

        log.info("Potential name tokens after filtering: {}", potentialNames);

        // Check if this looks like a user-specific query
        boolean hasForOrOf = lower.contains(" for ") || lower.contains(" of ");
        log.debug("Contains 'for' or 'of'? {}", hasForOrOf);

        if (!potentialNames.isEmpty() && hasForOrOf) {
            log.info("Detected USER intent with name tokens: {}", potentialNames);
            return QueryIntent.forUsers(potentialNames);
        } else {
            log.debug("Not qualifying as USER intent (no name tokens or missing 'for/of')");
        }

        // Check for date patterns
        Matcher matcher = DATE_PATTERN.matcher(trimmedMessage);
        if (matcher.find()) {
            String matched = matcher.group();
            log.info("Detected DATE pattern: '{}'. Using default range (last 7 days to today).", matched);

            LocalDate from = LocalDate.now().minusDays(7);
            LocalDate to = LocalDate.now();
            return QueryIntent.forDateRange(from, to);
        } else {
            log.debug("No date pattern found in message.");
        }

        // Default fallback
        log.info("Defaulting to ALL tasks intent.");
        return QueryIntent.forAll();
    }

    private boolean isCommonWord(String word) {
        return switch (word) {
            case "the", "for", "give", "show", "me", "my", "a", "an",
                 "summary", "tasks", "task", "critical", "all", "please",
                 "can", "you", "get", "list", "of", "and" -> true;
            default -> false;
        };
    }
}