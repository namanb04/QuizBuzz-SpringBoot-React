package com.example.Quiz.controllers;

import com.example.Quiz.model.Question;
import com.example.Quiz.model.QuestionWrapper;
import com.example.Quiz.model.Quiz;
import com.example.Quiz.model.Response;
import com.example.Quiz.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/all")
    public ResponseEntity<List<Quiz>> getAllQuiz() {
        return quizService.getAllQuiz();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createQuiz(@RequestParam String category, @RequestParam int numQues, @RequestParam String difficulty, @RequestParam String title){
        return quizService.createQuiz(category, numQues, difficulty, title);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("/submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer id, @RequestBody List<Response> responses){
        return quizService.calculateResult(id, responses);
    }
}
