
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">About Us</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Best Kids Finds is your premier destination for discovering amazing deals on children's clothing and accessories. We carefully curate the best discounts so you can save time and money.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link to="/" className="hover:text-primary-foreground transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link to="/hot-deals" className="hover:text-primary-foreground transition-colors text-sm">Hot Deals</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary-foreground transition-colors text-sm">Categories</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary-foreground transition-colors text-sm">Shopping Tips</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-foreground transition-colors text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link to="/category/kids" className="hover:text-primary-foreground transition-colors text-sm">Kids' Clothing</Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-primary-foreground transition-colors text-sm">Women's Clothing</Link>
              </li>
              <li>
                <Link to="/category/men" className="hover:text-primary-foreground transition-colors text-sm">Men's Clothing</Link>
              </li>
              <li>
                <Link to="/category/home" className="hover:text-primary-foreground transition-colors text-sm">Home & Lifestyle</Link>
              </li>
              <li>
                <Link to="/category/gifts" className="hover:text-primary-foreground transition-colors text-sm">Gift Ideas</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Join Our Community</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Get exclusive deals and updates delivered straight to your WhatsApp.
            </p>
            <div className="flex">
              <input 
                type="tel" 
                placeholder="Your phone number" 
                className="py-2 px-3 w-full rounded-l-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="bg-secondary text-secondary-foreground px-4 rounded-r-md hover:bg-secondary/90 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 pt-8 text-sm text-primary-foreground/60 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Best Kids Finds. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
            <Link to="/affiliate" className="hover:text-primary-foreground transition-colors">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
