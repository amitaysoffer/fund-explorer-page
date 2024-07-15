import { useMemo, useState } from "react";
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

export type Fund = {
  id: number;
  name: string;
  benchmark: string;
  domicile: string;
  region: string;
  holdings: number;
  fund_size: string;
  launch_date: string;
  manager_name?: string;
  manager_image?: string;
};

export type FundsViewProps = {
  funds: Fund[];
};

export type ViewTab = "list" | "grid";

export type FilterKeys = keyof Pick<Fund, "region" | "domicile">;

export default function App() {
  const [funds, setFunds] = useState<Fund[]>(data);
  const [showManagers, setShowManagers] = useState(false);
  const [viewTab, setViewTab] = useState<ViewTab>("list");
  const [inputValue, setInputValue] = useState("");
  const [selectedFiltersRegion, setSelectedFiltersRegion] = useState<string[]>(
    []
  );
  const [selectedFiltersDomicile, setSelectedFiltersDomicile] = useState<
    string[]
  >([]);
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);

  function handleFilterRegionRadioClick(category: string) {
    if (selectedFiltersRegion.includes(category)) {
      const filters = selectedFiltersRegion.filter((item) => item !== category);
      setSelectedFiltersRegion(filters);
    } else {
      setSelectedFiltersRegion([...selectedFiltersRegion, category]);
    }
  }

  function handleFilterDomicileRadioClick(category: string) {
    if (selectedFiltersDomicile.includes(category)) {
      const filters = selectedFiltersDomicile.filter(
        (item) => item !== category
      );
      setSelectedFiltersDomicile(filters);
    } else {
      setSelectedFiltersDomicile([...selectedFiltersDomicile, category]);
    }
  }

  function filterDataByManager(name: string) {
    const filterByManagers = data.filter((item) => item.manager_name === name);
    setFunds(filterByManagers);
  }

  function filterDataByRegion() {
    return selectedFiltersRegion
      .map((selectedCategory) => {
        return data.filter((item) => item.region === selectedCategory);
      })
      .flat();
  }

  function filterDataByDomicile() {
    return selectedFiltersDomicile
      .map((selectedCategory) => {
        return data.filter((item) => item.domicile === selectedCategory);
      })
      .flat();
  }

  useMemo(() => {
    // ! TODO: add also search by manager and benchmark
    if (
      selectedFiltersRegion.length > 0 &&
      selectedFiltersDomicile.length > 0 &&
      !inputValue
    ) {
      const fundsBySelectedRegions = filterDataByRegion();

      const filteredFundsByRegions = selectedFiltersDomicile.map(
        (selectedCategory) => {
          return fundsBySelectedRegions.filter(
            (item) => item.domicile === selectedCategory
          );
        }
      );

      return setFunds(filteredFundsByRegions.flat());
    } else if (
      selectedFiltersRegion.length > 0 &&
      selectedFiltersDomicile.length > 0
    ) {
      const fundsBySelectedRegions = filterDataByRegion();
      const filteredFundsByRegions = selectedFiltersDomicile
        .map((selectedCategory) => {
          return fundsBySelectedRegions.filter(
            (item) => item.domicile === selectedCategory
          );
        })
        .flat();

      const filteredFunds = filteredFundsByRegions.filter((fund) =>
        fund.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      return setFunds(filteredFunds);
    } else if (
      selectedFiltersRegion.length > 0 &&
      selectedFiltersDomicile.length === 0
    ) {
      const fundsBySelectedRegions = filterDataByRegion();
      const filteredFunds = fundsBySelectedRegions.filter((fund) =>
        fund.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      return setFunds(filteredFunds);
    } else if (
      selectedFiltersRegion.length === 0 &&
      selectedFiltersDomicile.length > 0
    ) {
      const fundsBySelectedDomicile = filterDataByDomicile();
      const filteredFunds = fundsBySelectedDomicile.filter((fund) =>
        fund.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      return setFunds(filteredFunds);
    } else if (
      selectedFiltersRegion.length === 0 &&
      selectedFiltersDomicile.length === 0
    ) {
      const filteredFunds = data.filter((fund) =>
        fund.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setFunds(filteredFunds);
    }
  }, [inputValue]);

  // Region filter
  useMemo(() => {
    const filterItems = () => {
      // more than 1 region & domicile
      if (
        selectedFiltersDomicile.length === 0 &&
        selectedFiltersRegion.length > 0 &&
        inputValue
      ) {
        const fundsBySelectedRegions = filterDataByRegion();

        const filteredFunds = fundsBySelectedRegions.filter((fund) =>
          fund.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFunds(filteredFunds);
      } else if (
        selectedFiltersDomicile.length === 0 &&
        selectedFiltersRegion.length === 0 &&
        inputValue
      ) {
        const filteredFunds = data.filter((fund) =>
          fund.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        return setFunds(filteredFunds);
      } else if (
        selectedFiltersDomicile.length > 0 &&
        selectedFiltersRegion.length > 1
      ) {
        const fundsBySelectedDomicile = filterDataByDomicile();

        const filteredFunds = selectedFiltersRegion.map((selectedCategory) => {
          return fundsBySelectedDomicile.filter(
            (item) => item.region === selectedCategory
          );
        });
        setFunds(filteredFunds.flat());
        // domicile & region
      } else if (
        selectedFiltersRegion.length > 0 &&
        selectedFiltersDomicile.length > 0
      ) {
        const filteredFunds = selectedFiltersRegion.map((selectedCategory) => {
          return funds.filter((item) => item.region === selectedCategory);
        });
        setFunds(filteredFunds.flat());
      } else if (
        selectedFiltersRegion.length === 0 &&
        selectedFiltersDomicile.length > 0
      ) {
        const filteredFunds = selectedFiltersDomicile.map(
          (selectedCategory) => {
            return data.filter((item) => item.domicile === selectedCategory);
          }
        );
        setFunds(filteredFunds.flat());
      } else if (selectedFiltersRegion.length > 0) {
        const filteredFunds = selectedFiltersRegion.map((selectedCategory) => {
          return data.filter((item) => item.region === selectedCategory);
        });
        setFunds(filteredFunds.flat());
      } else {
        setFunds([...data]);
      }
    };

    filterItems();
  }, [selectedFiltersRegion]);

  // Domicile filter
  useMemo(() => {
    const filterItems = () => {
      // more than 1 domicile & region
      if (
        selectedFiltersDomicile.length > 0 &&
        selectedFiltersRegion.length === 0 &&
        inputValue
      ) {
        const fundsBySelectedDomicile = filterDataByDomicile();

        const filteredFunds = fundsBySelectedDomicile.filter((fund) =>
          fund.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFunds(filteredFunds);
      } else if (
        selectedFiltersDomicile.length === 0 &&
        selectedFiltersRegion.length === 0 &&
        inputValue
      ) {
        const filteredFunds = data.filter((fund) =>
          fund.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        return setFunds(filteredFunds);
      } else if (
        selectedFiltersDomicile.length > 1 &&
        selectedFiltersRegion.length > 0
      ) {
        const fundsBySelectedRegions = filterDataByRegion();

        const filteredFunds = selectedFiltersDomicile.map(
          (selectedCategory) => {
            return fundsBySelectedRegions.filter(
              (item) => item.domicile === selectedCategory
            );
          }
        );
        setFunds(filteredFunds.flat());
        // domicile & region
      } else if (
        selectedFiltersDomicile.length > 0 &&
        selectedFiltersRegion.length > 0
      ) {
        const filteredFunds = selectedFiltersDomicile.map(
          (selectedCategory) => {
            return funds.filter((item) => item.domicile === selectedCategory);
          }
        );
        setFunds(filteredFunds.flat());
        // only region
      } else if (selectedFiltersRegion.length > 0) {
        const filteredFunds = selectedFiltersRegion.map((selectedCategory) => {
          return data.filter((item) => item.region === selectedCategory);
        });
        setFunds(filteredFunds.flat());
        // only domicile
      } else if (selectedFiltersDomicile.length > 0) {
        const filteredFunds = selectedFiltersDomicile.map(
          (selectedCategory) => {
            return data.filter((item) => item.domicile === selectedCategory);
          }
        );
        setFunds(filteredFunds.flat());
      } else {
        setFunds([...data]);
      }
    };

    filterItems();
  }, [selectedFiltersDomicile]);

  return (
    <div className="bg-grayBg">
      <Header />
      <HeaderBanner />
      {true && (
        <Managers
          onShowManagers={setShowManagers}
          filterDataByManager={filterDataByManager}
          selectManagers={setSelectedManagers}
        />
      )}
      <main className="px-4 mt-10 pb-28">
        <div className="flex">
          <SidePanel
            showManagers={showManagers}
            onShowManagers={setShowManagers}
            handleFilterRegionRadioClick={handleFilterRegionRadioClick}
            handleFilterDomicileRadioClick={handleFilterDomicileRadioClick}
            selectedFiltersRegion={selectedFiltersRegion}
            selectedFiltersDomicile={selectedFiltersDomicile}
          />
          <div className="border-l pl-10 border-light-gray">
            <div className="flex items-center gap-10">
              <SearchInput input={inputValue} onChange={setInputValue} />
              <ViewTabs changeView={setViewTab} />
            </div>
            {viewTab === "list" && <ListView funds={funds} />}
            {viewTab === "grid" && <GridView funds={funds} />}
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
