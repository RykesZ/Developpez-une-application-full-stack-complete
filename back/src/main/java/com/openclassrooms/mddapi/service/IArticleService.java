package com.openclassrooms.mddapi.service;

import java.util.List;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CreateArticleDTO;

public interface IArticleService {
    List<ArticleDTO> getArticlesForUser(Long userId);
    ArticleDTO createArticle(Long userId, CreateArticleDTO createArticleDto);
}