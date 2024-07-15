import { useState } from "react";
import image_0 from "../assets/profile-image-0.png";
import image_1 from "../assets/profile-image-1.png";
import image_2 from "../assets/profile-image-2.png";
import image_3 from "../assets/profile-image-3.png";
import image_4 from "../assets/profile-image-4.png";
import image_5 from "../assets/profile-image-5.png";
import image_6 from "../assets/profile-image-6.png";

type ManagerCardProps = {
  name: string;
  region: string;
  image?: string;
  onManagerClick: (name: string) => void;
};

const imageMapping: Record<string, string> = {
  image_0,
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
  image_6,
};

export default function ManagerCard({
  name,
  region,
  image,
  onManagerClick,
}: ManagerCardProps) {
  const [selectedManager, setSelectedManager] = useState(false);

  const imgSrc = image ? imageMapping[image] : undefined;
  const updatedRegionName = (region: string) => {
    switch (region) {
      case "asia":
        return "asian";
      case "europe":
        return "europen";

      default:
        return region;
    }
  };

  return (
    <button
      onClick={() => {
        onManagerClick(name);
        setSelectedManager(!selectedManager);
      }}
      className={`flex-none text-left w-44 bg-white shadow p-3 ${
        selectedManager ? "bg-red-500 p-3" : ""
      }`}
    >
      {imgSrc && <img src={imgSrc} alt={`${name} avatar`} />}
      <h3 className="mt-1">{name}</h3>
      <p className="text-xs text-gray-500 capitalize mt-2">
        {updatedRegionName(region.toLowerCase())} Equities
      </p>
    </button>
  );
}
