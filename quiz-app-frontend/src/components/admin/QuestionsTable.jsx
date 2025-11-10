// src/components/admin/QuestionsTable.jsx
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Button from '../ui/Button';

const QuestionsTable = ({ 
  questions, 
  loading, 
  onEdit, 
  onDelete, 
  onRefresh 
}) => {
  if (questions.length === 0 && !loading) {
    return (
      <Card className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">?</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Questions Available</h3>
        <p className="text-gray-500 mb-4">Create your first question to get started</p>
      </Card>
    );
  }

  return (
    <Card shadow="medium">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Questions ({questions.length})
          </h3>
          <Button variant="outline" size="small" onClick={onRefresh}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map((question) => (
              <tr key={question.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {question.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md truncate">
                    {question.questionTitle}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    question.difficultylevel === 'Easy' 
                      ? 'bg-green-100 text-green-800' 
                      : question.difficultylevel === 'Medium' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {question.difficultylevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => onEdit(question)}
                    className="mr-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => onDelete(question.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && questions.length === 0 && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading questions...</p>
        </div>
      )}
    </Card>
  );
};

export default QuestionsTable;