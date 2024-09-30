package com.openclassrooms.mddapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.openclassrooms.mddapi.dto.TopicDTO;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TopicService implements ITopicService {

	private final TopicRepository topicRepository;
	private final UserRepository userRepository;

	public TopicService(TopicRepository topicRepository, UserRepository userRepository) {
		this.topicRepository = topicRepository;
		this.userRepository = userRepository;
	}

	@Override
	@Transactional(readOnly = true)
	public List<TopicDTO> getAllTopics() {
		return topicRepository.findAll().stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public List<TopicDTO> getSubscribedTopics(Long userId) {
		User user = userRepository.findUserById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));
		return user.getSubscribedTopics().stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<TopicDTO> getUnsubscribedTopics(Long userId) {
		User user = userRepository.findUserById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));

		// Obtenir tous les topics
		List<Topic> allTopics = topicRepository.findAll();

		// Récupérer la liste des topics auxquels l'utilisateur est abonné
		Set<Topic> subscribedTopicsSet = user.getSubscribedTopics();

		// Convertir le Set en List
		List<Topic> subscribedTopicsList = new ArrayList<>(subscribedTopicsSet);

		// Récupérer les topics auxquels l'utilisateur n'est pas encore abonné
		List<Topic> unsubscribedTopics = allTopics.stream()
				.filter(topic -> !subscribedTopicsList.contains(topic))
				.collect(Collectors.toList());

		// Convertir en DTO et retourner
		return unsubscribedTopics.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void subscribeToTopic(Long userId, Long topicId) {
		User user = userRepository.findUserById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));
		Topic topic = topicRepository.findById(topicId)
				.orElseThrow(() -> new RuntimeException("Topic not found"));

		if (!user.getSubscribedTopics().contains(topic)) {
			user.getSubscribedTopics().add(topic);
			userRepository.save(user);
		}
	}

	@Override
	@Transactional
	public void unsubscribeFromTopic(Long userId, Long topicId) {
		User user = userRepository.findUserById(userId)
				.orElseThrow(() -> new RuntimeException("User not found"));
		Topic topic = topicRepository.findById(topicId)
				.orElseThrow(() -> new RuntimeException("Topic not found"));

		user.getSubscribedTopics().remove(topic);
		userRepository.save(user);
	}

	private TopicDTO convertToDTO(Topic topic) {
		return new TopicDTO(topic.getId(), topic.getTitle(), topic.getDescription());
	}
}