import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customIcon from "../assets/images/marker.png";

const myIcon = new L.Icon({
  iconUrl: customIcon as string, // Ensure correct type
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({ lat, long, description = "No description", name }: MapComponentProps) => {
  return (
    <MapContainer
      scrollWheelZoom={true}
      center={[lat, long]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, long]} icon={myIcon}>
        <Popup>
          <div>{name}</div>
          <div>{description}</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
