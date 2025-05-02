package com.rootcode.urlShortener_backend.dto.request;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UrlCreateDto {
    private String originalUrl;
    private String customAlias;
    private int expireDuration;
}
