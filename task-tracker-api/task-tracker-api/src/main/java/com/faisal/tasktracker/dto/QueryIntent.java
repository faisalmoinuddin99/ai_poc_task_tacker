package com.faisal.tasktracker.dto;

import java.time.LocalDate;
import java.util.List;

public record QueryIntent(
        Type type,
        List<String> nameTokens,
        LocalDate from,
        LocalDate to
) {
    public enum Type { USER, DATE_RANGE, ALL }

    public static QueryIntent forUsers(List<String> tokens) {
        return new QueryIntent(Type.USER, tokens, null, null);
    }

    public static QueryIntent forDateRange(LocalDate from, LocalDate to) {
        return new QueryIntent(Type.DATE_RANGE, null, from, to);
    }

    public static QueryIntent forAll() {
        return new QueryIntent(Type.ALL, null, null, null);
    }
}