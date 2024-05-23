import { dayMap } from "@/utils/dayMap";
import Image from "next/image";

const SiteList = ({ sites, onSelect }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const checkIfOpen = (openingHours) => {
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    const currentTime = now.toTimeString().split(" ")[0];
    const hours = openingHours[currentDay];

    if (!hours) return { isOpen: false, closingTime: null };

    const [startTime, endTime] = hours.split(" - ");
    const isOpen = currentTime >= startTime && currentTime <= endTime;
    return { isOpen, closingTime: endTime };
  };

  const getNextOpeningTime = (openingHours) => {
    const now = new Date();
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
      <p className="text-sm text-gray-600 mb-4">
        Menampilkan: {sites.length} hasil
      </p>
      {sites.map((site, index) => {
        const { isOpen, closingTime } = checkIfOpen(site.openingHours);
        const nextOpeningTime = !isOpen
          ? getNextOpeningTime(site.openingHours)
          : null;

        return (
          <div
            key={index}
            className="mb-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
            onClick={() => onSelect(site)}
          >
            {" "}
            <h3 className="text-xl font-semibold mb-2">{site.name}</h3>
            <p className="text-sm text-gray-600 mb-0.5">{site.address}</p>
            {site.tel != null && (
              <p className="text-sm text-gray-600 mb-0.5">{site.tel}</p>
            )}
            <div className="flex items-center gap-x-1">
              {isOpen ? (
                <span className="text-sm text-green-600">
                  {" "}
                  Buka <span className="text-[8px]">•</span>{" "}
                  <span className="text-sm text-gray-600">
                    Hingga pukul {closingTime} WIB
                  </span>
                </span>
              ) : (
                <span className="text-sm text-red-500">
                  {" "}
                  Tutup<span className="text-[8px]">•</span>{" "}
                  <span className="text-sm text-gray-600">
                    Buka pada {nextOpeningTime.day} pukul{" "}
                    {nextOpeningTime.hours} WIB
                  </span>
                </span>
              )}{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SiteList;
