"use client";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Hire-Hub – Smart Hiring & Candidate Management Platform</title>
        <meta
          name="description"
          content="Hire-Hub is an advanced employment management system designed to streamline recruitment for companies while giving candidates a seamless job-search experience. Built with automated job posting, intelligent candidate filtering, and integrated assessment tools, Hire-Hub helps organizations hire faster and more efficiently.
          The platform offers secure multi-role logins for admins, companies, employees, and candidates. Recruiters can easily post jobs, filter applicants based on skills, qualifications, and experience, and conduct online tests including MCQs, logic assessments, and coding rounds. Candidates can explore relevant job openings, apply instantly, take skill tests, and track their application status in real time.
          Hire-Hub also includes an employee referral system where staff can quickly recommend qualified candidates for open positions. With a user-friendly design, mobile compatibility, strong data security, and high-performance processing, Hire-Hub ensures a smooth and reliable hiring experience for all users.
          Optimize your recruitment process with Hire-Hub—your all-in-one platform for smart hiring, candidate evaluation, and efficient workforce management."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased roboto-condensed`}>
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
