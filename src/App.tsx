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
import { Fund, sortOrder, ViewTab } from "./types/funds";
import { sortFunds } from "./utils/util";

export default function App() {
  const [showManagers, setShowManagers] = useState(false);
  const [viewTab, setViewTab] = useState<ViewTab>("list");
  const [inputValue, setInputValue] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedDomiciles, setSelectedDomiciles] = useState<string[]>([]);
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<sortOrder>("asc");

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

  const sortedFunds = sortFunds(filteredFunds, sortOrder);

  function handleSortClick() {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }

  function clearAllRadioFilters() {
    setSelectedDomiciles([]);
    setSelectedRegions([]);
  }

  function clearAllManagers() {
    setSelectedManagers([]);
  }

  function handleFilterByRegion(category: string) {
    if (showManagers && selectedManagers.length === 0) {
      setShowManagers(false);
    }

    setSelectedRegions((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((item) => item !== category);
      } else {
        return [...prevState, category];
      }
    });
  }

  function handleFilterByDomicile(category: string) {
    if (showManagers && selectedManagers.length === 0) {
      setShowManagers(false);
    }

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
    <div className="bg-gray-bg">
      <Header />
      <HeaderBanner />
      {showManagers && (
        <Managers
          onShowManagers={setShowManagers}
          handleFilterByManager={handleFilterByManager}
          selectedManagers={selectedManagers}
          clearAllManagers={clearAllManagers}
        />
      )}
      <main className="px-8 mt-10 pb-28">
        <div className="grid grid-cols-20-80">
          <SidePanel
            showManagers={showManagers}
            onShowManagers={setShowManagers}
            handleFilterByRegion={handleFilterByRegion}
            handleFilterByDomicile={handleFilterByDomicile}
            selectedRegions={selectedRegions}
            selectedDomiciles={selectedDomiciles}
            funds={filteredFunds}
            selectedManagers={selectedManagers}
            clearAllFilters={clearAllRadioFilters}
          />
          <div className="border-l pl-10 border-light-gray">
            <div className="flex items-center gap-10 relative">
              <SearchInput input={inputValue} onChange={setInputValue} />
              <ViewTabs currentTab={viewTab} toggleTab={setViewTab} />
            </div>
            <div className="pt-10">
              {viewTab === "list" && sortedFunds.length > 0 && (
                <ListView
                  funds={sortedFunds}
                  handleSortClick={handleSortClick}
                />
              )}
              {viewTab === "grid" && sortedFunds.length > 0 && (
                <GridView funds={sortedFunds} />
              )}
            </div>
            {sortedFunds.length === 0 ? (
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
