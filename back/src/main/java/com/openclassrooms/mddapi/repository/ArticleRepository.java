package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Article;

import java.util.List;
import java.util.Set;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>{
    @Query("SELECT a FROM Article a WHERE a.topic IN :topics ORDER BY a.createdAt DESC")
    List<Article> findByTopicsOrderByCreatedAtDesc(@Param("topics") Set<Topic> topics);
}
