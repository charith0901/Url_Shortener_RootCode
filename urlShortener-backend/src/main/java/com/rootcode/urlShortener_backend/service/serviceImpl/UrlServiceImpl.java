package com.rootcode.urlShortener_backend.service.serviceImpl;

import com.rootcode.urlShortener_backend.dto.repsonse.UrlResponseDto;
import com.rootcode.urlShortener_backend.dto.request.UrlCreateDto;
import com.rootcode.urlShortener_backend.model.Url;
import com.rootcode.urlShortener_backend.repository.UrlRepository;
import com.rootcode.urlShortener_backend.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UrlServiceImpl implements UrlService {
    private final UrlRepository urlRepository;
    @Override
    public UrlResponseDto getUrl(String alias) {
        return mapToDto(urlRepository.findByAlias(alias).orElseThrow(()->new RuntimeException("Not Found")));
    }

    @Override
    public UrlResponseDto createUrl(UrlCreateDto dto) {
        return mapToDto(urlRepository.save(mapToEntity(dto)));
    }

    @Override
    public Page<UrlResponseDto> getAllUrl(int page, int size, String sortBy, String keyword) {
        PageRequest pageRequest = PageRequest.of(page,size,Sort.by(sortBy).descending());
        Page<Url> urls = urlRepository.findGetAllUrl(keyword,pageRequest);
        return urls.map(this::mapToDto);
    }


    public UrlResponseDto mapToDto(Url url) {
        return UrlResponseDto.builder()
                .originalUrl(url.getOriginalUrl())
                .alias(url.getAlias())
                .clicks(url.getClicks())
                .createdAt(url.getCreatedAt())
                .expiresAt(url.getExpiresAt())
                .build();
    }
    public Url mapToEntity(UrlCreateDto dto) {
        return Url.builder()
                .originalUrl(dto.getOriginalUrl())
                .expiresAt(LocalDateTime.now().plusDays(dto.getExpireDuration()))
                .alias(dto.getCustomAlias())
                .clicks(0)
                .build();
    }
}
