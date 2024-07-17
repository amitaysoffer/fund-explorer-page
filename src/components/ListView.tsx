import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import ChevronUpIcon from "../assets/icons/ChevronUpIcon";
import RightArrow from "../assets/icons/RightArrow";
import { Fund } from "../types/funds";
import { regionColourPicker } from "../util";

type ListViewProps = {
  funds: Fund[];
  handleSortClick: () => void;
};

export default function ListView({ funds, handleSortClick }: ListViewProps) {
  return (
    <section className="overflow-x-auto" data-testid="list-view">
      <div className="grid grid-cols-8 text-left font-semibold pb-4 border-b border-b-light-gray italic">
        <div className="col-span-3 flex items-center gap-1">
          <span>Fund name / Benchmark</span>
          <button onClick={handleSortClick} className="text-gray-500">
            <div className="h-2">
              <ChevronUpIcon />
            </div>
            <div>
              <ChevronDownIcon />
            </div>
          </button>
        </div>
        <div className="text-center">Domicile</div>
        <div className="text-center">Region</div>
        <div className="text-center">Holdings</div>
        <div className="text-center">Fund size</div>
        <div className="text-center">Launch date</div>
      </div>
      {funds.map((fund) => {
        const {
          id,
          data: {
            fund_name: name,
            fund_benchmark: benchmark,
            details: {
              domicile,
              region,
              holdings,
              fund_size: size,
              launch_date,
            },
          },
        } = fund;
        const regionColour = regionColourPicker(region);

        return (
          <div key={id} className="pb-2 pt-4" data-testid="fund">
            <div
              className={`grid grid-cols-8 items-center bg-white shadow-md px-4 hover:shadow-xl border-l-4 ${regionColour}`}
            >
              <div className="py-5 col-span-3">
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-gray-600">{benchmark}</div>
              </div>
              <div className="text-center">{domicile}</div>
              <div className="text-center">{region}</div>
              <div className="text-center">{holdings}</div>
              <div className="text-center">{size}</div>
              <div className="flex items-center gap-2 justify-end">
                {launch_date}
                <div className="border inline-block p-2 text-teal-500 border-teal-400 rounded-full cursor-pointer">
                  <RightArrow />
                </div>
              </div>
              <div className="text-center"></div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
