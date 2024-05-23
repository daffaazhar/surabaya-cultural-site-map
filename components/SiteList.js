import Image from "next/image";
import { dayMap } from "@/utils/dayMap";
import { useState } from "react";
import { Input } from "./ui/input";

const SiteList = ({ sites, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const checkIfOpen = (openingHours) => {
    if (!openingHours) return { isOpen: false, closingTime: null };

    const now = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = daysOfWeek[now.getDay()];
    const currentTime = now.toTimeString().split(" ")[0];
    const hours = openingHours[currentDay];

    if (!hours) return { isOpen: false, closingTime: null };

    const [startTime, endTime] = hours.split(" - ");
    const isOpen = currentTime >= startTime && currentTime <= endTime;
    return { isOpen, closingTime: endTime };
  };

  const getNextOpeningTime = (openingHours) => {
    if (!openingHours) return null;

    const now = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = now.getDay();
    const currentTime = now.toTimeString().split(" ")[0];

    for (let i = 0; i < 7; i++) {
      const dayIndex = (currentDayIndex + i) % 7;
      const day = daysOfWeek[dayIndex];
      const hours = openingHours[day];

      if (hours && (i !== 0 || currentTime < hours.split("-")[0])) {
        return { day: dayMap[day], hours: hours.split("-")[0] };
      }
    }
    return null;
  };

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 gap-x-4">
        <Image
          width={32}
          height={32}
          src="/surabaya-logo.svg"
          alt="Logo Surabaya"
        />
        <h2 className="text-2xl font-bold">Situs Budaya Surabaya</h2>
      </div>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Cari situs budaya disini..."
        className="focus:outline focus:outline-0 focus:ring-0 focus:ring-offset-0 mb-4"
      />
      <p className="text-sm text-gray-600 mb-3">
        Menampilkan: {filteredSites.length} hasil
      </p>
      {filteredSites.length == 0 ? (
        <div className="flex flex-col justify-center items-center mt-28">
          <h3 className="font-semibold text-xl">
            Situs Budaya Tidak Ditemukan
          </h3>
          <p className="text-sm mt-2">Coba gunakan kata kunci lainnya!</p>
        </div>
      ) : (
        filteredSites.map((site, index) => {
          const openingHours = site.openingHours;
          const { isOpen, closingTime } = checkIfOpen(openingHours);
          const nextOpeningTime = !isOpen
            ? getNextOpeningTime(openingHours)
            : null;

          return (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
              onClick={() => onSelect(site)}
            >
              <h3 className="text-xl font-semibold mb-2">{site.name}</h3>
              <p className="text-sm text-gray-600 mb-0.5">{site.address}</p>
              {site.tel != null && (
                <p className="text-sm text-gray-600 mb-0.5">{site.tel}</p>
              )}
              {openingHours ? (
                <div className="flex items-center gap-x-1">
                  {isOpen ? (
                    <>
                      <span className="text-sm text-green-600">Buka</span>
                      <span className="text-[8px]">•</span>{" "}
                      <span className="text-sm text-gray-600">
                        Hingga pukul {closingTime} WIB
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-red-500">Tutup</span>
                      <span className="text-[8px]">•</span>{" "}
                      <span className="text-sm text-gray-600">
                        Buka pada {nextOpeningTime.day} pukul{" "}
                        {nextOpeningTime.hours} WIB
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-sm text-red-500">
                  Jam buka tidak tersedia
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SiteList;
