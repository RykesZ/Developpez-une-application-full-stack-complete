package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CreateArticleDTO;
import com.openclassrooms.mddapi.model.Article;

public interface IArticleService {
    List<ArticleDTO> getArticlesForUser(Long userId);
    Optional<ArticleDTO> getArticle(Long articleId);
    ArticleDTO createArticle(Long userId, CreateArticleDTO createArticleDto);
}