package com.ayush.quizapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ayush.quizapp.dao.QuestionDao;
import com.ayush.quizapp.dao.QuizDao;
import com.ayush.quizapp.model.Question;
import com.ayush.quizapp.model.QuestionWrapper;
import com.ayush.quizapp.model.Quiz;
import com.ayush.quizapp.model.Response;

@Service
public class QuizService {

    @Autowired
    private QuizDao quizDao;

    @Autowired
    private QuestionDao questionDao;

    public ResponseEntity<Integer> createQuiz(String category, String title) {
        try {
            // Fetch 5 random questions (LIMIT hardcoded in SQL)
            List<Question> questions = questionDao.findRandomQuestionByCategory(category);

            if (questions.isEmpty()) {
                return new ResponseEntity<>(-1, HttpStatus.NOT_FOUND); // Return -1 for no questions
            }

            // Create new quiz object
            Quiz quiz = new Quiz();
            quiz.setTitle(title);
            quiz.setQuestions(questions);

            // Save quiz in the database and get the saved quiz with ID
            Quiz savedQuiz = quizDao.save(quiz);

            // Return the quiz ID as Integer
            return new ResponseEntity<>(savedQuiz.getId(), HttpStatus.CREATED);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(-1, HttpStatus.INTERNAL_SERVER_ERROR); // Return -1 for error
        }
    }
	public ResponseEntity<List<QuestionWrapper>> getQuizQuestion(Integer id)
	{
		Optional<Quiz> quiz = quizDao.findById(id);
		List<Question> questionFromDB=quiz.get().getQuestions();
		List<QuestionWrapper> questionForUser = new ArrayList<>();
		for(Question q : questionFromDB)
		{
			QuestionWrapper qw = new QuestionWrapper(q.getId(),q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
			questionForUser.add(qw);
		}
		return new ResponseEntity<>(questionForUser,HttpStatus.OK);
		
	}



	public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
		Quiz quiz = quizDao.findById(id).get();
		List<Question> questions = quiz.getQuestions();
		int right=0;
		int i=0;
		for(Response response:responses)
		{
			if(response.getResponse().equals(questions.get(i).getRightAnswer()));
			right++;
			i++;
			
		}
		return new ResponseEntity<>(right,HttpStatus.OK);
	}
}
