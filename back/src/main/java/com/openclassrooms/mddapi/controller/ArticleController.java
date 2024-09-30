package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.service.IArticleService;
import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CreateArticleDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    private final IArticleService articleService;

    @Autowired
    public ArticleController(IArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<List<ArticleDTO>> getArticlesForUser() {
        User currentUser = getCurrentUser();
        List<ArticleDTO> articles = articleService.getArticlesForUser(currentUser.getId());
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<Optional<ArticleDTO>> getArticle(@PathVariable Long articleId) {
        User currentUser = getCurrentUser();
        Optional<ArticleDTO> article = articleService.getArticle(articleId);
        return ResponseEntity.ok(article);
    }

    @PostMapping
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody CreateArticleDTO createArticleDto) {
        User currentUser = getCurrentUser();
        ArticleDTO createdArticle = articleService.createArticle(currentUser.getId(), createArticleDto);
        return ResponseEntity.ok(createdArticle);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof User)) {
            throw new RuntimeException("User not authenticated or invalid authentication type");
        }
        return (User) authentication.getPrincipal();
    }
}