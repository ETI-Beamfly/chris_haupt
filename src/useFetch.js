//custom hook for fetching api data

import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        setIsLoading(false);
      });
  }, [url]);

  return {apiData, isLoading};
}
