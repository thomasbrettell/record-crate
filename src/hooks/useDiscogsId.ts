import { useState, useEffect } from 'react';

interface DiscogsRelease {
  title: string;
}
const useCatNo = (release_id: string | number) => {
  const [response, setResponse] = useState<DiscogsRelease | null>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    (async () => {
      try {
        const response = await fetch(
          `https://api.discogs.com/releases/${release_id}`
        );
        const data: DiscogsRelease = await response?.json();
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
  }, [release_id]);

  return { response, error, isLoading };
};

export default useCatNo;
