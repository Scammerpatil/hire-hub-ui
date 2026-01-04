"use client";

import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import {
  IconBuildingCommunity,
  IconCalendarEvent,
  IconChevronRight,
  IconTrash,
  IconEye,
  IconBriefcase,
} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    if (!user?.userId) return;
    try {
      const res = await axios.get(
        `/spring-server/api/application/candidate/${user.userId}`
      );
      setApplications(res.data);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (applicationId: number) => {
    if (
      !confirm(
        "Are you sure you want to withdraw this application? This action cannot be undone."
      )
    )
      return;

    try {
      await axios.put(
        `/spring-server/api/application/withdraw/${applicationId}`
      );
      toast.success("Application withdrawn");
      fetchApplications();
    } catch {
      toast.error("Failed to withdraw application");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user?.userId]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200/50 pb-20">
      <PageTitle title="My Applications" />

      <div className="container mx-auto px-6 lg:px-20 mt-8">
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-content/20">
            <IconBriefcase size={64} className="opacity-20 mb-4" />
            <p className="text-xl font-bold opacity-60">
              You haven’t applied to any jobs yet
            </p>
            <Link
              href="/candidate/jobs"
              className="btn btn-primary btn-sm mt-4"
            >
              Browse Open Roles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {applications.map((app) => (
              <div
                key={app.applicationId}
                className="group card bg-base-100 shadow-sm border border-base-content/5 hover:border-primary/30 transition-all duration-300"
              >
                <div className="card-body p-6 flex-col md:flex-row justify-between items-center gap-6">
                  {/* JOB INFO */}
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                      <IconBuildingCommunity size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">
                        {app.job.jobTitle}
                      </h3>
                      <p className="text-sm font-bold opacity-60 flex items-center gap-1">
                        {app.job.companyName}
                      </p>
                    </div>
                  </div>

                  {/* METADATA */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-10 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-black opacity-40 tracking-widest">
                        Applied On
                      </span>
                      <div className="flex items-center gap-1.5 font-bold text-sm">
                        <IconCalendarEvent size={14} className="opacity-50" />
                        {new Date(app.createdAt).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-center min-w-[120px]">
                      <span className="text-[10px] uppercase font-black opacity-40 tracking-widest mb-1">
                        Status
                      </span>
                      <span
                        className={`badge badge-md py-3 px-4 font-bold border-none ${getStatusStyles(
                          app.status
                        )}`}
                      >
                        {app.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/candidate/applications/view?applicationId=${app.applicationId}`}
                        className="btn btn-ghost btn-sm btn-circle tooltip"
                        data-tip="View Details"
                      >
                        <IconEye size={20} />
                      </Link>

                      {app.status === "applied" && (
                        <button
                          className="btn btn-ghost btn-sm btn-circle text-error tooltip"
                          data-tip="Withdraw Application"
                          onClick={() => withdrawApplication(app.applicationId)}
                        >
                          <IconTrash size={20} />
                        </button>
                      )}

                      <div className="hidden md:block opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <IconChevronRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STATUS STYLES UTILS ---------------- */

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "applied":
      return "bg-blue-100 text-blue-700";
    case "shortlisted":
      return "bg-purple-100 text-purple-700";
    case "contacted":
      return "bg-indigo-100 text-indigo-700";
    case "interview_scheduled":
      return "bg-amber-100 text-amber-700";
    case "offered":
      return "bg-emerald-100 text-emerald-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    case "withdrawn":
      return "bg-slate-200 text-slate-600";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
