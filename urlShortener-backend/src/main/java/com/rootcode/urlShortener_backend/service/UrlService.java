package com.rootcode.urlShortener_backend.service;

import com.rootcode.urlShortener_backend.dto.repsonse.UrlResponseDto;
import com.rootcode.urlShortener_backend.dto.request.UrlCreateDto;
import org.springframework.data.domain.Page;

public interface UrlService {

    UrlResponseDto getUrl(String alias);

    UrlResponseDto createUrl(UrlCreateDto dto);

    Page<UrlResponseDto> getAllUrl(int page, int size, String sortBy, String keyword);

    UrlResponseDto updateClicks(String alias);

    Object deleteUrl(String alias);
}
