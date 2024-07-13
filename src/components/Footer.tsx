import logo from "../assets/JOH_logo.svg";

export default function Footer() {
  return (
    <footer className="bg-white text-blue-900 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-8">
          {/* Logo Section */}
          <div>
            <img src={logo} alt="Logo" className="h-16 mb-4" />
          </div>

          {/* Navigation Section */}
          <div className="flex space-x-16">
            <div>
              <h3 className="font-semibold mb-2">About Us</h3>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Our people & leadership
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Our commitment
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Corporate Social Responsibility
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Diversity, equity & inclusion
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Our Funds</h3>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Our investment strategies
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Our investment platforms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Insights</h3>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Articles
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Blogs
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Videos
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Podcasts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Policies & statements
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Investor resources
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Reports & accounts
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:underline">
                    Glossary
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* LinkedIn Icon */}
          <div className="flex items-center">
            <a href="#" className="text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">
              Legal
            </a>
            <a href="#" className="hover:underline">
              Privacy Notice
            </a>
            <a href="#" className="hover:underline">
              Investor Rights
            </a>
            <a href="#" className="hover:underline">
              Company Policies
            </a>
            <a href="#" className="hover:underline">
              Modern Slavery Act
            </a>
            <a href="#" className="hover:underline">
              Keeping you safe
            </a>
            <a href="#" className="hover:underline">
              Careers
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="text-sm text-gray-600 mt-4">
          <p>
            This website is issued and approved in the UK by J O Hambro Capital
            Management Limited ("JOHCML") which is authorised and regulated by
            the Financial Conduct Authority. Registered office: Level 3, 1 St
            James's Market, London SW1Y 4AH. Issued in the European Union by
            Perpetual Investment Services Europe Limited ("PISEL") which is
            authorised by the Central Bank of Ireland. Registered office: 24
            Fitzwilliam Place, Dublin 2, Ireland D02 T296. References to "JOHCM"
            below are to either JOHCML or PISEL as the context requires. J O
            Hambro® and JOHCM® are registered trademarks of JOHCML. Telephone
            calls to and from JOHCML and PISEL may be recorded.
          </p>
          <p className="mt-2">
            © 2024 J O Hambro Capital Management Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
