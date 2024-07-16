import RightArrow from "../assets/icons/RightArrow";
import { Funds } from "../types/funds";

export default function GridView({ funds }: Funds) {
  return (
    <div className="grid grid-cols-3 gap-10">
      {funds.map((fund) => {
        const {
          id,
          data: {
            fund_name: name,
            details: { domicile, holdings, fund_size, launch_date },
          },
        } = fund;
        return (
          <div key={id}>
            <div className="bg-darkBlue h-28 text-white flex justify-between flex-col  p-3">
              <h3>{name}</h3>
              <h4>{domicile}</h4>
            </div>
            <div className="bg-white p-4">
              <div className="grid grid-cols-3">
                <div>
                  <h4>FUND SIZE</h4>
                  <h3>{fund_size}</h3>
                </div>
                <div>
                  <h4>HOLDINGS</h4>
                  <h3>{holdings}</h3>
                </div>
                <div>
                  <h4>LAUNCH DATE</h4>
                  <h3>{launch_date}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h5>Monthly portfolio fact sheet</h5>
                <div className="border inline-block p-2 text-light-gray border-gray-light rounded-full cursor-pointer">
                  <RightArrow />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
