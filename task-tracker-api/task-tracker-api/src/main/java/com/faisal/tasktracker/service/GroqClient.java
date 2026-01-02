package com.faisal.tasktracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GroqClient {

    @Value("${groq.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String ask(String context, String question) {
        String prompt = """
                You are a helpful task management assistant for the team.
                Use the data below to answer the question naturally and conversationally.
                Include summaries, critical/high-priority tasks, deadlines, and workload insights.
                If there are no tasks, say "No tasks assigned yet."
                If priority is not set, treat it as medium/normal.

                DATA:
                %s

                QUESTION:
                %s
                """.formatted(context, question);

        Map<String, Object> body = Map.of(
                "model", "openai/gpt-oss-20b",  // Fast & good as of 2026
                "messages", new Object[]{Map.of("role", "user", "content", prompt)},
                "temperature", 0.5,
                "max_tokens", 1024
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    "https://api.groq.com/openai/v1/chat/completions",
                    entity,
                    Map.class
            );

            Map<?, ?> respBody = response.getBody();
            if (respBody == null || respBody.get("choices") == null) {
                return "Error: Empty response from AI service.";
            }

            return (String) ((Map<?, ?>) ((Map<?, ?>) ((java.util.List<?>) respBody.get("choices"))
                    .get(0)).get("message")).get("content");

        } catch (Exception e) {
            return "Error contacting AI service: " + e.getMessage();
        }
    }
}