import { Globe } from 'lucide-react';

const LanguageSelector = ({ 
  selectedLanguage, 
  onLanguageChange, 
  className = "",
  showLabel = true 
}) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'dho', name: 'Dholuo' },
    { code: 'kik', name: 'Kikuyu' },
    { code: 'kal', name: 'Kalenjin' }
  ];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {showLabel && (
        <>
          <Globe className="w-5 h-5 text-secondary-500" />
          <label className="text-sm font-medium text-secondary-700">Language:</label>
        </>
      )}
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="border border-secondary-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector; 