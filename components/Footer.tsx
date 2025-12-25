"use client"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, User, Heart, ShoppingBag, Shield, FileText, HelpCircle, MessageCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

const Footer = () => {
  const {theme}=useTheme()
  return (
    <footer className={`mt-20 w-full px-4 py-8 md:px-8 lg:px-16 ${theme==="dark" ? "bg-[#1f1f1f] text-white" : "bg-[#f4f2f2] text-black"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Exclusive Subscribe</h3>
          <p className="mb-4">Get 10% off your first order</p>
          <div className="flex flex-col gap-2">
            <input type="email" placeholder="Enter your email" className={`flex-1 px-3 py-2 border rounded focus:outline-none focus:border-gray-400 transition-colors ${  theme === "dark"     ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"     : "bg-white border-gray-300 text-black placeholder-gray-500"}`} /> 
            <button className={`px-4 py-2 rounded transition-colors cursor-pointer ${  theme === "dark"     ? "bg-gray-700 hover:bg-gray-600 text-white"     : "bg-gray-200 hover:bg-gray-300 text-black"}`}>  Subscribe</button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <div className="space-y-4"><div className="flex items-center gap-2">  <MapPin className="h-5 w-5" />   <p>111 Bijoy sarani, Dhaka DH 1515, Bangladesh.</p></div><div className="flex items-center gap-2">  <Mail className="h-5 w-5" />   <a href="mailto:exclusive@gmail.com" className="hover:underline transition-colors">    exclusive@gmail.com  </a></div><div className="flex items-center gap-2">  <Phone className="h-5 w-5" />   <a href="tel:+8801588889999" className="hover:underline transition-colors">    +88015-8888-9999  </a></div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 hover:underline cursor-pointer transition-colors">
              <User className="h-5 w-5" /> 
              <span>My Account</span>
            </li>
            <li className="flex items-center gap-2 hover:underline cursor-pointer transition-colors">
              <Heart className="h-5 w-5" /> 
              <span>Wishlist</span>
            </li>
            <li className="flex items-center gap-2 hover:underline cursor-pointer transition-colors">
              <ShoppingBag className="h-5 w-5" /> 
              <span>Shop</span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
          <ul className="space-y-2"><li className="flex items-center gap-2 hover:underline cursor-pointer transition-colors">  <Shield className="h-5 w-5" />   <span>Privacy Policy</span></li><li className="flex items-center gap-2 hover:underline cursor-pointer transition-colors">  <FileText className="h-5 w-5" />   <span>Terms Of Use</span></li><li className="flex items-center gap-2 hover:underline cursor-pointer transition-colors">  <HelpCircle className="h-5 w-5" />   <span>FAQ</span></li><li className="flex items-center gap-2 hover:underline cursor-pointer transition-colors">  <MessageCircle className="h-5 w-5" />   <span>Contact</span></li>
          </ul>
        </div>
      </div>
      <div className={`border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 ${theme === "dark"   ? "border-gray-700"   : "border-gray-300" }`}><p className={`text-sm ${  theme === "dark"     ? "text-gray-400"     : "text-gray-600"}`}>  &copy; 2025 Your Company. All rights reserved.</p><div className="flex gap-4">  <a href="#" className={`transition-colors ${    theme === "dark"       ? "text-gray-400 hover:text-white"       : "text-gray-600 hover:text-black"  }`}>    <Facebook className="h-5 w-5" />  </a>  <a href="#" className={`transition-colors ${    theme === "dark"       ? "text-gray-400 hover:text-white"       : "text-gray-600 hover:text-black"  }`}>    <Twitter className="h-5 w-5" />  </a>  <a href="#" className={`transition-colors ${    theme === "dark"       ? "text-gray-400 hover:text-white"       : "text-gray-600 hover:text-black"  }`}>    <Instagram className="h-5 w-5" />  </a>  <a href="#" className={`transition-colors ${    theme === "dark"       ? "text-gray-400 hover:text-white"       : "text-gray-600 hover:text-black"  }`}>    <Linkedin className="h-5 w-5" />  </a></div>
      </div>
    </footer>
  );
};

export default Footer;