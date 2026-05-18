'use client';

import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

         
          <div>
            <h2 className="text-lg font-semibold mb-4">Platform</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ideas" className="hover:text-primary">Ideas</Link></li>
              <li><Link href="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link href="/trending" className="hover:text-primary">Trending</Link></li>
              <li><Link href="/submit" className="hover:text-primary">Submit Idea</Link></li>
            </ul>
          </div>

          
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: support@ideavault.com</p>
              <p>Phone: +880 1234 ******</p>
              <p>Location: Bangladesh</p>
            </div>
          </div>

          
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-5 text-xl">
              <a href="#" className="hover:text-primary transition"><FaFacebook /></a>
              <a href="#" className="hover:text-primary transition"><FaTwitter /></a>
              <a href="#" className="hover:text-primary transition"><FaLinkedin /></a>
              <a href="#" className="hover:text-primary transition"><FaGithub /></a>
            </div>
          </div>

          
          <div>
            <h2 className="text-lg font-semibold mb-4">IdeaVault</h2>
            <p className="text-sm text-muted-foreground leading-6">
              Share innovative startup ideas, explore creativity, and collaborate with others to build the future.
            </p>
          </div>

        </div>

        
        <div className="border-t border-border mt-10 pt-5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} IdeaVault. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;