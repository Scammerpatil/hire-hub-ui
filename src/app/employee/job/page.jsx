"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../../components/Loading";
import PageTitle from "../../../components/PageTitle";
import { useSearchParams } from "next/navigation";
import {
  IconBriefcase,
  IconClipboardText,
  IconTools,
  IconCoin,
  IconInfoCircle,
} from "@tabler/icons-react";
import Markdown from "react-markdown";

export default function ViewJob() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/spring-server/api/jobs/get-job-details/${jobId}`,
      );
      setJob(res.data);
    } catch {
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchJobDetails();
  }, [jobId]);

  if (loading) return <Loading />;
  if (!job) return null;

  return (
    <>
      <PageTitle title={job.jobTitle} />

      <div className="min-h-screen bg-base-200/50 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto card bg-base-100 shadow-xl p-8 border border-base-content/5">
            {/* HEADER */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-black">{job.jobTitle}</h1>
                <p className="text-primary font-bold text-lg mt-1">
                  {user.fullName}
                </p>
              </div>

              <span
                className={`badge badge-lg ${
                  job.status === "Active"
                    ? "badge-success"
                    : "badge-ghost opacity-50"
                }`}
              >
                {job.status}
              </span>
            </div>

            {/* META INFO */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-base-content/5 mb-8">
              <Meta label="Location" value={job.jobLocation} />
              <Meta
                label="Experience"
                value={`${job.requiredExperience} Years`}
              />
              <Meta
                label="Package"
                value={`${job.minPackage} - ${job.maxPackage} LPA`}
              />
              <Meta label="Openings" value={job.totalOpenings} />
            </div>

            {/* REQUIREMENTS */}
            <Section
              icon={<IconTools size={20} />}
              title="Candidate Requirements"
            >
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <b>Degrees:</b> {job.requiredDegrees || "N/A"}
                </li>
                <li>
                  <b>Skills:</b> {job.requiredSkills || "N/A"}
                </li>
              </ul>
            </Section>

            {/* DESCRIPTION */}
            <Section
              icon={<IconClipboardText size={20} />}
              title="Job Description"
            >
              <div className="prose prose-lg max-w-none">
                <Markdown>{job.jobDescription}</Markdown>
              </div>
            </Section>

            {/* INFO NOTE */}
            <div className="card bg-info border border-info/20 text-info-content p-4 text-xs flex gap-3 mt-8">
              <IconInfoCircle size={20} />
              <p>
                This is a read-only view of the job. Contact your admin to make
                changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* SMALL COMPONENTS */

const Meta = ({ label, value }) => (
  <div>
    <p className="text-xs opacity-50 font-bold uppercase">{label}</p>
    <p className="font-semibold">{value || "N/A"}</p>
  </div>
);

const Section = ({ icon, title, children }) => (
  <div className="mb-10">
    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    {children}
  </div>
);
