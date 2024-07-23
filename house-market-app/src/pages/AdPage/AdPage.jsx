import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AdForm from "../../components/AdForm/AdForm";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";

const AdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { request, loading, error } = useFetch();
  const [ad, setAd] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    request(
      { url: `http://localhost:3001/ads/${id}`, method: "GET" },
      (data) => setAd(data),
      (err) => console.error(err)
    );
  }, [id, request]);

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
          className="mr-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          بله
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="mr-2 bg-gray-500 text-white px-2 py-1 rounded"
        >
          خیر
        </button>
      </div>
    ));
  };

  const handleSave = (updatedAd) => {
    setAd(updatedAd);
    setIsEditing(false);
  };

  const canEditOrDelete = user && ad && user.id === ad.userId;

  return ad ? (
    <div className="max-w-3xl mt-2 mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {isEditing ? (
        <AdForm ad={ad} onSave={handleSave} />
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
            <MapContainer
              center={[ad.lat, ad.lng]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
              className="rounded-lg shadow-md"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[ad.lat, ad.lng]} />
            </MapContainer>
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
      {loading && <p>درحال بارگیری ...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  ) : (
    <p className="text-center text-gray-700 dark:text-gray-300">
      درحال بارگیری ...
    </p>
  );
};

export default AdPage;
