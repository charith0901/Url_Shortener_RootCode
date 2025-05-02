import { useState } from 'react';
import { Link, X, Copy, AlertCircle } from 'lucide-react';
import apiFetch from '../../api/apiFetch';
import { useNavigate } from 'react-router-dom';

export default function CreateUrl() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiration, setExpiration] = useState(1);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState('');
  const navigate = useNavigate();


  const shortenUrl = async () => {
    if (!longUrl) {
      setError('Invalid URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await apiFetch.post('/url', {
        originalUrl: longUrl,
        customAlias: customAlias === "" ? null : customAlias,
        expireDuration: expiration
      });
      
      setShortenedUrl(response.data.data.alias);
    } catch (err) {
      setError(err.response.data.message || 'An error occurred while shortening the URL.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const expirationOptions = [
    1,
    7,
    30,
    -1
  ];

  if (!isOpen) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-700">Shorten a URL</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-4">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-gray-100 rounded-md flex items-center">
              <AlertCircle size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">{error}</span>
            </div>
          )}

          {/* Long URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Link size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Enter your long URL"
                className="pl-10 w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Custom Alias */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Alias (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Copy size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="Custom alias"
                className="pl-10 w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Expiration */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiration
            </label>
            <div className="relative">
              <select
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {expirationOptions.map(option => (
                  <option key={option} value={option}>{option === -1 ? 'Never' : `${option} day${option > 1 ? 's' : ''}`}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Result (shown after shortening) */}
          {shortenedUrl && (
            <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md">
              <p className="font-medium">Shortened URL:</p>
              <a 
                href={shortenedUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {shortenedUrl}
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 bg-gray-50 rounded-b-lg">
          <button 
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={shortenUrl}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center min-w-24 hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Link size={16} className="mr-2" />
                Shorten URL
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}