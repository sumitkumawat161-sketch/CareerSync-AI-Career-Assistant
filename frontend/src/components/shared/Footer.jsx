import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-6 bg-white">
      
      <div className="max-w-4xl mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-gray-800">
              CareerSync
            </h2>
            <p className="text-sm text-gray-500">
              Find your dream job easily
            </p>
          </div>
          <div className="text-center md:text-left text-sm text-gray-600">
            <p>Email: <span className="text-blue-600">sumitkumawat161@gmail.com</span></p>
            <p>Contact: <span className="text-blue-600">+91 8003207615</span></p>
          </div>
          <div className="flex gap-4">
  <a href="https://facebook.com" target="_blank" rel="noreferrer">
    <Facebook className="w-5 h-5 hover:text-blue-600" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noreferrer">
    <Twitter className="w-5 h-5 hover:text-blue-500" />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
    <Linkedin className="w-5 h-5 hover:text-blue-700" />
  </a>
</div>
          

        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-sm text-gray-400">
          © 2026 CareerSync. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;