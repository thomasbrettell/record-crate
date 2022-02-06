import { useState, useEffect } from 'react';

interface DiscogsRelease {
  country: string;
  title: string;
  id: string;
  uri: string;
  cover_image: string;
}

interface DiscogsDBQuery {
  results: DiscogsRelease[];
}

const useCatNo = (catno: string) => {
  const [response, setResponse] = useState<null | DiscogsDBQuery>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    (async () => {
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
    })();
    return () => {
      abortController.abort();
    };
  }, [catno]);

  return { response, error, isLoading };
};

export default useCatNo;
