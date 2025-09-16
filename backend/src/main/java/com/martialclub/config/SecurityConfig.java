package com.martialclub.config;

import com.martialclub.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/auth/**", "/api/users/register", "/h2-console/**").permitAll()

                        // 🔑 профиль только для авторизованных
                        .requestMatchers(HttpMethod.GET, "/api/users/**").authenticated()

                        .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/reviews/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/reviews/**").hasRole("ADMIN")

                        // остальные правила как раньше
                        .requestMatchers(HttpMethod.GET, "/api/schedule/**").authenticated()
                        .requestMatchers("/api/schedule/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/trainers/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/martial-arts/**").permitAll()

                        .requestMatchers("/api/trainers/**").hasRole("ADMIN")
                        .requestMatchers("/api/martial-arts/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }
}