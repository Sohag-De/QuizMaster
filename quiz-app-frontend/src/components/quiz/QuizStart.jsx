// src/components/quiz/QuizStart.jsx
import { AcademicCapIcon, CogIcon, HomeIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';

const QuizStart = ({ categories, selectedCategory, onCategorySelect, onStartQuiz, onNavigateHome, onNavigateAdmin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full" padding="large" shadow="large">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AcademicCapIcon className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Knowledge Challenge</h1>
          <p className="text-gray-600 text-lg">Select a category to begin your assessment</p>
        </div>

        {/* Category Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">Choose Your Domain</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => {
                  onCategorySelect(category);
                  onStartQuiz(category);
                }}
                className={`p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:shadow-sm'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 text-purple-500">
                    {index % 3 === 0 ? '📚' : index % 3 === 1 ? '💻' : '🔬'}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category}</h3>
                  <p className="text-sm text-gray-500">Begin Assessment</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-gray-600">Domains</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-teal-600">5</div>
            <div className="text-sm text-gray-600">Questions Each</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-500">Instant</div>
            <div className="text-sm text-gray-600">Results</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            size="large" 
            className="flex-1"
            onClick={onNavigateHome}
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Return Home
          </Button>
          <Button 
            variant="secondary" 
            size="large" 
            className="flex-1"
            onClick={onNavigateAdmin}
          >
            <CogIcon className="h-5 w-5 mr-2" />
            Manage Content
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizStart;