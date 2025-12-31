package com.faisal.tasktracker.controller;

import com.faisal.tasktracker.service.GroqService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final GroqService groqService;

    // Constructor-based injection
    public AiController(GroqService groqService) {
        this.groqService = groqService;
    }



    @PostMapping("/ask")
    public String askGroq(@RequestBody String question) {
        return groqService.askQuestion(question);
    }
}
