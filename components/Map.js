"use client";

import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const icon = new L.icon({
  iconUrl: MarkerIcon.src,
  iconRetinaUrl: MarkerIcon.src,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  shadowUrl: MarkerShadow.src,
  shadowSize: [41, 41],
});

export default function Map({ sites, center, zoom, onMarkerClick }) {
  const MapUpdater = () => {
    const map = useMap();

    useEffect(() => {
      map.setView(center, zoom);
    }, [map]);

    return null;
  };

  return (
    <div>
      <MapContainer
        style={{
          height: "100vh",
          weight: "100vw",
        }}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map((site, index) => (
          <Marker
            key={index}
            position={[site.latitude, site.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => {
                onMarkerClick(site);
              },
            }}
          >
            <Popup>{site.name}</Popup>
          </Marker>
        ))}
        <MapUpdater />
      </MapContainer>
    </div>
  );
}
