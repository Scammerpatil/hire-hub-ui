"use client";

import Loading from "../../../../components/Loading";
import PageTitle from "../../../../components/PageTitle";
import {
  IconBriefcase,
  IconBuildingSkyscraper,
  IconCalendar,
  IconCheck,
  IconCircleCheck,
  IconCurrencyRupee,
  IconHistory,
} from "@tabler/icons-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewApplicationsPage() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("applicationId");

  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState(null);

  const fetchApplicationDetails = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/spring-server/api/application/${id}`);
      setApplication(res.data);
    } catch {
      console.error("Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId) {
      fetchApplicationDetails(applicationId);
    }
  }, [applicationId]);

  if (loading || !application) return <Loading />;

  const { jobPostDTO, statusLogs } = application;

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      <PageTitle title="Application Tracking" />

      <div className="container mx-auto px-6 lg:px-20 space-y-10 mt-10">
        {/* ---------------- TOP HEADER SUMMARY ---------------- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-primary/5 p-8 rounded-3xl border border-primary/10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-primary text-primary-content rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <IconBriefcase size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                {jobPostDTO.jobTitle}
              </h1>
              <div className="flex items-center gap-2 opacity-70 font-bold italic">
                <IconBuildingSkyscraper size={18} />
                {application.companyName}
              </div>
            </div>
          </div>
          <div
            className={`badge badge-lg p-5 font-black uppercase tracking-widest border-none shadow-sm ${getStatusBadge(
              application.status,
            )}`}
          >
            {application.status.replace("_", " ")}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ---------------- JOB INFO (Left Column) ---------------- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card bg-base-200 border-none rounded-3xl overflow-hidden">
              <div className="card-body p-8">
                <h3 className="text-lg font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
                  Job Summary
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <IconBriefcase className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-black opacity-50 tracking-widest">
                        Job Type
                      </p>
                      <p className="font-bold">{jobPostDTO.jobType}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <IconHistory className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-black opacity-50 tracking-widest">
                        Experience
                      </p>
                      <p className="font-bold">
                        {jobPostDTO.requiredExperience} Years
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <IconCurrencyRupee className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-black opacity-50 tracking-widest">
                        Package Range
                      </p>
                      <p className="font-bold text-lg">
                        ₹{jobPostDTO.minPackage} – ₹{jobPostDTO.maxPackage}{" "}
                        <span className="text-sm font-medium">LPA</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <IconCalendar className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-black opacity-50 tracking-widest">
                        Applied On
                      </p>
                      <p className="font-bold">
                        {new Date(application.appliedAt).toLocaleDateString(
                          undefined,
                          { dateStyle: "long" },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- STATUS TIMELINE (Right Column) ---------------- */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 border border-base-content/10 rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3 italic">
                <IconCircleCheck className="text-success" />
                Application Journey
              </h3>

              {statusLogs.length === 0 ? (
                <div className="flex flex-col items-center py-10 opacity-30 italic">
                  <p>
                    Initial application submitted. Waiting for company review.
                  </p>
                </div>
              ) : (
                <ul className="timeline timeline-vertical timeline-compact">
                  {/* Start Point */}
                  <li>
                    <div className="timeline-middle">
                      <IconCheck size={16} className="text-success" />
                    </div>
                    <div className="timeline-end mb-10 ml-4">
                      <time className="font-mono italic text-xs opacity-50">
                        Original Submission
                      </time>
                      <div className="text-lg font-black">Applied</div>
                      <p className="text-sm opacity-60">
                        Successfully submitted application to{" "}
                        {application.companyName}
                      </p>
                    </div>
                    <hr className="bg-success" />
                  </li>

                  {statusLogs.map((log, index) => (
                    <li key={index}>
                      <hr className="bg-success" />
                      <div className="timeline-middle">
                        <IconCheck
                          size={16}
                          className={
                            index === statusLogs.length - 1
                              ? "text-primary"
                              : "text-success"
                          }
                        />
                      </div>
                      <div className="timeline-end mb-10 ml-4">
                        <time className="font-mono italic text-xs opacity-50">
                          {new Date(log.updatedAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </time>
                        <div className="text-lg font-black capitalize text-primary">
                          {log.toStatus.replace("_", " ")}
                        </div>
                        {log.remarks && (
                          <div className="bg-base-200 p-3 mt-2 rounded-xl text-sm italic border-l-4 border-primary">
                            "{log.remarks}"
                          </div>
                        )}
                      </div>
                      {index !== statusLogs.length - 1 && (
                        <hr className="bg-success" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STATUS BADGE HELPER ---------------- */

function getStatusBadge(status) {
  switch (status.toLowerCase()) {
    case "applied":
      return "bg-blue-500 text-white";
    case "shortlisted":
      return "bg-purple-500 text-white";
    case "contacted":
      return "bg-indigo-500 text-white";
    case "interview_scheduled":
      return "bg-orange-500 text-white";
    case "offered":
      return "bg-green-500 text-white";
    case "rejected":
      return "bg-red-500 text-white";
    case "withdrawn":
      return "bg-gray-500 text-white";
    default:
      return "bg-slate-400 text-white";
  }
}
