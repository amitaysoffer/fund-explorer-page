import logo from "../assets/JOH_logo.svg";
export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <img src={logo} alt="logo" />
      <div className="flex gap-6">
        <nav className="flex items-center space-x-8 text-blue-900">
          <div className="">
            <a className="cursor-pointer">About</a>
            {/* Add dropdown content if needed */}
          </div>
          <div className="">
            <a className="underline">Funds</a>
          </div>
          <div className="">
            <a className="cursor-pointer">Insights</a>
            {/* Add dropdown content if needed */}
          </div>
          <div className="">
            <a className="cursor-pointer">Resources</a>
            {/* Add dropdown content if needed */}
          </div>
          <div className="">
            <a className="cursor-pointer">Contact</a>
            {/* Add dropdown content if needed */}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-teal-500 rounded-full px-3 py-1">
            <span className="mr-2">
              <i className="fas fa-user text-teal-500"></i>
            </span>
            <span className=" font-extralight text-sm">UK | Professional</span>
          </div>
          <button className="">
            <i className="fas fa-search text-blue-900"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
