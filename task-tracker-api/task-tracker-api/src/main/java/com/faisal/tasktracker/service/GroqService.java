package com.faisal.tasktracker.service;

import com.faisal.tasktracker.dto.GroqMessage;
import com.faisal.tasktracker.dto.GroqRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    private final WebClient webClient;

    @Value("${groq.model}")
    private String model;

    public GroqService(WebClient groqWebClient) {
        this.webClient = groqWebClient;
    }

    public String askQuestion(String question) {

        GroqRequest request = new GroqRequest();
        request.setModel(model);
        request.setMessages(List.of(new GroqMessage("user", question)));
        request.setTemperature(1.0);
        request.setMax_completion_tokens(8192);
        request.setTop_p(1.0);
        request.setReasoning_effort("medium");
        request.setStop(null);

        return webClient.post()
                .uri("/chat/completions")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Map.class)
                .map(res -> {
                    var choices = (List<Map<String, Object>>) res.get("choices");
                    var message = (Map<String, Object>) choices.get(0).get("message");
                    return message.get("content").toString();
                })
                .block();
    }
}
