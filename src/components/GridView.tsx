import FileTextIcon from "../assets/icons/FileTextIcon";
import RightArrow from "../assets/icons/RightArrow";
import { Funds } from "../types/funds";
import { regionColourPicker } from "../utils/util";

export default function GridView({ funds }: Funds) {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      data-testid="grid-view"
    >
      {funds.map((fund) => {
        const {
          id,
          data: {
            fund_name: name,
            details: { domicile, holdings, fund_size, launch_date, region },
          },
        } = fund;
        const regionColour = regionColourPicker(region);

        return (
          <div key={id} className={`border-l-4 ${regionColour} flex flex-col`}>
            <div className="bg-dark-blue h-32 text-white flex flex-col justify-between p-3">
              <h3 className="text-xl">{name}</h3>
              <h4>{domicile}</h4>
            </div>
            <div className="bg-white p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-gray-400 text-xs">FUND SIZE</h4>
                    <h3 className="text-md">{fund_size}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-gray-400 text-xs">HOLDINGS</h4>
                    <h3>{holdings}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-gray-400 text-xs">LAUNCH DATE</h4>
                    <h3>{launch_date}</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-8">
                <div className="text-sm text-gray-500 flex gap-3 items-center">
                  <FileTextIcon />
                  <span>Monthly portfolio fact sheet</span>
                </div>
                <div className="border inline-block p-2 text-teal-500 border-teal-400 rounded-full cursor-pointer">
                  <RightArrow />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
