import { useState } from 'react';
import { DiscogsDBQuery } from '../types';

const useCatNo = () => {
  const [response, setResponse] = useState<null | DiscogsDBQuery>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(false);
  const clear = () => setResponse(null);

  const sendRequest = async (catno: string) => {
    setIsLoading(true);
    setResponse(null);
    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?type=release&catno=${catno}&token=${process.env.REACT_APP_DISCOGS_API_KEY}`
      );
      const data: DiscogsDBQuery = await response?.json();
      setResponse(data);
      setIsLoading(false);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return;
      }
      setError(error);
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, sendRequest, clear };
};

export default useCatNo;
