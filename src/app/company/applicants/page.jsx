"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  IconSearch,
  IconFilter,
  IconMail,
  IconSchool,
  IconChevronRight,
  IconBriefcase,
} from "@tabler/icons-react";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/AuthContext";

export default function ApplicantsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);
  const [searchParams, setSearchParams] = useState({
    candidateName: "",
    job: "",
    status: "",
  });
  const [applicants, setApplicants] = useState([]);

  const fetchApplicants = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `/spring-server/api/application/company/${user.userId}`,
      );
      setApplicants(res.data);
      console.log(res.data);
    } catch (err) {
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [user]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.put(
        `/spring-server/api/application-status/update/${applicationId}`,
        null,
        { params: { newStatus: newStatus } },
      );
      toast.success(`Candidate marked as ${newStatus}`);
      fetchApplicants();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const jobs = [...new Set(applicants.map((a) => a.job.jobTitle))];

  const filteredApplicants = applicants.filter((app) => {
    const matchName = app.candidate.fullName
      .toLowerCase()
      .includes(searchParams.candidateName.toLowerCase());
    const matchJob =
      searchParams.job === "" || app.job.jobTitle === searchParams.job;
    const matchStatus =
      searchParams.status === "" || app.status === searchParams.status;
    return matchName && matchJob && matchStatus;
  });

  if (loading) return <Loading />;

  return (
    <>
      <PageTitle title="Manage Applicants" />
      <div className="min-h-screen bg-base-200/50 pb-20">
        <div className="container mx-auto px-6 pt-6">
          {/* FILTER BAR */}
          <div className="card bg-base-100 shadow-sm border border-base-content/5 mb-8">
            <div className="card-body p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend opacity-50 uppercase tracking-widest">
                    Search Name
                  </legend>
                  <div className="input input-primary w-full">
                    <IconSearch size={18} />
                    <input
                      type="text"
                      placeholder="Candidate name..."
                      className="grow"
                      value={searchParams.candidateName}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          candidateName: e.target.value,
                        })
                      }
                    />
                  </div>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend opacity-50 uppercase tracking-widest">
                    By Job Position
                  </legend>
                  <select
                    className="select select-primary w-full"
                    value={searchParams.job}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, job: e.target.value })
                    }
                  >
                    <option value="">All Positions</option>
                    {jobs.map((job) => (
                      <option value={job} key={job}>
                        {job}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend opacity-50 uppercase tracking-widest">
                    By Status
                  </legend>
                  <select
                    className="select select-primary w-full"
                    value={searchParams.status}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="">All Statuses</option>
                    {[
                      "Applied",
                      "Shortlisted",
                      "Contacted",
                      "Interview Scheduled",
                      "Rejected",
                    ].map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>
            </div>
          </div>

          {/* APPLICANTS LIST */}
          {filteredApplicants.length === 0 ? (
            <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-content/10">
              <IconFilter size={48} className="mx-auto opacity-20 mb-4" />
              <p className="text-xl font-bold opacity-40">
                No applicants match your filters
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredApplicants.map((app) => (
                <div
                  key={app.applicationId}
                  className="card card-side bg-base-100 border border-base-300 shadow-sm hover:border-primary/30 transition-all group overflow-hidden"
                >
                  {/* 1. Left Section: Profile & Info */}
                  <div className="flex flex-1 flex-col md:flex-row p-6 gap-6 items-center md:items-start">
                    <div className="avatar">
                      <div className="w-20 h-20 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={app.candidate?.profileImage}
                          alt={app.candidate.fullName}
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 text-center md:text-left">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                          <h3 className="text-lg font-bold">
                            {app.candidate.fullName}
                          </h3>
                          {app.referredByEmployeeName && (
                            <div className="badge badge-secondary badge-outline badge-sm">
                              Ref: {app.referredByEmployeeName}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-base-content/60 justify-center md:justify-start">
                          <span className="flex items-center gap-1">
                            <IconMail size={14} /> {app.candidate?.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <IconBriefcase size={14} />{" "}
                            {app.candidate.experienceYears || 0} Yrs
                          </span>
                          <span className="flex items-center gap-1">
                            <IconSchool size={14} />
                            <span className="font-medium text-base-content">
                              {" "}
                              {app.job.jobTitle}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                        {app.candidate.skills
                          ?.split(",")
                          .slice(0, 4)
                          .map((skill, i) => (
                            <span
                              key={i}
                              className="badge badge-ghost badge-sm font-semibold opacity-70"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. Right Section: Control Panel */}
                  <div className="w-full md:w-72 bg-base-200/50 p-6 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-base-300">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend opacity-50 uppercase tracking-widest">
                        Status
                      </legend>
                      <select
                        className={`select select-bordered select-sm w-full font-bold ${
                          app.status === "Shortlisted"
                            ? "select-success"
                            : app.status === "Rejected"
                              ? "select-error"
                              : "select-ghost"
                        }`}
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app.applicationId, e.target.value)
                        }
                      >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interview Scheduled">Interview</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </fieldset>

                    <Link
                      href={`/company/applicants/view?candidateId=${app.candidate.candidateId}`}
                      className="btn btn-primary btn-sm btn-block group-hover:shadow-lg transition-all"
                    >
                      View Profile
                      <IconChevronRight size={16} className="ml-auto" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
