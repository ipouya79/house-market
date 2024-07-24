import React, { useState, useEffect } from "react";
import MapPicker from "../Map/MapPicker";

const AdForm = ({ ad, onSave, userId }) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState({ lat: 35.6892, lng: 51.389 });
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    if (ad) {
      setTitle(ad.title || "");
      setAddress(ad.address || "");
      setDescription(ad.description || "");
      setPhone(ad.phone || "");
      setLocation({ lat: ad.lat || 35.6892, lng: ad.lng || 51.389 });
      setCoordinates(`${ad.lat.toFixed(3)}, ${ad.lng.toFixed(3)}`);
    }
  }, [ad]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const adData = {
      userId,
      title,
      address,
      description,
      phone,
      lat: location.lat,
      lng: location.lng,
      date: new Date().toISOString(),
    };
    onSave(adData);
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse w-full gap-4">
      <div className="w-full lg:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <input
            type="text"
            placeholder="عنوان"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            type="text"
            placeholder="آدرس"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="h-20 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <textarea
            placeholder="توضیحات تکمیلی"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <input
            type="tel"
            placeholder="شماره تماس"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            disabled
            type="text"
            placeholder="مختصات (عرض جغرافیایی, طول جغرافیایی)"
            value={coordinates}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            ثبت
          </button>
        </form>
      </div>
      <div className="w-full lg:w-1/2">
        <MapPicker
          location={location}
          setLat={(lat) => {
            setLocation((loc) => ({ ...loc, lat }));
            setCoordinates(`${lat.toFixed(3)}, ${location.lng.toFixed(3)}`);
          }}
          setLng={(lng) => {
            setLocation((loc) => ({ ...loc, lng }));
            setCoordinates(`${location.lat.toFixed(3)}, ${lng.toFixed(3)}`);
          }}
          setAddress={setAddress}
        />
      </div>
    </div>
  );
};

export default AdForm;
