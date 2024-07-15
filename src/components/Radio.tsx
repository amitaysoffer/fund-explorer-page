import { FilterKeys } from "../App";

type RadioProps = {
  categories: string[];
  label: FilterKeys;
  handleFilterRadioClick: (category: string) => void;
  selectedFilters: string[];
};

export default function Radio({
  categories,
  label,
  handleFilterRadioClick,
  selectedFilters,
}: RadioProps) {
  return (
    <div>
      <h3 className="capitalize">{label}</h3>
      <div className="flex flex-col gap-2">
        {categories.map((cat, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name={label}
              onChange={() => handleFilterRadioClick(cat)}
              value={cat}
              checked={selectedFilters.includes(cat)}
              className="hidden peer"
            />
            <span className="w-5 h-5 border border-teal-600 bg-white peer-checked:bg-teal-check"></span>
            <span className="ml-2 text-blue-light">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
