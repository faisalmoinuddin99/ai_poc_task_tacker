package com.faisal.tasktracker.dto;

import lombok.Data;
import java.util.List;

@Data
public class GroqRequest {
    private String model;
    private List<GroqMessage> messages;
    private Double temperature;
    private Integer max_completion_tokens;
    private Double top_p;
    private String reasoning_effort;
    private Object stop; // can be null

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<GroqMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<GroqMessage> messages) {
        this.messages = messages;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Integer getMax_completion_tokens() {
        return max_completion_tokens;
    }

    public void setMax_completion_tokens(Integer max_completion_tokens) {
        this.max_completion_tokens = max_completion_tokens;
    }

    public Double getTop_p() {
        return top_p;
    }

    public void setTop_p(Double top_p) {
        this.top_p = top_p;
    }

    public String getReasoning_effort() {
        return reasoning_effort;
    }

    public void setReasoning_effort(String reasoning_effort) {
        this.reasoning_effort = reasoning_effort;
    }

    public Object getStop() {
        return stop;
    }

    public void setStop(Object stop) {
        this.stop = stop;
    }
}
