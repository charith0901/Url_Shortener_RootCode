package com.rootcode.urlShortener_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class StandardResponseDto {
    int status;
    String message;
    Object data;
}
