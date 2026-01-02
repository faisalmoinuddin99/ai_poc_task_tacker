package com.faisal.tasktracker.service;

import com.faisal.tasktracker.dto.QueryIntent;
import org.springframework.stereotype.Service;

import java.util.StringJoiner;

@Service
public class AiOrchestratorService {

    private final IntentDetectionService intentDetectionService;
    private final TaskContextService contextService;
    private final GroqClient groqClient;

    public AiOrchestratorService(IntentDetectionService intentDetectionService,
                                 TaskContextService contextService,
                                 GroqClient groqClient) {
        this.intentDetectionService = intentDetectionService;
        this.contextService = contextService;
        this.groqClient = groqClient;
    }

    public String handle(String message) {
        QueryIntent intent = intentDetectionService.detect(message);

        String context = switch (intent.type()) {
            case USER -> {
                StringJoiner joiner = new StringJoiner(" ");
                intent.nameTokens().forEach(joiner::add);
                yield contextService.buildForUser(joiner.toString());
            }
            case DATE_RANGE -> contextService.buildForDateRange(intent.from(), intent.to());
            case ALL -> contextService.buildForAll();
        };

        return groqClient.ask(context, message);
    }
}