import { useCallback, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const setDefaultIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
};

const LocationPicker = ({ setLat, setLng, setAddress, location }) => {
  const fetchAddress = useCallback(
    async (lat, lng) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
          {
            headers: { "Accept-Language": "fa" }, // request Persian address
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

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLat(lat);
      setLng(lng);
      fetchAddress(lat, lng);
    },
  });

  return location && <Marker position={[location.lat, location.lng]} />;
};

const MapPicker = ({ location, setLat, setLng, setAddress }) => {
  useEffect(() => {
    setDefaultIcon();
  }, []);

  return (
    <MapContainer
      center={location ? [location.lat, location.lng] : [35.7219, 51.3347]}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
      className="rounded-lg shadow-lg "
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
