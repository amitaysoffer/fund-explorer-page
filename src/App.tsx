import { useState } from "react";
import data from "./data.json";
import ListView from "./components/ListView";
import SearchInput from "./components/SearchInput";
import GridView from "./components/GridView";
import ViewTabs from "./components/ViewTabs";
import SidePanel from "./components/SidePanel";
import Managers from "./components/Managers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderBanner from "./components/HeaderBanner";
import { Fund, ViewTab } from "./types/funds";

export default function App() {
  const [showManagers, setShowManagers] = useState(false);
  const [viewTab, setViewTab] = useState<ViewTab>("list");
  const [inputValue, setInputValue] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedDomiciles, setSelectedDomiciles] = useState<string[]>([]);
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);

  const filteredFunds: Fund[] = data.filter((fund) => {
    const data = fund.data;
    const matchesSearch =
      !inputValue ||
      data.fund_name.toLowerCase().includes(inputValue.toLowerCase()) ||
      data.fund_benchmark.toLowerCase().includes(inputValue.toLowerCase()) ||
      data.manager.fund_manager
        ?.toLowerCase()
        .includes(inputValue.toLowerCase());

    const matchesRegion =
      selectedRegions.length === 0 ||
      selectedRegions.includes(data.details.region);

    const matchesDomicile =
      selectedDomiciles.length === 0 ||
      selectedDomiciles.includes(data.details.domicile);

    const matchesManager =
      selectedManagers.length === 0 ||
      (data.manager.fund_manager &&
        selectedManagers.includes(data.manager.fund_manager));

    return matchesSearch && matchesRegion && matchesDomicile && matchesManager;
  });

  function clearAllRadioFilters() {
    setSelectedDomiciles([]);
    setSelectedRegions([]);
  }

  function clearAllManagers() {
    setSelectedManagers([]);
  }

  function handleFilterByRegion(category: string) {
    setSelectedRegions((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((item) => item !== category);
      } else {
        return [...prevState, category];
      }
    });
  }

  function handleFilterByDomicile(category: string) {
    setSelectedDomiciles((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((item) => item !== category);
      } else {
        return [...prevState, category];
      }
    });
  }

  function handleFilterByManager(category: string) {
    setSelectedManagers((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((item) => item !== category);
      } else {
        return [...prevState, category];
      }
    });
  }

  return (
    <div className="bg-grayBg">
      <Header />
      <HeaderBanner />
      {showManagers && (
        <Managers
          onShowManagers={setShowManagers}
          handleFilterByManager={handleFilterByManager}
          selectedManagers={selectedManagers}
          clearAll={clearAllManagers}
        />
      )}
      <main className="px-6 mt-10 pb-28">
        <div className="flex">
          <SidePanel
            showManagers={showManagers}
            onShowManagers={setShowManagers}
            handleFilterByRegion={handleFilterByRegion}
            handleFilterByDomicile={handleFilterByDomicile}
            selectedRegions={selectedRegions}
            selectedDomiciles={selectedDomiciles}
            funds={filteredFunds}
            selectedManagers={selectedManagers}
            clearAll={clearAllRadioFilters}
          />
          <div className="border-l pl-10 border-light-gray">
            <div className="flex items-center gap-10 relative">
              <SearchInput input={inputValue} onChange={setInputValue} />
              <ViewTabs changeView={setViewTab} />
            </div>
            {viewTab === "list" && <ListView funds={filteredFunds} />}
            {viewTab === "grid" && <GridView funds={filteredFunds} />}
            {filteredFunds.length === 0 ? (
              <h2 className="text-3xl">No funds match your search</h2>
            ) : null}
            <p className="text-right mt-5 pt-5 text-gray-500 border-t border-light-gray">
              All data as at 29 February 2024
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
