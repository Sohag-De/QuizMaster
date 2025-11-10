// src/components/quiz/QuizQuestion.jsx
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';
import QuizProgress from './QuizProgress';

const QuizQuestion = ({
  quizData,
  currentQuestion,
  responses,
  onAnswerSelect,
  onPrevious,
  onNext,
  onSubmit,
  onQuit
}) => {
  const question = quizData.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto" shadow="medium">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{quizData.title}</h2>
              <p className="text-gray-600">Knowledge Assessment</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Question {currentQuestion + 1} of {quizData.questions.length}
              </span>
              <Button variant="ghost" size="small" onClick={onQuit}>
                Exit
              </Button>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {question.questionTitle}
            </h3>

            <div className="space-y-3">
              {[
                { value: question.option1, label: 'A' },
                { value: question.option2, label: 'B' }, 
                { value: question.option3, label: 'C' },
                { value: question.option4, label: 'D' }
              ]
              .filter(item => item.value)
              .map((item, index) => (
                <button
                  key={index}
                  onClick={() => onAnswerSelect(question.id, item.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition duration-200 ${
                    responses[currentQuestion]?.response === item.value
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                      responses[currentQuestion]?.response === item.value
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-gray-300'
                    }`}>
                      {item.label}
                    </span>
                    {item.value}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-gray-500">
              {responses.filter(r => r.response).length} of {quizData.questions.length} answered
            </div>

            {isLastQuestion ? (
              <Button
                variant="secondary"
                onClick={onSubmit}
                disabled={!responses[currentQuestion]?.response}
              >
                Submit Assessment
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={onNext}
              >
                Next
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Progress */}
          <QuizProgress 
            current={currentQuestion + 1} 
            total={quizData.questions.length} 
          />
        </Card>
      </div>
    </div>
  );
};

export default QuizQuestion;