"use client";
import Loading from "../../../../components/Loading";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Markdown from "react-markdown";
import { useAuth } from "../../../../context/AuthContext";
import {
  IconMapPin,
  IconBriefcase,
  IconCurrencyRupee,
  IconUsers,
  IconArrowLeft,
  IconClock,
  IconCertificate,
  IconSend,
} from "@tabler/icons-react";

export default function ViewJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParam = useSearchParams();
  const jobId = searchParam.get("jobId");

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/spring-server/api/jobs/get-job-details/${jobId}`,
      );
      setJob(response.data);
    } catch {
      toast.error("Failed to fetch job details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchJobDetails();
  }, [jobId]);

  const startApplication = async () => {
    setLoading(true);
    try {
      await axios.post(`/spring-server/api/application/apply/submit`, {
        candidateId: user?.userId,
        jobId: job?.jobId,
      });
      toast.success("Application submitted successfully!");
      router.push("/candidate/applications");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit assessment.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200/50 pb-20">
      {/* HEADER SECTION */}
      <div className="bg-base-100 border-b border-base-content/5 pt-6 pb-16">
        <div className="container mx-auto px-6">
          <Link
            href="/candidate/jobs"
            className="btn btn-ghost btn-sm gap-2 mb-6 opacity-60"
          >
            <IconArrowLeft size={18} /> Back to Listings
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex gap-6 items-center">
              <div className="w-20 h-20 rounded-2xl bg-primary text-primary-content flex items-center justify-center text-3xl font-bold shadow-lg">
                {job?.company?.user.fullName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-base-content mb-2">
                  {job?.jobTitle}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <span className="text-primary">
                    {job?.company?.user.fullName}
                  </span>
                  <span className="opacity-20">•</span>
                  <span className="flex items-center gap-1 opacity-60">
                    <IconMapPin size={16} /> {job?.jobLocation}
                  </span>
                  <span className="opacity-20">•</span>
                  <span className="badge badge-secondary badge-outline">
                    {job?.jobCategory}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="card bg-base-100 shadow-sm border border-base-content/5">
              <div className="card-body p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <IconBriefcase className="text-primary" /> Job Description
                </h3>
                <div className="prose prose-sm md:prose-base max-w-none">
                  <Markdown>{job?.jobDescription}</Markdown>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-content/5">
              <div className="card-body p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <IconCertificate className="text-primary" /> Required Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {job?.requiredSkills?.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-lg bg-primary/10 text-primary border-none py-4 px-6 font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="card bg-base-100 shadow-xl border border-primary/20">
                <div className="card-body p-6">
                  <h3 className="font-bold text-lg mb-4">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center opacity-70">
                        <IconCurrencyRupee size={20} />
                      </div>
                      <div>
                        <p className="text-xs opacity-50 uppercase tracking-wider font-bold">
                          Salary Range
                        </p>
                        <p className="font-semibold text-sm">
                          ₹{job?.minPackage} - ₹{job?.maxPackage} LPA
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center opacity-70">
                        <IconClock size={20} />
                      </div>
                      <div>
                        <p className="text-xs opacity-50 uppercase tracking-wider font-bold">
                          Experience
                        </p>
                        <p className="font-semibold text-sm">
                          {job?.requiredExperience} Years Required
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center opacity-70">
                        <IconUsers size={20} />
                      </div>
                      <div>
                        <p className="text-xs opacity-50 uppercase tracking-wider font-bold">
                          Total Openings
                        </p>
                        <p className="font-semibold text-sm">
                          {job?.totalOpenings} Positions
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="divider opacity-50"></div>
                  <button
                    className="btn btn-primary btn-block btn-lg shadow-lg group"
                    onClick={startApplication}
                  >
                    Apply for this Job{" "}
                    <IconSend className="group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
