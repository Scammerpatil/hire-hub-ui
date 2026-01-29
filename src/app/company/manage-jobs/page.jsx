"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconCircleCheck,
  IconBriefcase,
  IconChartBar,
} from "@tabler/icons-react";

export default function ManageJobs() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useState({
    title: "",
    location: "all",
    type: "all",
    status: "all",
  });
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/spring-server/api/jobs/company/${user.userId}`,
        { withCredentials: true },
      );
      setJobs(res.data);
    } catch (error) {
      toast.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <Loading />;

  // Quick Stats Calculation
  const activeCount = jobs.filter((j) => j.status === "Active").length;

  return (
    <>
      <PageTitle title="Manage Your Listings" />
      <div className="pb-20">
        <div className="bg-base-200/50 border-b border-base-content/5 py-8 mb-8">
          <div className="container mx-auto px-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
              <div>
                <p className="opacity-60 mt-1 text-sm">
                  Create, edit, and track your organization's open roles.
                </p>
              </div>
              <Link
                href="/company/manage-jobs/post-job"
                className="btn btn-primary shadow-lg shadow-primary/20 gap-2"
              >
                <IconPlus size={18} /> Post New Job
              </Link>
            </div>

            {/* QUICK STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="stats shadow bg-base-100 border border-base-content/5">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <IconBriefcase size={32} />
                  </div>
                  <div className="stat-title text-xs uppercase font-bold opacity-50">
                    Total Postings
                  </div>
                  <div className="stat-value text-2xl">{jobs.length}</div>
                  <div className="stat-desc text-primary font-medium">
                    All time
                  </div>
                </div>
              </div>
              <div className="stats shadow bg-base-100 border border-base-content/5">
                <div className="stat">
                  <div className="stat-figure text-success">
                    <IconCircleCheck size={32} />
                  </div>
                  <div className="stat-title text-xs uppercase font-bold opacity-50">
                    Active Roles
                  </div>
                  <div className="stat-value text-2xl text-success">
                    {activeCount}
                  </div>
                  <div className="stat-desc">
                    Currently visible to candidates
                  </div>
                </div>
              </div>
              <div className="stats shadow bg-base-100 border border-base-content/5">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <IconChartBar size={32} />
                  </div>
                  <div className="stat-title text-xs uppercase font-bold opacity-50">
                    Avg. Applications
                  </div>
                  <div className="stat-value text-2xl">24</div>
                  <div className="stat-desc text-secondary font-medium">
                    ↗︎ 12% this month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-10">
          {/* FILTER BAR */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-content/5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold opacity-50">
                    SEARCH BY TITLE
                  </span>
                </label>
                <div className="relative">
                  <IconSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
                    size={18}
                  />
                  <input
                    type="text"
                    className="input input-primary w-full pl-10 bg-base-200/50 border-none focus:bg-base-100"
                    placeholder="e.g. Senior Dev"
                    value={searchParams.title}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold opacity-50">
                    LOCATION
                  </span>
                </label>
                <select
                  className="select select-primary w-full bg-base-200/50 border-none focus:bg-base-100"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                >
                  <option value="all">All Settings</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold opacity-50">
                    JOB TYPE
                  </span>
                </label>
                <select
                  className="select select-primary w-full bg-base-200/50 border-none focus:bg-base-100"
                  value={searchParams.type}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, type: e.target.value })
                  }
                >
                  <option value="all">Any Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold opacity-50">
                    STATUS
                  </span>
                </label>
                <select
                  className="select select-primary w-full bg-base-200/50 border-none focus:bg-base-100"
                  value={searchParams.status}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, status: e.target.value })
                  }
                >
                  <option value="all">Show All</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="overflow-hidden bg-base-100 rounded-2xl border border-base-content/5 shadow-xl">
            <table className="table w-full">
              <thead className="bg-base-200/50">
                <tr className="border-none text-xs uppercase tracking-wider opacity-60">
                  <th className="py-5 pl-8">Job Info</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th className="text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-content/5">
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-20">
                      <div className="flex flex-col items-center opacity-30">
                        <IconBriefcase size={48} stroke={1} />
                        <p className="mt-2 font-medium">No jobs posted yet.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr
                      key={job.jobId}
                      className="hover:bg-base-200/30 transition-colors group"
                    >
                      <td className="py-5 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {job.jobTitle.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-base-content">
                              {job.jobTitle}
                            </div>
                            <div className="text-xs opacity-50 font-medium">
                              {job.jobPosition}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost font-medium">
                          {job.jobCategory}
                        </span>
                      </td>
                      <td>
                        <div className="text-sm font-medium">
                          {job.jobLocation}
                        </div>
                      </td>
                      <td>
                        {job.status === "Active" ? (
                          <div className="flex items-center gap-1.5 text-success font-bold text-xs uppercase tracking-tighter">
                            <span className="w-2 h-2 rounded-full bg-success"></span>{" "}
                            Active
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-warning font-bold text-xs uppercase tracking-tighter">
                            <span className="w-2 h-2 rounded-full bg-warning"></span>{" "}
                            Inactive
                          </div>
                        )}
                      </td>
                      <td className="text-right pr-8">
                        <Link
                          href={`/company/manage-jobs/edit?jobId=${job.jobId}`}
                          className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 gap-2"
                        >
                          <IconEdit size={16} /> Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
