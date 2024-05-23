"use client";

import { useState } from "react";
import sites from "../data/sites.json";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const PlaceDetails = dynamic(() => import("@/components/PlaceDetails"), {
  ssr: false,
});
const SiteList = dynamic(() => import("@/components/SiteList"), { ssr: false });

export default function Home() {
  const [selectedSite, setSelectedSite] = useState(null);
  const initialCenter = [-7.2575, 112.7521];
  const initialZoom = 13;
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [mapZoom, setMapZoom] = useState(initialZoom);

  const handleMarkerClick = (site) => {
    setSelectedSite(site);
    setMapCenter([site.latitude, site.longitude]);
    setMapZoom(100);
  };

  const handleCloseDetails = () => {
    setSelectedSite(null);
    setMapCenter(initialCenter);
    setMapZoom(initialZoom);
  };

  const handleSelectSite = (site) => {
    setSelectedSite(site);
    setMapCenter([site.latitude, site.longitude]);
    setMapZoom(100);
  };

  return (
    <div className="flex">
      <div className="w-1/3 h-screen overflow-y-auto">
        {selectedSite ? (
          <PlaceDetails site={selectedSite} onClose={handleCloseDetails} />
        ) : (
          <SiteList sites={sites} onSelect={handleSelectSite} />
        )}
      </div>
      <div className="w-2/3">
        <Map
          sites={sites}
          selectedSite={selectedSite}
          center={mapCenter}
          zoom={mapZoom}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );
}
