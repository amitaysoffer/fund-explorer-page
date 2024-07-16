import image from "../assets/BG.png";

export default function HeaderBanner() {
  return (
    <div className="relative bg-blue-900 h-48">
      <img
        src={image}
        alt="background-hero"
        className="absolute w-full h-full"
      />
      <div className="relative px-6 z-10 flex flex-col justify-evenly h-full container mx-auto text-white">
        <nav className="text-sm mb-2">
          <a href="/" className="underline">
            Home
          </a>{" "}
          / <span>Funds</span>
        </nav>
        <h1 className="text-5xl font-semibold">Our Funds</h1>
      </div>
    </div>
  );
}
