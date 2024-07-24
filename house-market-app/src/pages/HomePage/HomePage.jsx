import React, { useEffect, useState } from "react";
import AdList from "../../components/AdList/AdList";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/Pagination/Pagination";

const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(8);
  const { request, loading, error } = useFetch();

  useEffect(() => {
    request(
      { url: "http://localhost:3001/ads", method: "GET" },
      (data) => setAds(data),
      (err) => console.error("Error fetching ads:", err)
    );
  }, [request]);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //  if pagination is needed
  const showPagination = ads.length > adsPerPage;

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
    <div className="relative min-h-screen">
      <AdList ads={currentAds} />
      {showPagination && (
        <div>
          {/* Pagination for large screens */}
          <div className="hidden lg:block">
            <Pagination
              adsPerPage={adsPerPage}
              totalAds={ads.length}
              paginate={paginate}
            />
          </div>
          {/* Pagination for small screens */}
          <div className="block lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
            <Pagination
              adsPerPage={adsPerPage}
              totalAds={ads.length}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
