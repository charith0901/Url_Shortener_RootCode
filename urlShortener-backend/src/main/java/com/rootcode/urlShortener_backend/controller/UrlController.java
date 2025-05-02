package com.rootcode.urlShortener_backend.controller;

import com.rootcode.urlShortener_backend.dto.StandardResponseDto;
import com.rootcode.urlShortener_backend.dto.request.UrlCreateDto;
import com.rootcode.urlShortener_backend.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/api/url")
@RequiredArgsConstructor
public class UrlController {
    private final UrlService urlService;
    @GetMapping("/{alias}")
    public ResponseEntity<StandardResponseDto> getUrl(@PathVariable String alias) {
        return new ResponseEntity<>(
                StandardResponseDto.builder()
                        .status(200)
                        .message("Url data")
                        .data(urlService.getUrl(alias))
                        .build(), HttpStatus.OK
        );
    }
    @GetMapping("")
    public ResponseEntity<StandardResponseDto> getAllUrl(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size,
                                                         @RequestParam(required = false) String sortBy,
                                                         @RequestParam(defaultValue = "") String keyword) {
        return new ResponseEntity<>(
                StandardResponseDto.builder()
                        .status(200)
                        .message("all urls")
                        .data(urlService.getAllUrl(page,size,sortBy,keyword))
                        .build(),HttpStatus.OK
        );
    }

    @PostMapping("")
    public ResponseEntity<StandardResponseDto> createUrl(@RequestBody UrlCreateDto dto){
        return new ResponseEntity<>(
                StandardResponseDto.builder()
                        .status(200)
                        .message("created url")
                        .data(urlService.createUrl(dto))
                        .build(),HttpStatus.CREATED
        );
    }
    @PatchMapping("/updateClicks/{alias}")
    public ResponseEntity<StandardResponseDto> updateClicks(@PathVariable String alias){
        return new ResponseEntity<>(
                StandardResponseDto.builder()
                        .status(200)
                        .message("updated")
                        .data(urlService.updateClicks(alias))
                        .build(),HttpStatus.OK
        );
    }
}
