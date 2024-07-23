import React, { useEffect, useState } from "react";
import AdList from "../../components/AdList/AdList";
import axios from "axios";

const HomePage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/ads")
      .then((response) => setAds(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <AdList ads={ads} />
    </div>
  );
};

export default HomePage;
