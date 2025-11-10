// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  CogIcon, 
  ChartBarIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home = () => {
  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Take Assessment',
      description: 'Test your knowledge across various domains with our comprehensive quizzes.',
      color: 'purple'
    },
    {
      icon: CogIcon,
      title: 'Manage Content',
      description: 'Create, edit, and organize questions to build your perfect assessment.',
      color: 'teal'
    },
    {
      icon: ChartBarIcon,
      title: 'Track Progress',
      description: 'Monitor your performance and identify areas for improvement.',
      color: 'orange'
    },
    {
      icon: QuestionMarkCircleIcon,
      title: 'Multiple Domains',
      description: 'Access questions from programming, science, mathematics, and more.',
      color: 'blue'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-600',
      teal: 'bg-teal-100 text-teal-600',
      orange: 'bg-orange-100 text-orange-600',
      blue: 'bg-blue-100 text-blue-600'
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Master Your Knowledge
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Challenge yourself with our interactive assessment platform. 
            From programming to general knowledge, expand your expertise 
            and track your learning journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/quiz" className="w-full sm:w-auto">
              <Button variant="primary" size="large" className="w-full">
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                Start Assessment
              </Button>
            </Link>
            <Link to="/admin" className="w-full sm:w-auto">
              <Button variant="secondary" size="large" className="w-full">
                <CogIcon className="h-5 w-5 mr-2" />
                Manage Questions
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <div className={`w-12 h-12 ${getColorClasses(feature.color)} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Questions Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">15+</div>
              <div className="text-gray-600">Knowledge Domains</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;