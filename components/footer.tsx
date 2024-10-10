import { FacebookIcon, InstagramIcon } from "lucide-react";
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-slate-400 dark:bg-gray-700 border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black dark:text-white">
          &copy; 2024 Ramie, Inc. All Rights Reserved
        </p>
        <div className="mx-10 my-3 text-sm flex justify-between flex-shrink">
          <div></div>
          <div>
            <span className="text-gray-500">About Us</span>
            <p>Kurta Glow store was established in 2022.</p>
          </div>
          <div className="mx-2">
            <span className="text-gray-500">Social Media</span>

            <p>Instagram</p>
            <p>Facebook</p>
            <p>Whatsapp</p>
            <p>tiktok</p>
          </div>
          <div className="">
            <span className="text-gray-500">Contact Us</span>

            <div>
              <p>unique98@gmail.com</p>
              <p>+77-410000</p>
              <p>98765345678</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
