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
  IconChevronRight,
  IconBriefcase,
} from "@tabler/icons-react";

export default function ApplicantsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<any[]>([]);
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
        `/spring-server/api/application/employee/${user.userId}`
      );
      const res1 = await axios.get(
        `/spring-server/api/application/employee/refer/${user?.userId}`
      );
      setReferrals(res1.data);
      setApplicants(res.data);
    } catch (err) {
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  const isAlreadyReferred = (candidateId: number, jobId: number) => {
    return referrals.some(
      (ref) =>
        ref.referredCandidate?.candidateId === candidateId &&
        ref.job?.jobId === jobId
    );
  };

  useEffect(() => {
    fetchApplicants();
  }, [user]);

  const handleRefer = async (candidateId: number, jobId: number) => {
    setLoading(true);
    try {
      await axios.post(`/spring-server/api/application/employee/refer`, {
        employeeId: user?.userId,
        referredCandidateId: candidateId,
        jobId,
      });
      toast.success("Candidate referred successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to refer candidate");
    } finally {
      setLoading(false);
    }
  };

  const jobs = [...new Set(applicants.map((a) => a.job.jobTitle))];

  const filteredApplicants = applicants.filter((app) => {
    const matchName = app.candidate.user?.fullName
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
                              <img src={app.candidate.user?.profileImage} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-black">
                                {app.candidate.user?.fullName}
                              </h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1 text-sm opacity-60 font-medium">
                              <span className="flex items-center gap-1">
                                <IconMail size={14} />{" "}
                                {app.candidate.user?.email}
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
                        <Link
                          href={`/employee/applications/view?candidateId=${app.candidate.candidateId}`}
                          className="btn btn-ghost btn-block btn-sm mt-4 group-hover:bg-primary group-hover:text-primary-content transition-all"
                        >
                          Full Profile <IconChevronRight size={16} />
                        </Link>

                        {isAlreadyReferred(
                          app.candidate.candidateId!,
                          app.job.jobId!
                        ) ? (
                          <button
                            className="btn btn-success btn-sm mt-4 cursor-not-allowed"
                            disabled
                          >
                            Already Referred
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm mt-4"
                            onClick={() =>
                              handleRefer(
                                app.candidate.candidateId!,
                                app.job.jobId!
                              )
                            }
                          >
                            Refer
                          </button>
                        )}
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
