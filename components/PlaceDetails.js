import Image from "next/image";
import { dayMap } from "@/utils/dayMap";
import { X } from "lucide-react";

const PlaceDetails = ({ site, onClose }) => {
  if (!site) {
    return null;
  }

  return (
    <div className="p-4 overflow-y-auto">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{site.name}</h2>
        <button onClick={onClose} className="">
          <X color="#000000" size={16} />
        </button>
      </div>
      <Image
        src={site.image}
        alt={site.name}
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={site.image}
        className="w-full h-auto mt-4 rounded-md"
      />
      <p className="text-sm mt-4">{site.description}</p>
      <p className="text-sm mt-2">
        <span className="font-bold">Alamat:</span> {site.address}
      </p>
      <p className="text-sm mt-2">
        <span className="font-bold">Telpon:</span> {site.tel}
      </p>

      <h3 className="mt-2 text-sm">
        <span className="font-bold">Jadwal Operasional:</span>{" "}
        {site.openingHours == null && "Tidak ada"}
      </h3>
      {site.openingHours != null && (
        <table className="w-full mt-2 border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Hari</th>
              <th className="border border-gray-300 px-4 py-2">Jam Buka</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(site.openingHours).map(([day, hours]) => (
              <tr key={day} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {dayMap[day]}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {hours ? `${hours} WIB` : "Tutup"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlaceDetails;
