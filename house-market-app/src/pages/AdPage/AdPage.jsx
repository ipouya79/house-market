import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AdForm from "../../components/AdForm/AdForm";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import MapPicker from "../../components/Map/MapPicker";

const AdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { request, loading, error } = useFetch();
  const [ad, setAd] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      request(
        { url: `http://localhost:3001/ads/${id}`, method: "GET" },
        (data) => setAd(data),
        (err) => console.error(err)
      );
    }
  }, [id, request]);

  const handleSave = (adData) => {
    const url = isEditing
      ? `http://localhost:3001/ads/${id}`
      : "http://localhost:3001/ads";
    const method = isEditing ? "PUT" : "POST";

    request(
      {
        url,
        method,
        data: { ...adData },
      },
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

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-row-reverse justify-around items-center ">
        <p> آیا از حذف این آگهی مطمئن هستید؟</p>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            request(
              { url: `http://localhost:3001/ads/${id}`, method: "DELETE" },
              () => {
                toast.success("آگهی با موفقیت حذف شد");
                navigate("/");
              },
              (err) => {
                toast.error("خطا در حذف آگهی");
                console.error(err);
              }
            );
          }}
          className="mr-2 bg-red-500 text-white px-2 p-2 text-sm rounded"
        >
          بله
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="mr-2 bg-gray-500 text-white px-2 p-2 text-sm rounded"
        >
          خیر
        </button>
      </div>
    ));
  };

  const canEditOrDelete = user && ad && user.user.id === ad.userId;

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

  return ad ? (
    <div className="max-w-3xl mt-2 mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {isEditing ? (
        <AdForm ad={ad} onSave={handleSave} userId={user.user.id} />
      ) : (
        <div className="text-right ">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {ad.address}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {ad.description}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            شماره تماس: {ad.phone}
          </p>
          <div className="mb-6">
            <MapPicker
              location={{ lat: ad.lat, lng: ad.lng }}
              setLat={() => {}}
              setLng={() => {}}
              setAddress={() => {}}
            />
          </div>
          {canEditOrDelete && (
            <div className="flex flex-row-reverse gap-2 space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                ویرایش
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                حذف
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="max-w-4xl mt-8 mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-right">
        ثبت آگهی جدید
      </h1>
      <AdForm onSave={handleSave} userId={user.user.id} />
    </div>
  );
};

export default AdPage;
