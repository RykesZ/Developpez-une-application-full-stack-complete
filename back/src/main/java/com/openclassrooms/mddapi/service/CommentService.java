package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.dto.CreateCommentDTO;

@Service
public class CommentService implements ICommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
    }

    @Override
    public CommentDTO createComment(Long userId, CreateCommentDTO createCommentDto) {
        User author = userRepository.findUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Article article = articleRepository.findById(createCommentDto.getArticleId())
                .orElseThrow(() -> new RuntimeException("Article not found"));

        Comment comment = new Comment();
        comment.setAuthor(author);
        comment.setArticle(article);
        comment.setContent(createCommentDto.getContent());

        Comment savedComment = commentRepository.save(comment);
        return convertToDto(savedComment);
    }

    private CommentDTO convertToDto(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setArticleId(comment.getArticle().getId());
        dto.setAuthorUsername(comment.getAuthor().getUsername());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());
        return dto;
    }
}