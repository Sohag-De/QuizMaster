// src/components/quiz/QuizResults.jsx
import { CheckIcon, XMarkIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';

const QuizResults = ({ score, totalQuestions, onRetry, onGoHome }) => {
  const percentage = (score / totalQuestions) * 100;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center" padding="large" shadow="large">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {isExcellent ? (
            <ChartBarIcon className="h-10 w-10 text-green-600" />
          ) : (
            <CheckIcon className="h-10 w-10 text-green-600" />
          )}
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment Complete</h2>
        
        <div className="text-6xl font-bold text-purple-600 mb-4">{score}/{totalQuestions}</div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-2">Your Score</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                isExcellent ? 'bg-green-500' : isGood ? 'bg-blue-500' : 'bg-orange-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{percentage.toFixed(1)}% Correct</p>
        </div>

        <div className="space-y-3">
          <Button 
            variant="primary" 
            size="large" 
            className="w-full"
            onClick={onRetry}
          >
            Take Another Assessment
          </Button>
          <Button 
            variant="outline" 
            size="large" 
            className="w-full"
            onClick={onGoHome}
          >
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizResults;