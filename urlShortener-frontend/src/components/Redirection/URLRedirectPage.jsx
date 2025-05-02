import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import apiFetch from '../../api/apiFetch';

export default function URLRedirectPage() {
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [redirectData, setRedirectData] = useState({ alias: '', originalUrl: '' });
  const [error, setError] = useState(null);
  const { shortUrl } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetch.patch(`/url/updateClicks/${shortUrl}`);
        setRedirectData(response.data.data);
        console.log('Redirect data:', response.data);
      } catch (error) {
        console.error('Error fetching redirect data:', error);
        setError(error.response.data.message || 'Failed to fetch redirect data. Please try again later.');
        setIsRedirecting(false);
      }
    };
    fetchData();
  }, [shortUrl]);

  useEffect(() => {
    let timer;
    
    if (isRedirecting && secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (isRedirecting && secondsLeft === 0 && redirectData.originalUrl) {
      // Redirect to the destination URL
      window.location.href = redirectData.originalUrl;
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [secondsLeft, isRedirecting, redirectData.originalUrl]);

  const handleCancel = () => {
    setIsRedirecting(false);
  };

  // Calculate progress percentage
  const progressPercentage = isRedirecting ? ((3 - secondsLeft) / 3) * 100 : 100;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <ArrowRight size={24} className="text-gray-500" />
        </div>
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <h1 className="text-xl font-medium text-center text-gray-800 mb-6">
          {isRedirecting ? 'You are being redirected...' : 'Redirect cancelled'}
        </h1>
        
        <div className="bg-gray-100 rounded-md p-4 mb-6">
          <div className="mb-2">
            <div className="text-sm text-gray-500 mb-1">Short URL</div>
            <div className="text-sm font-medium text-gray-700">{shortUrl}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">Destination</div>
            <div className="text-sm font-medium text-gray-700 break-all">
              {redirectData.originalUrl || 'Loading...'}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-center text-gray-500 mb-2">
            {isRedirecting 
              ? `Redirecting in ${secondsLeft} second${secondsLeft !== 1 ? 's' : ''}...` 
              : 'Redirect cancelled'}
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-700 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {isRedirecting && (
          <div className="flex justify-center">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}