"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  IconBolt,
  IconBriefcase,
  IconCircleCheck,
  IconFilter,
  IconQuote,
  IconStar,
  IconTarget,
  IconUsers,
  IconArrowRight,
  IconSearch,
} from "@tabler/icons-react";
import GlassCard from "../../components/GlassCard";
import Link from "next/link";
import { useRef } from "react";

const Home = () => {
  const containerRef = useRef(null);

  // Features with added "Action" text for interactivity
  const features = [
    {
      icon: IconBriefcase,
      title: "Smart Job Posting",
      description:
        "AI-ready posting with role templates and eligibility filters for precise matching.",
      color: "bg-blue-500",
    },
    {
      icon: IconFilter,
      title: "Automatic Filtering",
      description:
        "Filter candidates by degree, skills, and experience automatically.",
      color: "bg-purple-500",
    },
    {
      icon: IconUsers,
      title: "Employee Referrals",
      description:
        "Simple referral flow with tracking to leverage your team's network.",
      color: "bg-emerald-500",
    },
    {
      icon: IconCircleCheck,
      title: "Assessment Engine",
      description:
        "MCQs and coding challenges to evaluate candidates thoroughly.",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="bg-base-100 overflow-x-hidden">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            <div className="badge badge-outline badge-accent gap-2 py-4 px-6 mb-6 font-medium animate-pulse">
              <IconBolt size={16} /> 2.0 version is now live
            </div>

            <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tight mb-6">
              Recruitment <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">
                Redefined.
              </span>
            </h1>

            <p className="text-lg text-base-content/70 mb-10 max-w-lg leading-relaxed">
              Stop digging through resumes. Hire-Hub uses intelligent filtering
              and team-driven referrals to find your next 10x hire in half the
              time.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="btn btn-primary btn-lg shadow-lg group"
              >
                Start Hiring{" "}
                <IconArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="btn btn-ghost btn-lg border-base-content/10"
              >
                View Demo
              </Link>
            </div>

            {/* Live Stats Row */}
            <div className="mt-12 flex items-center gap-8 border-t border-base-content/5 pt-8">
              <div>
                <div className="text-2xl font-bold">12k+</div>
                <div className="text-xs uppercase tracking-widest opacity-50">
                  Jobs Filled
                </div>
              </div>
              <div className="divider divider-horizontal"></div>
              <div>
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-xs uppercase tracking-widest opacity-50">
                  User Rating
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl border border-base-content/10 bg-base-200/50 backdrop-blur-sm p-2 shadow-2xl">
              <div className="bg-base-100 rounded-2xl overflow-hidden aspect-square lg:aspect-video flex items-center justify-center relative">
                <IconSearch
                  size={80}
                  className="text-primary/20 absolute animate-ping"
                />
                <img
                  src="/hero-image.jpg"
                  alt="Dashboard Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-8 card bg-base-100 shadow-xl p-4 hidden md:flex flex-row items-center gap-4 z-20 border border-primary/20"
            >
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-12">
                  <span>OP</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold">Ojas Patil</p>
                <p className="text-[10px] opacity-60">
                  Senior Developer · Matched 98%
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- LOGO MARQUEE --- */}
      <div className="py-12 bg-base-200/30 border-y border-base-content/5">
        <p className="text-center text-sm font-semibold opacity-40 mb-8 uppercase tracking-[0.2em]">
          Trusted by Global Innovators
        </p>
        <div className="flex overflow-hidden space-x-16 group">
          <div className="flex space-x-16 animate-marquee whitespace-nowrap py-4">
            {[
              "Google",
              "Amazon",
              "Meta",
              "Netflix",
              "Airbnb",
              "Uber",
              "Stripe",
            ].map((logo) => (
              <span
                key={logo}
                className="text-3xl font-bold opacity-20 hover:opacity-100 transition-opacity cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div
            className="flex space-x-16 animate-marquee whitespace-nowrap py-4"
            aria-hidden="true"
          >
            {[
              "Google",
              "Amazon",
              "Meta",
              "Netflix",
              "Airbnb",
              "Uber",
              "Stripe",
            ].map((logo) => (
              <span key={logo} className="text-3xl font-bold opacity-20">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- FEATURES BENTO GRID --- */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Hiring tools built for the modern age
          </h2>
          <p className="opacity-60 max-w-xl mx-auto">
            Skip the spreadsheets. Manage your entire pipeline in one fluid
            interface.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={i}
              className={`p-8 rounded-3xl border border-base-content/5 bg-base-200/50 hover:bg-base-200 transition-colors ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center text-white mb-6 shadow-lg`}
              >
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="opacity-60 leading-relaxed mb-6">{f.description}</p>
              <Link
                href="#"
                className="btn btn-sm btn-ghost gap-2 px-0 hover:bg-transparent hover:text-primary"
              >
                Learn more <IconArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-primary text-primary-content p-12 lg:p-20 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to find your next star?
            </h2>
            <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">
              Join 5,000+ companies already scaling their teams with Hire-Hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-base-100 text-base-content border-none hover:bg-base-200">
                Create Free Account
              </button>
              <button className="btn btn-lg btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Styles for the marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
