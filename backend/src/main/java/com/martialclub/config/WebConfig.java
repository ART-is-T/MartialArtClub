package com.martialclub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")   // ✅ Разрешаем все origin'ы (удобно для разработки)
                        .allowedMethods("*")          // ✅ Разрешаем все HTTP методы (GET, POST, PUT, DELETE...)
                        .allowedHeaders("*")          // ✅ Разрешаем любые заголовки
                        .allowCredentials(true);      // ✅ Разрешаем отправку cookie/headers вместе с запросами
            }
        };
    }
}