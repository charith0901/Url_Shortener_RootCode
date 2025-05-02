package com.rootcode.urlShortener_backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String propertyID;
    @Column(length = 2048)
    private String originalUrl;
    @Column(length = 255,unique = true)
    private String alias;
    private int clicks;
    @CreatedDate
    private LocalDate createdAt;
    private LocalDateTime expiresAt;
}
