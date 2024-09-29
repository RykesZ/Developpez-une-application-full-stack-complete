package com.openclassrooms.mddapi.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ArticleDTO {
    private Long id;
    private String authorUsername;
    private String topicTitle;
    private String title;
    private String content;
    private Date createdAt;
    private Date updatedAt;
}
