package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.dto.CreateCommentDTO;

import java.util.List;

public interface ICommentService {
    CommentDTO createComment(Long userId, CreateCommentDTO createCommentDto);
    List<CommentDTO> getCommentsByArticleId(Long articleId);
}
