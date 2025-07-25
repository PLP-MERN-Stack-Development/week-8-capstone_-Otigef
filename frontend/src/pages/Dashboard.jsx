import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  MessageSquare, 
  Globe, 
  TrendingUp, 
  Users, 
  BookOpen,
  Shield,
  Heart,
  Leaf
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Dashboard = () => {
  const [stats, setStats] = useState({
    documents: 0,
    languages: 5,
    users: 0,
    translations: 0
  });

  const quickActions = [
    {
      title: 'Browse Documents',
      description: 'Access government documents and policies',
      icon: FileText,
      color: 'bg-blue-500',
      link: '/documents'
    },
    {
      title: 'Chat with AI',
      description: 'Ask questions about government services',
      icon: MessageSquare,
      color: 'bg-green-500',
      link: '/chatbot'
    },
    {
      title: 'Language Support',
      description: 'Switch between multiple languages',
      icon: Globe,
      color: 'bg-purple-500',
      link: '#'
    }
  ];

  const serviceCategories = [
    {
      title: 'Legal & Government',
      description: 'Constitution, bills, and legal documents',
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      title: 'Healthcare',
      description: 'Health services and medical information',
      icon: Heart,
      color: 'bg-pink-500'
    },
    {
      title: 'Education',
      description: 'Educational resources and curriculum',
      icon: BookOpen,
      color: 'bg-indigo-500'
    },
    {
      title: 'Agriculture',
      description: 'Farming guides and agricultural services',
      icon: Leaf,
      color: 'bg-green-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <PageHeader
        title="Welcome to Kenya Msaidizi"
        description="Access government services in your preferred language"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Documents</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.documents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Languages</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.languages}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Active Users</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.users}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Translations</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.translations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 ml-3">
                  {action.title}
                </h3>
              </div>
              <p className="text-secondary-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <div>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">
          Service Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((category, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 ml-3">
                  {category.title}
                </h3>
              </div>
              <p className="text-secondary-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 