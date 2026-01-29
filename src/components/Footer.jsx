import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconShield,
} from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-10">
      <aside>
        <div className="flex items-center gap-2 mb-4">
          <IconShield size={32} className="text-primary" />
          <span className="text-2xl font-bold">HireHub</span>
        </div>
        <p className="font-semibold">
          Smart Hiring & Candidate Management Platform
        </p>
        <p>Hiring candidates from 2025</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-6">
          <Link href="/" className="link link-hover">
            Home
          </Link>
          <a href="#about" className="link link-hover">
            About
          </a>
          <a href="#features" className="link link-hover">
            Features
          </a>
          <a href="#contact" className="link link-hover">
            Contact
          </a>
        </div>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
          >
            <IconBrandTwitter size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
          >
            <IconBrandGithub size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
          >
            <IconBrandLinkedin size={24} />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          &copy; 2025 HireHub. All rights reserved. | Built with
          <span className="text-error"> ❤ </span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
