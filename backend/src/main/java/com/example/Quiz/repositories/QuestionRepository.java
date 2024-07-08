package com.example.Quiz.repositories;

import com.example.Quiz.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findByCategory(String category);

    @Query(value = "SELECT * FROM question q WHERE q.category=:category AND q.difficulty = :difficulty ORDER BY RAND() LIMIT :numQues", nativeQuery = true)
    List<Question> findRandomQuestionsByPref(String category, String difficulty, int numQues);

}
