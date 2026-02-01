"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconWorld,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconCurrencyRupee,
  IconClock,
  IconFileDownload,
  IconSchool,
  IconCertificate,
  IconRocket,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Loading from "../../../../components/Loading";
import PageTitle from "../../../../components/PageTitle";

export default function ViewCandidatePage() {
  const searchParam = useSearchParams();
  const candidateId = searchParam.get("candidateId");
  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState();

  const fetchCandidateDetails = async () => {
    try {
      const response = await axios.get(
        `/spring-server/api/candidate/${candidateId}`,
      );
      setCandidate(response.data);
    } catch {
      toast.error("Failed to fetch candidate profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (candidateId) fetchCandidateDetails();
  }, [candidateId]);

  if (loading) return <Loading />;

  return (
    <>
      <PageTitle title={`${candidate?.user?.fullName}'s Profile`} />
      <div className="min-h-screen bg-base-200/50 pb-20">
        {/* SEPARATE PAGE TITLE */}

        <div className="container mx-auto px-6 lg:px-20 py-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: PRIMARY INFO & CONTACT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="card bg-base-200 shadow-sm border border-base-content/5 overflow-hidden">
                <div className="h-24 bg-primary/10 w-full"></div>
                <div className="px-6 pb-6 text-center">
                  <div className="avatar -mt-12 mb-4">
                    <div className="w-32 h-32 rounded-3xl ring ring-base-100 ring-offset-4 bg-base-300 shadow-xl overflow-hidden">
                      <img
                        src={
                          candidate?.user?.profileImage ||
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"
                        }
                        alt="Profile"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-black">
                    {candidate?.user?.fullName}
                  </h2>
                  <p className="text-primary font-bold text-sm uppercase tracking-wider mt-1">
                    {candidate?.currentJobTitle || "Professional Candidate"}
                  </p>

                  <div className="flex justify-center gap-2 mt-6">
                    {candidate?.linkedinUrl && (
                      <Link
                        href={candidate.linkedinUrl}
                        target="_blank"
                        className="btn btn-square btn-ghost hover:bg-primary/10 hover:text-primary"
                      >
                        <IconBrandLinkedin size={24} />
                      </Link>
                    )}
                    {candidate?.githubUrl && (
                      <Link
                        href={candidate.githubUrl}
                        target="_blank"
                        className="btn btn-square btn-ghost hover:bg-primary/10 hover:text-primary"
                      >
                        <IconBrandGithub size={24} />
                      </Link>
                    )}
                    {candidate?.portfolioUrl && (
                      <Link
                        href={candidate.portfolioUrl}
                        target="_blank"
                        className="btn btn-square btn-ghost hover:bg-primary/10 hover:text-primary"
                      >
                        <IconWorld size={24} />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="border-t border-base-content/5 p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center opacity-70">
                      <IconMail size={18} />
                    </div>
                    <span className="font-medium break-all">
                      {candidate?.user?.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center opacity-70">
                      <IconPhone size={18} />
                    </div>
                    <span className="font-medium">
                      {candidate?.user?.phone || "No Phone Provided"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center opacity-70">
                      <IconMapPin size={18} />
                    </div>
                    <span className="font-medium">
                      {candidate?.preferredLocations || "Remote / Pan India"}
                    </span>
                  </div>
                </div>
              </div>

              {/* QUICK STATS CARD */}
              <div className="card bg-base-200 shadow-sm border border-base-content/5 p-6">
                <h3 className="font-black text-xs uppercase tracking-widest opacity-40 mb-4">
                  Job Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 opacity-70 text-sm">
                      <IconCurrencyRupee size={16} /> Expected
                    </div>
                    <span className="font-bold text-sm">
                      ₹{candidate?.expectedSalary} LPA
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 opacity-70 text-sm">
                      <IconClock size={16} /> Notice Period
                    </div>
                    <span className="font-bold text-sm">
                      {candidate?.noticePeriod}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 opacity-70 text-sm">
                      <IconBriefcase size={16} /> Work Type
                    </div>
                    <span className="badge badge-outline badge-sm font-bold uppercase">
                      {candidate?.workType}
                    </span>
                  </div>
                </div>
              </div>

              {candidate?.resumeUrl && (
                <Link
                  href={candidate.resumeUrl}
                  target="_blank"
                  className="btn btn-primary btn-block shadow-lg shadow-primary/20"
                >
                  <IconFileDownload /> Download Resume
                </Link>
              )}
            </motion.div>

            {/* RIGHT COLUMN: DETAILED SECTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* SUMMARY */}
              <div className="card bg-base-200 shadow-sm border border-base-content/5 p-8">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-tight">
                  <IconBriefcase className="text-primary" /> About Candidate
                </h3>
                <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
                  {candidate?.summary || "No professional summary provided."}
                </p>
              </div>

              {/* SKILLS */}
              <div className="card bg-base-200 shadow-sm border border-base-content/5 p-8">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                  <IconRocket className="text-primary" /> Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(candidate?.skills || "").split(",").map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* EXPERIENCE & EDUCATION TABS/LIST */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-200 shadow-sm border border-base-content/5 p-8">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2 uppercase tracking-tight text-secondary">
                    <IconBriefcase size={20} /> Experience
                  </h3>
                  <p className="text-sm opacity-70 whitespace-pre-line leading-relaxed">
                    {candidate?.experience ||
                      "Experience details not specified."}
                  </p>
                </div>
                <div className="card bg-base-200 shadow-sm border border-base-content/5 p-8">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2 uppercase tracking-tight text-accent">
                    <IconSchool size={20} /> Education
                  </h3>
                  <p className="text-sm opacity-70 whitespace-pre-line leading-relaxed">
                    {candidate?.education || "Education details not specified."}
                  </p>
                </div>
              </div>

              {/* PROJECTS & CERTS */}
              <div className="card bg-base-200 shadow-sm border border-base-content/5 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-black mb-4 flex items-center gap-2 uppercase tracking-tight">
                      <IconRocket size={20} /> Key Projects
                    </h3>
                    <p className="text-sm opacity-70 whitespace-pre-line">
                      {candidate?.projects || "No projects listed."}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-black mb-4 flex items-center gap-2 uppercase tracking-tight">
                      <IconCertificate size={20} /> Certifications
                    </h3>
                    <p className="text-sm opacity-70 whitespace-pre-line">
                      {candidate?.certifications || "No certifications listed."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
