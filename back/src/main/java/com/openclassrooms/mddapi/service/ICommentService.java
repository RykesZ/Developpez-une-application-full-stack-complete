package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.dto.CreateCommentDTO;

public interface ICommentService {
    CommentDTO createComment(Long userId, CreateCommentDTO createCommentDto);
}
