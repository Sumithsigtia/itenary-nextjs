import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            AI Travel Planner is your go-to platform for personalized travel
            itineraries. We leverage AI to craft unforgettable travel
            experiences tailored to your preferences and budget.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <a
                href="/"
                className="hover:text-white transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/trip"
                className="hover:text-white transition-colors duration-300"
              >
                Plan Trip
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-white transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              className="hover:text-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.x.com"
              className="hover:text-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M17.05 3.3L12 8.35 6.95 3.3 3.3 6.95 8.35 12l-5.05 5.05L6.95 20.7 12 15.65l5.05 5.05 3.65-3.65L15.65 12l5.05-5.05L17.05 3.3z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com"
              className="hover:text-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>Karnataka, India</p>
          <p>Bangalore 560068</p>
          <p>Email: info@aitravelplanner.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <p className="text-center text-xs pt-8">© 2024 AI Travel Planner. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
