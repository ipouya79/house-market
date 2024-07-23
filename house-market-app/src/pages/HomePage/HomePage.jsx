import React, { useEffect, useState } from "react";
import AdList from "../../components/AdList/AdList";
import useFetch from "../../hooks/useFetch"; 

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const { request, loading, error } = useFetch();

  useEffect(() => {
    request(
      { url: "http://localhost:3001/ads", method: "GET" },
      (data) => setAds(data),
      (err) => console.error("Error fetching ads:", err)
    );
  }, [request]);

  if (loading) {
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">
        درحال بارگیری...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">خطا: {error}</p>;
  }

  return (
    <div>
      <AdList ads={ads} />
    </div>
  );
};

export default HomePage;
