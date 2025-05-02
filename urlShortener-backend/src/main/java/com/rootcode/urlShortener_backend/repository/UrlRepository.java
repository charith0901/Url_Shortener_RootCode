package com.rootcode.urlShortener_backend.repository;

import com.rootcode.urlShortener_backend.model.Url;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UrlRepository  extends JpaRepository<Url, String> {
    Optional<Url> findByAlias(String alias);

    @Query("SELECT u FROM Url u " +
            "WHERE (:keyword IS NULL OR " +
            "LOWER(u.alias) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(u.originalUrl) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Url> findGetAllUrl(@Param("keyword") String keyword, Pageable pageRequest);
}
