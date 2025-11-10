// src/components/quiz/QuizProgress.jsx
const QuizProgress = ({ current, total }) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Progress</span>
        <span>{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizProgress;