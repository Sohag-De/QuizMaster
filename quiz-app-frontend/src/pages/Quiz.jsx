// src/pages/Quiz.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizService, questionService } from '../services/api';
import QuizStart from '../components/quiz/QuizStart';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResults from '../components/quiz/QuizResults';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Quiz = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [quizData, setQuizData] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState([]);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await questionService.getAllQuestions();
            const uniqueCategories = [...new Set(response.data.map(q => q.category))];
            setCategories(uniqueCategories);
            if (uniqueCategories.length > 0) {
                setSelectedCategory(uniqueCategories[0]);
            }
        } catch (error) {
            console.error('Error loading categories:', error);
            setError('Failed to load categories');
        }
    };

    const startQuiz = async (category = selectedCategory) => {
        if (!category) {
            setError('Please select a category');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const createResponse = await quizService.createQuiz(category, `${category} Quiz`);
            const allQuestionsResponse = await questionService.getAllQuestions();
            const questions = allQuestionsResponse.data;
            
            const categoryQuestions = questions.filter(q => q.category === category);
            const randomQuestions = categoryQuestions.slice(0, 5);
            
            if (randomQuestions.length === 0) {
                throw new Error(`No questions found for category: ${category}`);
            }

            setQuizData({
                id: Date.now(),
                questions: randomQuestions,
                title: `${category} Quiz`
            });
            
            setResponses(new Array(randomQuestions.length).fill({ id: 0, response: '' }));
            setCurrentQuestion(0);
            
        } catch (error) {
            console.error('Error starting quiz:', error);
            setError('Failed to start quiz: ' + (error.userMessage || error.message));
        }
        setLoading(false);
    };

    const handleAnswer = (questionId, answer) => {
        const newResponses = [...responses];
        newResponses[currentQuestion] = { id: questionId, response: answer };
        setResponses(newResponses);
    };

    const submitQuiz = async () => {
        try {
            let correctAnswers = 0;
            quizData.questions.forEach((question, index) => {
                if (responses[index]?.response === question.rightAnswer) {
                    correctAnswers++;
                }
            });
            setScore(correctAnswers);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            setError('Failed to submit quiz. Please try again.');
        }
    };

    const resetQuiz = () => {
        setQuizData(null);
        setScore(null);
        setResponses([]);
        setCurrentQuestion(0);
        setError('');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <LoadingSpinner size="large" className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Initializing Assessment</h3>
                    <p className="text-gray-600">Preparing your {selectedCategory} questions</p>
                </div>
            </div>
        );
    }

    if (score !== null) {
        return (
            <QuizResults 
                score={score}
                totalQuestions={quizData.questions.length}
                onRetry={resetQuiz}
                onGoHome={() => navigate('/')}
            />
        );
    }

    if (!quizData) {
        return (
            <QuizStart
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onStartQuiz={startQuiz}
                onNavigateHome={() => navigate('/')}
                onNavigateAdmin={() => navigate('/admin')}
            />
        );
    }

    return (
        <QuizQuestion
            quizData={quizData}
            currentQuestion={currentQuestion}
            responses={responses}
            onAnswerSelect={handleAnswer}
            onPrevious={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            onNext={() => setCurrentQuestion(currentQuestion + 1)}
            onSubmit={submitQuiz}
            onQuit={() => navigate('/')}
        />
    );
};

export default Quiz;