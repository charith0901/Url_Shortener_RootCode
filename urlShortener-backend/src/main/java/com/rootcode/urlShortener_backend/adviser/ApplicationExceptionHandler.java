package com.rootcode.urlShortener_backend.adviser;

import com.rootcode.urlShortener_backend.dto.StandardResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<StandardResponseDto> handleRuntimeException(RuntimeException e) {
        return new ResponseEntity<>(
                StandardResponseDto.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .data(e)
                        .build(), HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
