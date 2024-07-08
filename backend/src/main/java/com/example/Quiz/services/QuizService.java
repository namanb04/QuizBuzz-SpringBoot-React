package com.example.Quiz.services;

import com.example.Quiz.model.Question;
import com.example.Quiz.model.QuestionWrapper;
import com.example.Quiz.model.Quiz;
import com.example.Quiz.model.Response;
import com.example.Quiz.repositories.QuestionRepository;
import com.example.Quiz.repositories.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public ResponseEntity<String> createQuiz(String category, int numQues, String difficulty, String title) {
        List<Question> questions = questionRepository.findRandomQuestionsByPref(category, difficulty, numQues);


        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);
        quizRepository.save(quiz);

        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }


    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
         Optional<Quiz> quiz = quizRepository.findById(id);
         //Quiz quiz = quizRepository.findById(id).get();   Another way of writing above code
         List<Question> questionsFromDB = quiz.get().getQuestions();
         List<QuestionWrapper> questionsForUser = new ArrayList<>();

         for(Question q : questionsFromDB){
             QuestionWrapper qw = new QuestionWrapper(q.getId(), q.getQuestionTitle(), q.getOption1(), q.getOption2(), q.getOption3(), q.getOption4());
             questionsForUser.add(qw);
         }
         return new ResponseEntity<>(questionsForUser, HttpStatus.OK);
    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
        Quiz quiz = quizRepository.findById(id).get();
        List<Question> questions = quiz.getQuestions();
        int right = 0;
        int i = 0;
        for(Response response : responses){
            if(response.getResponse().equals(questions.get(i).getRight_answer()))
                right++;
            i++;
        }
        return new ResponseEntity<>(right, HttpStatus.OK);
    }

    public ResponseEntity<List<Quiz>> getAllQuiz() {
        try {
            return new ResponseEntity<>(quizRepository.findAll(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }
}
