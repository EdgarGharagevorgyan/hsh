"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (required for proper display)
const customIcon = L.icon({
   iconUrl: "/hsh-logo.svg", // Make sure this is in your public/ folder
   iconSize: [150, 150], // adjust size as needed
   iconAnchor: [60, 80], // point of the icon which will correspond to marker's location
   popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
});

export default function LeafletMap() {
   return (
      <MapContainer
         center={[40.045935, 44.477801]}
         zoom={20}
         scrollWheelZoom={false}
         style={{ height: "400px", width: "100%" }}
      >
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <Marker position={[40.045935, 44.477801]} icon={customIcon}>
            <Popup>HSH Furniture</Popup>
         </Marker>
      </MapContainer>
   );
}
