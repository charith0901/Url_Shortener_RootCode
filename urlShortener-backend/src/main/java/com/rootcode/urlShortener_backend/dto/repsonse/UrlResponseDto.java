package com.rootcode.urlShortener_backend.dto.repsonse;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class UrlResponseDto {
    private String originalUrl;
    private String alias;
    private int clicks;
    private LocalDate createdAt;
    private LocalDateTime expiresAt;
}
