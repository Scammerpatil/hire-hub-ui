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
    <>
      <PageTitle title="Discover Your Next Career" />
      <div className="min-h-screen bg-base-100 pb-20 pt-16">
        {/* SEARCH BAR SECTION */}
        <div className="container mx-auto px-6 -mt-16">
          <div className="card bg-base-100 shadow-2xl border border-base-content/5 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative grow">
                <IconSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  className="input input-bordered input-primary w-full pl-12"
                  value={searchParams.search}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, search: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-4 shrink-0">
                <select
                  className="select select-bordered select-primary min-w-40"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                >
                  <option value="">All Locations</option>
                  {["Remote", "Onsite", "Hybrid"].map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>

                <select
                  className="select select-bordered select-primary min-w-40"
                  value={searchParams.jobType}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      jobType: e.target.value,
                    })
                  }
                >
                  <option value="">Job Category</option>
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (type) => (
                      <option key={type}>{type}</option>
                    ),
                  )}
                </select>

                <button className="btn btn-primary px-8" onClick={fetchJobs}>
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* JOB LISTINGS */}
        <div className="container mx-auto px-6 py-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <IconFilter size={20} className="text-primary" />
              Showing {filteredJobs.length} Jobs
            </h3>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-6">
              <AnimatePresence>
                {filteredJobs.map((job, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={job.jobId}
                    className="group card bg-base-200 border border-base-content/10 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="card-body p-6 md:p-8">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex gap-5">
                          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl uppercase border border-primary/20">
                            {job.company?.user.fullName.substring(0, 2)}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                              {job.jobTitle}
                            </h2>
                            <Link
                              href={`/candidate/company?companyId=${job.company?.companyId}`}
                              className="text-primary font-medium hover:underline flex items-center gap-1 mt-1"
                            >
                              {job.company?.user.fullName}
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-start md:items-end flex-col gap-2">
                          <div className="badge badge-success badge-outline gap-1 p-3">
                            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                            {job.status}
                          </div>
                          <p className="text-xs opacity-50 flex items-center gap-1">
                            <IconCalendar size={14} /> Posted{" "}
                            {new Date(job.postedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Metadata Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 py-4 border-y border-base-content/5">
                        <div className="flex items-center gap-2 text-sm opacity-70">
                          <IconMapPin size={18} className="text-primary" />
                          <span>{job.jobLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm opacity-70">
                          <IconBriefcase size={18} className="text-primary" />
                          <span>{job.jobCategory}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm opacity-70">
                          <IconCurrencyRupee
                            size={18}
                            className="text-primary"
                          />
                          <span>
                            {job.minPackage} - {job.maxPackage} LPA
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm opacity-70">
                          <IconUsers size={18} className="text-primary" />
                          <span>{job.totalOpenings} Openings</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm opacity-70 line-clamp-2 prose prose-sm max-w-none">
                          <Markdown>{job.jobDescription}</Markdown>
                        </div>
                      </div>

                      <div className="card-actions justify-between items-center mt-6">
                        <div className="flex flex-wrap gap-2">
                          {job.requiredSkills
                            ?.split(",")
                            .slice(0, 3)
                            .map((skill, index) => (
                              <span
                                key={index}
                                className="badge badge-ghost text-xs"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                          {job.requiredSkills?.split(",").length > 3 && (
                            <span className="text-xs opacity-50 self-center">
                              +{job.requiredSkills.split(",").length - 3} more
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/candidate/jobs/view?jobId=${job.jobId}`}
                          className="btn btn-primary group-hover:gap-3 transition-all"
                        >
                          View Details <IconArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-content/10">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconSearch size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold">No results found</h3>
              <p className="opacity-60 max-w-xs mx-auto mt-2">
                Try adjusting your filters or search terms to find what you're
                looking for.
              </p>
              <button
                onClick={() =>
                  setSearchParams({ search: "", location: "", jobType: "" })
                }
                className="btn btn-outline btn-sm mt-6"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
