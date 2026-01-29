"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context/AuthContext";
import PageTitle from "../../../../components/PageTitle";
import Loading from "../../../../components/Loading";
import { DEGREES, JOB_POSITIONS, SKILLS } from "../../../../helper/Constants";
import { useSearchParams, useRouter } from "next/navigation";
import {
  IconBriefcase,
  IconClipboardText,
  IconTools,
  IconCoin,
  IconDeviceFloppy,
  IconInfoCircle,
  IconEye,
} from "@tabler/icons-react";
import Markdown from "react-markdown";

export default function EditJob() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");

  const [degreeSuggestions, setDegreeSuggestions] = useState([]);
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [formData, setFormData] = useState({
    companyId: "",
    jobTitle: "",
    jobPosition: "",
    jobLocation: "",
    jobCategory: "",
    jobDescription: "",
    requiredDegrees: "",
    requiredExperience: 0,
    requiredSkills: "",
    minPackage: 0,
    maxPackage: 0,
    totalOpenings: 0,
    status: "Inactive",
  });

  const handleFetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/spring-server/api/jobs/get-job-details/${jobId}`,
      );
      setFormData(response.data);
    } catch {
      toast.error("Failed to fetch job details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) handleFetchJobDetails();
  }, [jobId]);

  const handleSubmit = async () => {
    formData.companyId = user.userId;
    setLoading(true);
    try {
      await axios.put(
        `/spring-server/api/company/update-job/${formData.jobId}`,
        formData,
        { withCredentials: true },
      );
      toast.success("Job updated successfully");
      router.push("/company/manage-jobs");
    } catch (err) {
      toast.error("Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  const handleDegreeChange = (value) => {
    setFormData({ ...formData, requiredDegrees: value });
    const last = value.split(",").pop()?.trim().toLowerCase() || "";
    if (!last) return setDegreeSuggestions([]);
    const filtered = DEGREES.filter((d) => d.toLowerCase().includes(last));
    setDegreeSuggestions(filtered);
  };

  const handleSkillChange = (value) => {
    setFormData({ ...formData, requiredSkills: value });
    const last = value.split(",").pop()?.trim().toLowerCase() || "";
    if (!last) return setSkillSuggestions([]);
    const filtered = SKILLS.filter((s) => s.toLowerCase().includes(last));
    setSkillSuggestions(filtered);
  };

  const applyDegree = (degree) => {
    const parts = formData.requiredDegrees.split(",");
    parts[parts.length - 1] = " " + degree;
    setFormData({
      ...formData,
      requiredDegrees: parts.join(", ").replace(/^,/, "").trim(),
    });
    setDegreeSuggestions([]);
  };

  const applySkill = (skill) => {
    const parts = formData.requiredSkills.split(",");
    parts[parts.length - 1] = " " + skill;
    setFormData({
      ...formData,
      requiredSkills: parts.join(", ").replace(/^,/, "").trim(),
    });
    setSkillSuggestions([]);
  };

  if (loading) return <Loading />;

  return (
    <>
      <PageTitle title={`Edit: ${formData.jobTitle}`} />
      <div className="min-h-screen bg-base-200/50 pb-20">
        {/* HEADER SECTION */}
        <div className="bg-base-100 border-b border-base-content/5 py-8 mb-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="opacity-60 text-sm italic">
                  Last modified: {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 bg-base-200 p-1 rounded-xl">
                <button
                  onClick={() => setIsPreview(false)}
                  className={`btn btn-sm border-none ${
                    !isPreview
                      ? "btn-primary shadow-md"
                      : "btn-ghost opacity-50"
                  }`}
                >
                  Edit Details
                </button>
                <button
                  onClick={() => setIsPreview(true)}
                  className={`btn btn-sm border-none ${
                    isPreview ? "btn-primary shadow-md" : "btn-ghost opacity-50"
                  }`}
                >
                  <IconEye size={16} /> Preview
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          {!isPreview ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* SECTION 1: ROLE INFO */}
                <div className="card bg-base-100 shadow-sm border border-base-content/5">
                  <div className="card-body p-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <IconBriefcase className="text-primary" size={20} /> Role
                      Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control md:col-span-2">
                        <label className="label font-bold text-xs opacity-60">
                          JOB TITLE *
                        </label>
                        <input
                          type="text"
                          className="input input-primary w-full focus:input-primary"
                          value={formData.jobTitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              jobTitle: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-control">
                        <label className="label font-bold text-xs opacity-60">
                          POSITION *
                        </label>
                        <select
                          className="select select-primary w-full"
                          value={formData.jobPosition}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              jobPosition: e.target.value,
                            })
                          }
                        >
                          {JOB_POSITIONS.map((job) => (
                            <option value={job} key={job}>
                              {job}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label font-bold text-xs opacity-60">
                          LOCATION TYPE *
                        </label>
                        <select
                          className="select select-primary w-full"
                          value={formData.jobLocation}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              jobLocation: e.target.value,
                            })
                          }
                        >
                          <option value="Remote">Remote</option>
                          <option value="On-site">On-site</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: REQUIREMENTS */}
                <div className="card bg-base-100 shadow-sm border border-base-content/5">
                  <div className="card-body p-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <IconTools className="text-primary" size={20} /> Candidate
                      Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control relative">
                        <label className="label font-bold text-xs opacity-60">
                          REQUIRED DEGREES
                        </label>
                        <input
                          type="text"
                          className="input input-primary w-full focus:input-primary"
                          value={formData.requiredDegrees}
                          onChange={(e) => handleDegreeChange(e.target.value)}
                        />
                        {degreeSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 w-full bg-base-100 border border-base-content/10 rounded-xl mt-1 z-30 shadow-2xl max-h-48 overflow-y-auto p-1">
                            {degreeSuggestions.map((d) => (
                              <div
                                key={d}
                                onClick={() => applyDegree(d)}
                                className="px-4 py-2 hover:bg-primary hover:text-primary-content cursor-pointer rounded-lg text-sm transition-colors"
                              >
                                {d}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label font-bold text-xs opacity-60">
                          EXP. REQUIRED (YEARS)
                        </label>
                        <input
                          type="number"
                          className="input input-primary w-full focus:input-primary"
                          value={formData.requiredExperience}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              requiredExperience: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="form-control md:col-span-2 relative">
                        <label className="label font-bold text-xs opacity-60">
                          SKILLS (COMMA SEPARATED)
                        </label>
                        <input
                          type="text"
                          className="input input-primary w-full focus:input-primary"
                          value={formData.requiredSkills}
                          onChange={(e) => handleSkillChange(e.target.value)}
                        />
                        {skillSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 w-full bg-base-100 border border-base-content/10 rounded-xl mt-1 z-30 shadow-2xl max-h-48 overflow-y-auto p-1">
                            {skillSuggestions.map((s) => (
                              <div
                                key={s}
                                onClick={() => applySkill(s)}
                                className="px-4 py-2 hover:bg-primary hover:text-primary-content cursor-pointer rounded-lg text-sm transition-colors"
                              >
                                {s}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: DESCRIPTION */}
                <div className="card bg-base-100 shadow-sm border border-base-content/5">
                  <div className="card-body p-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <IconClipboardText className="text-primary" size={20} />{" "}
                      Job Description
                    </h3>
                    <textarea
                      className="textarea textarea-primary w-full focus:textarea-primary min-h-[300px] text-base leading-relaxed"
                      value={formData.jobDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jobDescription: e.target.value,
                        })
                      }
                    />
                    <div className="flex items-center gap-2 mt-2 opacity-50 text-xs">
                      <IconInfoCircle size={14} /> Markdown supported: **bold**,
                      *italic*, # headings
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDEBAR: SCALE, STATUS & SAVE */}
              <div className="space-y-6">
                <div className="card bg-base-100 shadow-sm border border-base-content/5">
                  <div className="card-body p-6">
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                      <IconCoin size={18} /> Scale & Pay
                    </h3>
                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label py-1 font-bold text-[10px] opacity-60">
                          JOB CATEGORY
                        </label>
                        <select
                          className="select select-sm select-primary w-full"
                          value={formData.jobCategory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              jobCategory: e.target.value,
                            })
                          }
                        >
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Internship">Internship</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="form-control">
                          <label className="label py-1 font-bold text-[10px] opacity-60">
                            MIN LPA
                          </label>
                          <input
                            type="number"
                            className="input input-sm input-primary w-full"
                            value={formData.minPackage}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                minPackage: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="form-control">
                          <label className="label py-1 font-bold text-[10px] opacity-60">
                            MAX LPA
                          </label>
                          <input
                            type="number"
                            className="input input-sm input-primary w-full"
                            value={formData.maxPackage}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                maxPackage: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-control">
                        <label className="label py-1 font-bold text-[10px] opacity-60">
                          TOTAL OPENINGS
                        </label>
                        <input
                          type="number"
                          className="input input-sm input-primary w-full"
                          value={formData.totalOpenings}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              totalOpenings: Number(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="divider opacity-50"></div>

                      <div className="form-control">
                        <label className="label py-1 font-bold text-[10px] opacity-60">
                          VISIBILITY STATUS
                        </label>
                        <select
                          className={`select select-sm select-primary w-full font-bold ${
                            formData.status === "Active"
                              ? "text-success"
                              : "text-error"
                          }`}
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        >
                          <option value="Active">Active (Public)</option>
                          <option value="Inactive">Inactive (Hidden)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary btn-block shadow-lg shadow-primary/30 gap-2 mt-6"
                      onClick={handleSubmit}
                    >
                      <IconDeviceFloppy size={18} /> Save Changes
                    </button>
                  </div>
                </div>

                <div className="card bg-info border border-info/20 text-info-content p-4 text-xs flex flex-row gap-3">
                  <IconInfoCircle size={20} className="shrink-0" />
                  <p>
                    Updating these details will immediately change the
                    information for all existing applicants and prospective
                    candidates.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* PREVIEW MODE */
            <div className="max-w-4xl mx-auto card bg-base-100 shadow-2xl p-8 animate-in fade-in zoom-in duration-300 border border-base-content/5">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-4xl font-black">
                    {formData.jobTitle || "Untitled Job"}
                  </h1>
                  <p className="text-primary font-bold text-lg mt-1">
                    {user.fullName}
                  </p>
                </div>
                <div
                  className={`badge badge-lg ${
                    formData.status === "Active"
                      ? "badge-success"
                      : "badge-ghost opacity-50"
                  }`}
                >
                  {formData.status}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-base-content/5 mb-8">
                <div>
                  <p className="text-xs opacity-50 font-bold uppercase">
                    Location
                  </p>
                  <p className="font-semibold">
                    {formData.jobLocation || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-50 font-bold uppercase">
                    Experience
                  </p>
                  <p className="font-semibold">
                    {formData.requiredExperience} Years
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-50 font-bold uppercase">
                    Package
                  </p>
                  <p className="font-semibold">
                    {formData.minPackage}-{formData.maxPackage} LPA
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-50 font-bold uppercase">
                    Openings
                  </p>
                  <p className="font-semibold">{formData.totalOpenings}</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <Markdown>
                  {formData.jobDescription || "No description provided..."}
                </Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
