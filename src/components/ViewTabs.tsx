import { ViewTab } from "../types/funds";

type ViewTabsProps = {
  changeView: (tab: ViewTab) => void;
};
export default function ViewTabs({ changeView }: ViewTabsProps) {
  return (
    <div>
      <ul>
        <li className="rounded-l-full  border-gray-200 bg-white inline-block">
          <button onClick={() => changeView("grid")} className="p-4">
            Grid View
          </button>
        </li>
        <li className="rounded-r-full border-2 border-gray-200 bg-white inline-block">
          <button onClick={() => changeView("list")} className="p-4">
            List View
          </button>
        </li>
      </ul>
    </div>
  );
}
