"use client";

import Loading from "../../../components/Loading";
import PageTitle from "../../../components/PageTitle";
import Markdown from "react-markdown";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
  IconCurrencyRupee,
  IconCalendar,
  IconUsers,
  IconFilter,
  IconArrowRight,
  IconBookmark,
  IconBuildingSkyscraper,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobsListingPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    search: "",
    location: "",
    jobType: "",
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/spring-server/api/jobs/all");
      setJobs(response.data);
    } catch {
      toast.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <Loading />;

  const filteredJobs = jobs.filter((job) => {
    return (
      (searchParams.search
        ? job.jobTitle.toLowerCase().includes(searchParams.search.toLowerCase())
        : true) &&
      (searchParams.location
        ? job.jobLocation
            .toLowerCase()
            .includes(searchParams.location.toLowerCase())
        : true) &&
      (searchParams.jobType
        ? job.jobCategory.toLowerCase() === searchParams.jobType.toLowerCase()
        : true) &&
      job.status === "Active"
    );
  });

  return (
    <main className="min-h-screen bg-base-200/50">
      <PageTitle title="Career Marketplace" />

      {/* HERO / SEARCH SECTION */}
      <section className="bg-primary/5 border-b border-primary/10 pt-10 pb-20">
        <div className="container mx-auto px-6 text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Find your <span className="text-primary italic">dream</span> role.
          </h1>
          <p className="opacity-60 max-w-xl mx-auto">
            Discover opportunities from industry leaders and fast-growing
            startups.
          </p>
        </div>

        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-2 bg-base-200 p-2 rounded-2xl shadow-2xl border border-base-content/10">
            <div className="flex-1 relative">
              <IconSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by job title or keywords..."
                className="input input-primary w-full pl-12 focus:bg-transparent"
                value={searchParams.search}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, search: e.target.value })
                }
              />
            </div>
            <div className="divider lg:divider-horizontal m-0 opacity-10"></div>
            <select
              className="select select-ghost font-medium"
              value={searchParams.location}
              onChange={(e) =>
                setSearchParams({ ...searchParams, location: e.target.value })
              }
            >
              <option value="">Anywhere</option>
              {["Remote", "Onsite", "Hybrid"].map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
            <button
              className="btn btn-primary px-10 rounded-xl"
              onClick={fetchJobs}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 -mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR FILTERS */}
          <aside className="lg:col-span-3 space-y-6">
            <fieldset className="fieldset bg-base-200 p-6 rounded-3xl border border-base-content/5 shadow-sm sticky top-24">
              <legend className="fieldset-legend flex items-center gap-2 text-primary font-bold">
                <IconFilter size={18} /> Filters
              </legend>

              <div className="space-y-4 w-full">
                <div>
                  <label className="label-text text-xs uppercase font-bold opacity-50 block mb-2">
                    Employment Type
                  </label>
                  <select
                    className="select select-bordered w-full select-sm"
                    value={searchParams.jobType}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        jobType: e.target.value,
                      })
                    }
                  >
                    <option value="">All Types</option>
                    {["Full-time", "Part-time", "Contract", "Internship"].map(
                      (t) => (
                        <option key={t}>{t}</option>
                      ),
                    )}
                  </select>
                </div>

                <div className="divider opacity-50"></div>

                <div className="text-sm opacity-60">
                  <p>Don't see what you're looking for?</p>
                  <button
                    onClick={() =>
                      setSearchParams({ search: "", location: "", jobType: "" })
                    }
                    className="link link-primary mt-1"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </fieldset>
          </aside>

          {/* JOB FEED */}
          <section className="lg:col-span-9 space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-semibold opacity-70">
                {filteredJobs.length} opportunities found
              </h3>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: idx * 0.05 }}
                    key={job.jobId}
                    className="group relative bg-base-200 rounded-3xl p-1 border border-base-content/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all"
                  >
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                      {/* Company Branding */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:scale-105 transition-transform">
                          <IconBuildingSkyscraper size={36} stroke={1.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <h2 className="text-2xl font-bold tracking-tight">
                                {job.jobTitle}
                              </h2>
                              <span className="badge badge-primary badge-outline font-bold text-[10px] uppercase tracking-wider">
                                {job.jobCategory}
                              </span>
                            </div>
                            <Link
                              href={`/candidate/company?companyId=${job.company?.companyId}`}
                              className="text-lg opacity-60 hover:text-primary transition-colors flex items-center gap-1 mt-1 font-medium"
                            >
                              {job.company?.user.fullName}
                            </Link>
                          </div>
                          <button className="btn btn-ghost btn-circle btn-sm">
                            <IconBookmark
                              size={20}
                              className="opacity-40 hover:opacity-100"
                            />
                          </button>
                        </div>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap gap-4 text-sm font-medium">
                          <span className="flex items-center gap-1.5 opacity-70 bg-base-200 px-3 py-1 rounded-full">
                            <IconMapPin size={16} className="text-primary" />{" "}
                            {job.jobLocation}
                          </span>
                          <span className="flex items-center gap-1.5 opacity-70 bg-base-200 px-3 py-1 rounded-full">
                            <IconCurrencyRupee
                              size={16}
                              className="text-primary"
                            />{" "}
                            {job.minPackage}-{job.maxPackage} LPA
                          </span>
                          <span className="flex items-center gap-1.5 opacity-70 bg-base-200 px-3 py-1 rounded-full">
                            <IconCalendar size={16} className="text-primary" />{" "}
                            {new Date(job.postedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="line-clamp-2 prose prose-sm opacity-50 pt-2">
                          <Markdown>{job.jobDescription}</Markdown>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-base-content/5">
                          <div className="flex gap-2">
                            {job.requiredSkills
                              ?.split(",")
                              .slice(0, 4)
                              .map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-[11px] font-bold uppercase tracking-widest opacity-40"
                                >
                                  {skill.trim()}
                                </span>
                              ))}
                          </div>
                          <Link
                            href={`/candidate/jobs/view?jobId=${job.jobId}`}
                            className="btn btn-primary rounded-xl px-8 hover:shadow-lg hover:shadow-primary/30 group/btn"
                          >
                            View Role
                            <IconArrowRight
                              size={18}
                              className="group-hover/btn:translate-x-1 transition-transform"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-base-200/50 rounded-box border-2 border-dashed border-base-content/10">
                  <IconSearch size={48} className="mx-auto opacity-20 mb-4" />
                  <p className="text-xl font-bold opacity-40">
                    No matching careers found
                  </p>
                </div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}
