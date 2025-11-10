package com.ayush.quizapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ayush.quizapp.dao.QuestionDao;
import com.ayush.quizapp.dao.QuizDao;
import com.ayush.quizapp.model.Question;
import com.ayush.quizapp.model.Quiz;

@Service
public class QuestionService {

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private QuizDao quizDao;

    // Get all questions
    public ResponseEntity<List<Question>> getAllQuestion() {
        try {
            List<Question> questions = questionDao.findAll();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ Add question
    public ResponseEntity<String> addQuestion(Question question) {
        try {
            questionDao.save(question);
            return new ResponseEntity<>("Question added successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Something went wrong while adding the question.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get questions by category
    public ResponseEntity<List<Question>> getQuestionByCategory(String category) {
        try {
            List<Question> questions = questionDao.findByCategory(category);
            if (questions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ Delete question - FIXED VERSION (No foreign key constraint error)
    @Transactional
    public ResponseEntity<String> deleteQuestion(Integer id) {
        try {
            if (!questionDao.existsById(id)) {
                return new ResponseEntity<>("Question not found!", HttpStatus.NOT_FOUND);
            }

            // Get the question first
            Question question = questionDao.findById(id).get();

            // Find all quizzes that contain this question and remove it
            List<Quiz> quizzesWithQuestion = quizDao.findByQuestionsContaining(question);
            
            for (Quiz quiz : quizzesWithQuestion) {
                // Remove the question from the quiz's question list
                quiz.getQuestions().removeIf(q -> q.getId().equals(id));
                quizDao.save(quiz); // Save the updated quiz
            }

            // Now delete the question
            questionDao.deleteById(id);
            
            return new ResponseEntity<>("Question deleted successfully! Removed from " + quizzesWithQuestion.size() + " quiz(zes).", HttpStatus.OK);
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error deleting question: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Alternative delete method using native query (if above doesn't work)
    @Transactional
    public ResponseEntity<String> deleteQuestionNative(Integer id) {
        try {
            if (!questionDao.existsById(id)) {
                return new ResponseEntity<>("Question not found!", HttpStatus.NOT_FOUND);
            }

            // First remove from join table using native query
            quizDao.removeQuestionFromAllQuizzes(id);
            
            // Then delete the question
            questionDao.deleteById(id);
            
            return new ResponseEntity<>("Question deleted successfully!", HttpStatus.OK);
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error deleting question: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update question
    public ResponseEntity<String> updateQuestion(Question question) {
        try {
            if (questionDao.existsById(question.getId())) {
                questionDao.save(question);
                return new ResponseEntity<>("Question updated successfully!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Question not found!", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error updating question.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}