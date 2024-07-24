import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AdForm from "../../components/AdForm/AdForm";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const AddAdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ad, setAd] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { request, loading, error } = useFetch();
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      request(
        { url: `http://localhost:3001/ads/${id}`, method: "GET" },
        (data) => {
          console.log("Fetched Ad Data:", data);
          setAd(data);
        },
        (err) => console.error("Error fetching ad:", err)
      );
    }
  }, [id, request]);

  const handleSave = (adData) => {
    const url = isEditing
      ? `http://localhost:3001/ads/${id}`
      : "http://localhost:3001/ads";
    const method = isEditing ? "PUT" : "POST";

    console.log("Saving Ad Data:", adData);

    request(
      { url, method, data: adData },
      () => {
        toast.success(
          isEditing ? "آگهی با موفقیت ویرایش شد" : "آگهی با موفقیت ثبت شد"
        );
        navigate("/");
      },
      (err) => {
        console.error("Error saving ad:", err);
        toast.error("خطا! لطفا دوباره تلاش کنید");
      }
    );
  };

  if (loading) {
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">
        درحال بارگیری ...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">خطا: {error}</p>;
  }

  return (
    <div className="max-w-4xl mt-8 mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-right">
        {isEditing ? "ویرایش آگهی" : "ثبت آگهی جدید"}
      </h1>
      <AdForm ad={ad} onSave={handleSave} userId={user.user.id} />
    </div>
  );
};

export default AddAdPage;
