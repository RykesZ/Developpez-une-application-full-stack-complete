package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CreateArticleDTO;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleService implements IArticleService {
	private final ArticleRepository articleRepository;
	private final UserRepository userRepository;
	private final TopicRepository topicRepository;

	public ArticleService(ArticleRepository articleRepository, UserRepository userRepository, TopicRepository topicRepository) {
		this.articleRepository = articleRepository;
		this.userRepository = userRepository;
		this.topicRepository = topicRepository;
	}

	@Override
	@Transactional
	public List<ArticleDTO> getArticlesForUser(Long userId) {
		User user = userRepository.findUserById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));
		List<Article> articles = articleRepository.findByTopicsOrderByCreatedAtDesc(user.getSubscribedTopics());
		return articles.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public ArticleDTO createArticle(Long userId, CreateArticleDTO createArticleDto) {
		User author = userRepository.findUserById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));
		Topic topic = topicRepository.findById(createArticleDto.getTopicId())
				.orElseThrow(() -> new RuntimeException("Topic not found"));

		Article article = new Article();
		article.setAuthor(author);  // Ici, nous utilisons toujours l'objet User complet
		article.setTopic(topic);
		article.setTitle(createArticleDto.getTitle());
		article.setContent(createArticleDto.getContent());

		Article savedArticle = articleRepository.save(article);
		return convertToDto(savedArticle);
	}

	private ArticleDTO convertToDto(Article article) {
		ArticleDTO dto = new ArticleDTO();
		dto.setId(article.getId());
		dto.setAuthorUsername(article.getAuthor().getUsername());  // Utilise le username au lieu de l'ID
		dto.setTopicTitle(article.getTopic().getTitle());  // Utilise le titre du topic au lieu de l'ID
		dto.setTitle(article.getTitle());
		dto.setContent(article.getContent());
		dto.setCreatedAt(article.getCreatedAt());
		dto.setUpdatedAt(article.getUpdatedAt());
		return dto;
	}
}