// src/components/admin/QuestionForm.jsx
import { XMarkIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';

const QuestionForm = ({ 
  show, 
  formData, 
  editingQuestion, 
  loading, 
  onClose, 
  onSubmit, 
  onChange 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" shadow="large">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingQuestion ? 'Edit Question' : 'Create New Question'}
          </h2>
          <Button variant="ghost" size="small" onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => onChange('category', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="e.g., Java, Python, SQL"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level *
              </label>
              <select
                value={formData.difficultylevel}
                onChange={(e) => onChange('difficultylevel', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question *
            </label>
            <textarea
              value={formData.questionTitle}
              onChange={(e) => onChange('questionTitle', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              rows="3"
              placeholder="Enter your question here..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['option1', 'option2', 'option3', 'option4'].map((option) => (
              <div key={option}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {option.charAt(0).toUpperCase() + option.slice(1)} *
                </label>
                <input
                  type="text"
                  value={formData[option]}
                  onChange={(e) => onChange(option, e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder={`Option ${option.slice(-1)}`}
                  required
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correct Answer *
            </label>
            <input
              type="text"
              value={formData.rightAnswer}
              onChange={(e) => onChange('rightAnswer', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Must match one of the options exactly"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Must exactly match one of the options above
            </p>
          </div>

          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              {editingQuestion ? 'Update Question' : 'Create Question'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default QuestionForm;