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
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    title: "",
    location: "all",
    type: "all",
    status: "all",
  });

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

  const activeCount = jobs.filter((j) => j.status === "Active").length;

  return (
    <>
      <PageTitle title="Job Management" />
      <main className="mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Link
            href="/company/manage-jobs/post-job"
            className="btn btn-primary shadow-md gap-2"
          >
            <IconPlus size={18} /> Post Job
          </Link>
        </div>

        {/* SEMANTIC STATS SECTION */}
        <section className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200/50 border border-base-300">
          <div className="stat">
            <div className="stat-figure text-primary">
              <IconBriefcase size={30} />
            </div>
            <div className="stat-title">Total Postings</div>
            <div className="stat-value text-primary">{jobs.length}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-success">
              <IconCircleCheck size={30} />
            </div>
            <div className="stat-title">Active Roles</div>
            <div className="stat-value text-success">{activeCount}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <IconChartBar size={30} />
            </div>
            <div className="stat-title">Avg. Engagement</div>
            <div className="stat-value">24</div>
            <div className="stat-desc text-secondary font-semibold">
              ↗︎ 12% vs last month
            </div>
          </div>
        </section>

        {/* NEW FIELDSET FILTERS */}
        <fieldset className="fieldset bg-base-200 border border-base-300 p-6 rounded-box grid grid-cols-1 md:grid-cols-4 gap-4">
          <legend className="fieldset-legend font-bold text-base px-2">
            Filter Listings
          </legend>

          <div className="form-control">
            <label className="label-text mb-2">Search Title</label>
            <label className="input input-bordered flex items-center gap-2">
              <IconSearch size={16} className="opacity-50" />
              <input
                type="text"
                placeholder="Search..."
                className="grow"
                value={searchParams.title}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, title: e.target.value })
                }
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label-text mb-2">Location</label>
            <select
              className="select select-bordered"
              value={searchParams.location}
              onChange={(e) =>
                setSearchParams({ ...searchParams, location: e.target.value })
              }
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label-text mb-2">Job Type</label>
            <select
              className="select select-bordered"
              value={searchParams.type}
              onChange={(e) =>
                setSearchParams({ ...searchParams, type: e.target.value })
              }
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label-text mb-2">Visibility</label>
            <select
              className="select select-bordered"
              value={searchParams.status}
              onChange={(e) =>
                setSearchParams({ ...searchParams, status: e.target.value })
              }
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Archived</option>
            </select>
          </div>
        </fieldset>

        {/* TABLE SECTION */}
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table bg-base-100">
            <thead className="bg-base-200/80">
              <tr>
                <th>Role</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 opacity-50">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.jobId} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-lg w-10 flex items-center justify-center">
                            <span className="text-xl">
                              {job.jobTitle.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{job.jobTitle}</div>
                          <div className="text-xs opacity-50">
                            {job.jobPosition}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-outline">
                        {job.jobCategory}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm font-bold ${job.status === "Active" ? "badge-success" : "badge-warning"}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/company/manage-jobs/edit?jobId=${job.jobId}`}
                        className="btn btn-ghost btn-sm"
                      >
                        <IconEdit size={18} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
