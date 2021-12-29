import React, { useEffect, useState } from 'react';

export default function useFetch(url, method, payload) {

  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const fetchAPICall = async (url, method, payload) => {
    try {
      let response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      let data = await response.json();
      setData(data.data);
    } catch (error) {
      setData(null);
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAPICall(url, method, payload); 
  },[])

  return { data, loading, error};
} 
