"use client";

import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Applicant } from "@/Type";
import { useAuth } from "@/context/AuthContext";
import {
  IconSearch,
  IconFilter,
  IconMail,
  IconSchool,
  IconTrophy,
  IconChevronRight,
  IconBriefcase,
} from "@tabler/icons-react";

export default function ApplicantsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);
  const [searchParams, setSearchParams] = useState({
    candidateName: "",
    job: "",
    status: "",
  });
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const fetchApplicants = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `/spring-server/api/application/company/${user.userId}`
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

  const handleStatusChange = async (
    applicationId: number,
    newStatus: string
  ) => {
    try {
      await axios.put(
        `/spring-server/api/application-status/update/${applicationId}`,
        null,
        { params: { newStatus: newStatus } }
      );
      toast.success(`Candidate marked as ${newStatus}`);
      fetchApplicants();
    } catch (err: any) {
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
              <div className="flex flex-col lg:flex-row gap-4 items-end">
                <div className="form-control grow">
                  <label className="label font-bold text-[10px] opacity-50 uppercase tracking-widest">
                    Search Name
                  </label>
                  <div className="relative">
                    <IconSearch
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Candidate name..."
                      className="input input-primary w-full pl-10"
                      value={searchParams.candidateName}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          candidateName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-control w-full lg:w-64">
                  <label className="label font-bold text-[10px] opacity-50 uppercase tracking-widest">
                    By Job Position
                  </label>
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
                </div>

                <div className="form-control w-full lg:w-64">
                  <label className="label font-bold text-[10px] opacity-50 uppercase tracking-widest">
                    By Status
                  </label>
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
                </div>
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
            <div className="grid gap-6">
              {filteredApplicants.map((app) => (
                <div
                  key={app.applicationId}
                  className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-content/5 group"
                >
                  <div className="card-body p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-8 flex-1">
                        <div className="flex items-start gap-4">
                          <div className="avatar">
                            <div className="w-24 rounded">
                              <img src={app.candidate?.profileImage} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-black">
                                {app.candidate.fullName}
                              </h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1 text-sm opacity-60 font-medium">
                              <span className="flex items-center gap-1">
                                <IconMail size={14} /> {app.candidate?.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <IconBriefcase size={14} />{" "}
                                {app.candidate.experienceYears || 0} Yrs Exp
                              </span>
                              <span className="flex items-center gap-1">
                                <IconSchool size={14} /> Applied for:{" "}
                                <b className="text-base-content">
                                  {app.job.jobTitle}
                                </b>
                              </span>
                            </div>
                          </div>
                          {app.referredByEmployeeName && (
                            <span className="badge badge-info">
                              Referred by {app.referredByEmployeeName}
                            </span>
                          )}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {app.candidate.skills
                            ?.split(",")
                            .slice(0, 5)
                            .map((skill, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-bold uppercase tracking-tight px-2 py-1 bg-base-200 rounded text-base-content/70"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* RIGHT SIDE: SCORE & ACTIONS */}
                      <div className="bg-base-200/30 md:w-80 border-l border-base-content/5 p-8 flex flex-col justify-between">
                        <div className="flex justify-between items-start md:block space-y-4">
                          <div className="form-control w-full">
                            <p className="text-[10px] font-black opacity-40 uppercase mb-1">
                              Update Status
                            </p>
                            <select
                              className={`select select-sm select-primary w-full font-bold text-xs ${
                                app.status === "Shortlisted"
                                  ? "border-success text-success"
                                  : app.status === "Rejected"
                                  ? "border-error text-error"
                                  : ""
                              }`}
                              value={app.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  app.applicationId,
                                  e.target.value
                                )
                              }
                            >
                              <option value="Applied">Applied</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Interview Scheduled">
                                Interview Scheduled
                              </option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>

                        <Link
                          href={`/company/applicants/view?candidateId=${app.candidate.candidateId}`}
                          className="btn btn-ghost btn-block btn-sm mt-4 group-hover:bg-primary group-hover:text-primary-content transition-all"
                        >
                          Full Profile <IconChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
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
