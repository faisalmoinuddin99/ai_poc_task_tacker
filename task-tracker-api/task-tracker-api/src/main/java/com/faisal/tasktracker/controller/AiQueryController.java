package com.faisal.tasktracker.controller;

import com.faisal.tasktracker.dto.AiRequest;
import com.faisal.tasktracker.dto.AiResponse;
import com.faisal.tasktracker.service.AiOrchestratorService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v2/ai")
public class AiQueryController {

    private final AiOrchestratorService aiService;

    public AiQueryController(AiOrchestratorService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/ask")
    public AiResponse ask(@RequestBody AiRequest request) {
        String answer = aiService.handle(request.message());
        return new AiResponse(answer);
    }
}