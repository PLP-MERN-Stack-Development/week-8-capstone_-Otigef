import { useState, useEffect } from 'react';
import { Search, Filter, FileText, Download, Eye } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'constitution', label: 'Constitution' },
    { value: 'bills', label: 'Bills & Acts' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'agriculture', label: 'Agriculture' }
  ];

  const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'kiswahili', label: 'Kiswahili' },
    { value: 'dholuo', label: 'Dholuo' },
    { value: 'kikuyu', label: 'Kikuyu' },
    { value: 'kalenjin', label: 'Kalenjin' }
  ];

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockDocuments = [
      {
        id: 1,
        title: 'Constitution of Kenya',
        description: 'The supreme law of the Republic of Kenya',
        category: 'constitution',
        language: 'english',
        type: 'PDF',
        size: '2.3 MB',
        date: '2023-01-15'
      },
      {
        id: 2,
        title: 'Sheria ya Ajira',
        description: 'Employment Act in Kiswahili',
        category: 'bills',
        language: 'kiswahili',
        type: 'PDF',
        size: '1.8 MB',
        date: '2023-02-20'
      },
      {
        id: 3,
        title: 'Health Services Guidelines',
        description: 'Guidelines for healthcare services',
        category: 'healthcare',
        language: 'english',
        type: 'PDF',
        size: '3.1 MB',
        date: '2023-03-10'
      },
      {
        id: 4,
        title: 'Agricultural Extension Manual',
        description: 'Farming guidelines and best practices',
        category: 'agriculture',
        language: 'kiswahili',
        type: 'PDF',
        size: '4.2 MB',
        date: '2023-04-05'
      }
    ];

    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || doc.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <PageHeader
        title="Government Documents"
        description="Access official government documents and policies"
      />

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field pl-10"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="input-field pl-10"
            >
              {languages.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end">
            <span className="text-sm text-secondary-600">
              {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-primary-100 rounded-lg">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-secondary-400 hover:text-primary-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-secondary-400 hover:text-primary-600 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              {document.title}
            </h3>
            <p className="text-secondary-600 text-sm mb-4">
              {document.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-secondary-500">
              <span className="capitalize">{document.language}</span>
              <span>{document.size}</span>
            </div>
            
            <div className="mt-3 pt-3 border-t border-secondary-200">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                  {document.type}
                </span>
                <span className="text-secondary-500">
                  {new Date(document.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary-900 mb-2">
            No documents found
          </h3>
          <p className="text-secondary-600">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default Documents; 