package com.ayush.quizapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.ayush.quizapp.model.QuestionWrapper;
import com.ayush.quizapp.model.Response;
import com.ayush.quizapp.service.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/create")
    public ResponseEntity<Integer> createQuiz(@RequestParam String category,
                                             @RequestParam String title) {
        System.out.println("🎯 Creating quiz - Category: " + category + ", Title: " + title);
        ResponseEntity<Integer> response = quizService.createQuiz(category, title);
        System.out.println("🎯 Quiz created with ID: " + response.getBody());
        return response;
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestion(@PathVariable Integer id)
    {
    	return quizService.getQuizQuestion(id);
    }
    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer id , @RequestBody List<Response> responses)
    {
    	return quizService.calculateResult(id,responses);
    }
}
