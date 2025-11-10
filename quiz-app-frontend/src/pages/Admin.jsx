// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionService } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import QuestionForm from '../components/admin/QuestionForm';
import QuestionsTable from '../components/admin/QuestionsTable';

const Admin = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    difficultylevel: 'Easy',
    category: 'Java'
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const response = await questionService.getAllQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error loading questions:', error);
      setError('Failed to load questions');
    }
    setLoading(false);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingQuestion) {
        await questionService.updateQuestion({
          id: editingQuestion.id,
          ...formData
        });
        setSuccess('Question updated successfully!');
      } else {
        await questionService.addQuestion(formData);
        setSuccess('Question created successfully!');
      }
      
      setShowForm(false);
      setEditingQuestion(null);
      setFormData({
        questionTitle: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        rightAnswer: '',
        difficultylevel: 'Easy',
        category: 'Java'
      });
      
      loadQuestions();
    } catch (error) {
      console.error('Error saving question:', error);
      setError('Failed to save question. Please try again.');
    }
    setLoading(false);
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData({
      questionTitle: question.questionTitle,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      rightAnswer: question.rightAnswer,
      difficultylevel: question.difficultylevel,
      category: question.category
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await questionService.deleteQuestion(id);
        setSuccess('Question deleted successfully!');
        loadQuestions();
      } catch (error) {
        console.error('Error deleting question:', error);
        setError('Failed to delete question');
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
    setFormData({
      questionTitle: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      rightAnswer: '',
      difficultylevel: 'Easy',
      category: 'Java'
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                ← Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
            </div>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              Create Question
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {/* Question Form */}
        <QuestionForm
          show={showForm}
          formData={formData}
          editingQuestion={editingQuestion}
          loading={loading}
          onClose={resetForm}
          onSubmit={handleSubmit}
          onChange={handleFormChange}
        />

        {/* Questions Table */}
        <QuestionsTable
          questions={questions}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRefresh={loadQuestions}
        />
      </div>
    </div>
  );
};

export default Admin;