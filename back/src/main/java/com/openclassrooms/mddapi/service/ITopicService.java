package com.openclassrooms.mddapi.service;

import java.util.List;

import com.openclassrooms.mddapi.dto.TopicDTO;

public interface ITopicService {
	List<TopicDTO> getAllTopics();
	List<TopicDTO> getSubscribedTopics(Long userId);
	List<TopicDTO> getUnsubscribedTopics(Long userId);
	void subscribeToTopic(Long userId, Long topicId);
	void unsubscribeFromTopic(Long userId, Long topicId);
}