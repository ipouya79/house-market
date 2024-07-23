import React, { useCallback } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationPicker = ({ setLat, setLng, setAddress, location }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLat(lat);
      setLng(lng);
      fetchAddress(lat, lng);
    },
  });

  const fetchAddress = useCallback(
    async (lat, lng) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
          {
            headers: {
              "Accept-Language": "fa", // request Persian address
            },
          }
        );
        const data = await response.json();
        setAddress(data.display_name || "آدرس یافت نشد");
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("خطا در دریافت آدرس");
      }
    },
    [setAddress]
  );

  return location && <Marker position={[location.lat, location.lng]} />;
};

const MapPicker = ({ location, setLat, setLng, setAddress }) => {
  const { theme } = useTheme();
  const mapClass = theme === "dark" ? "map-dark" : "map-light";

  return (
    <MapContainer
      center={location ? [location.lat, location.lng] : [35.7219, 51.3347]}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
      className={mapClass}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationPicker
        setLat={setLat}
        setLng={setLng}
        setAddress={setAddress}
        location={location}
      />
    </MapContainer>
  );
};

export default MapPicker;
