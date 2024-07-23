import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config, onSuccess, onError) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios(config);
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

export default useFetch;
