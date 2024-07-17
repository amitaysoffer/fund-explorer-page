import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import ChevronUpIcon from "../assets/icons/ChevronUpIcon";
import Search from "../assets/icons/Search";
import UserIcon from "../assets/icons/UserIcon";
import logo from "../assets/JOH_logo.svg";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <img src={logo} alt="logo" />
      <div className="flex gap-6">
        <nav className="flex items-center space-x-8 text-blue-900">
          <div className="flex items-center gap-2 cursor-pointer">
            <a>About</a>
            <ChevronDownIcon />
          </div>
          <div className="relative flex items-center gap-2 cursor-pointer">
            <a>Funds</a>
            <ChevronUpIcon />
            <div className="absolute bottom-[-5px] left-0 w-full h-[1px] bg-blue-900"></div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <a>Insights</a>
            <ChevronDownIcon />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <a>Resources</a>
            <ChevronDownIcon />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <a>Contact</a>
            <ChevronDownIcon />
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-teal-500 rounded-full px-3 py-1">
            <span className="mr-2">
              <div className="text-white bg-teal-500 rounded-full p-1">
                <UserIcon />
              </div>
            </span>
            <span className=" font-extralight text-sm">UK | Professional</span>
          </div>
          <Search />
          <button className="">
            <i className="fas fa-search text-blue-900"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
