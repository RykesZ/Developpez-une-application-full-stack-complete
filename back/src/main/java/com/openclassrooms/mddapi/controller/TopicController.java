package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.service.ITopicService;
import com.openclassrooms.mddapi.dto.TopicDTO;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

	private final ITopicService topicService;

	@Autowired
	public TopicController(ITopicService topicService) {
		this.topicService = topicService;
	}

	@GetMapping("/all")
	public ResponseEntity<List<TopicDTO>> getAllTopics() {
		List<TopicDTO> topics = topicService.getAllTopics();
		return ResponseEntity.ok(topics);
	}

	@GetMapping("/subscribed")
	public ResponseEntity<List<TopicDTO>> getSubscribedTopics() {
		User currentUser = getCurrentUser();
		List<TopicDTO> topics = topicService.getSubscribedTopics(currentUser.getId());
		return ResponseEntity.ok(topics);
	}

	@PostMapping("/subscribe/{topicId}")
	public ResponseEntity<Void> subscribeToTopic(@PathVariable Long topicId) {
		User currentUser = getCurrentUser();
		topicService.subscribeToTopic(currentUser.getId(), topicId);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/unsubscribe/{topicId}")
	public ResponseEntity<Void> unsubscribeFromTopic(@PathVariable Long topicId) {
		User currentUser = getCurrentUser();
		topicService.unsubscribeFromTopic(currentUser.getId(), topicId);
		return ResponseEntity.ok().build();
	}

	private User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !(authentication.getPrincipal() instanceof User)) {
			throw new RuntimeException("User not authenticated or invalid authentication type");
		}
		return (User) authentication.getPrincipal();
	}
}