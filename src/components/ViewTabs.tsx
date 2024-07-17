import GridIcon from "../assets/icons/GridIcon";
import ListIcon from "../assets/icons/ListIcon";
import { ViewTab } from "../types/funds";

type ViewTabsProps = {
  toggleTab: (tab: ViewTab) => void;
  currentTab: ViewTab;
};

export default function ViewTabs({ toggleTab, currentTab }: ViewTabsProps) {
  return (
    <div className="flex items-center  outline-none">
      <button
        className={`flex items-center rounded-l-full bg-white px-4 py-3 focus:outline-none ${
          currentTab === "grid" && "border-2 border-light-gray"
        }`}
        onClick={() => toggleTab("grid")}
      >
        <span className="mr-2 bg-teal-500 rounded-full p-2">
          <GridIcon />
        </span>
        <span className={currentTab === "grid" ? "" : "text-gray-600"}>
          Grid view
        </span>
      </button>
      <button
        className={`flex items-center rounded-r-full bg-white px-4 py-3 focus:outline-none ${
          currentTab === "list" && "border-2 border-light-gray"
        }`}
        onClick={() => toggleTab("list")}
      >
        <span className={currentTab === "list" ? "" : "text-gray-600"}>
          List view
        </span>
        <span className="ml-2 bg-teal-500 rounded-full p-2">
          <ListIcon />
        </span>
      </button>
    </div>
  );
}
