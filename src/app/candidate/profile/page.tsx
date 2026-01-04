"use client";

import { useAuth } from "@/context/AuthContext";
import { Candidate } from "@/Type";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageTitle from "@/components/PageTitle";
import {
  IconUpload,
  IconUser,
  IconBriefcase,
  IconSchool,
  IconLink,
  IconDeviceFloppy,
  IconPhoto,
} from "@tabler/icons-react";
import Loading from "@/components/Loading";
import { DEGREES, SKILLS } from "@/helper/Constants";

export default function CandidateProfilePage() {
  const { user } = useAuth();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchProfile = async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `/spring-server/api/candidate/profile/${user.userId}`
      );
      setCandidate(res.data);
      setImagePreview(res.data.user?.profileImage || null);
    } catch (error) {
      toast.error("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.userId]);

  const update = (field: string, value: any) => {
    setCandidate((p) => ({ ...p!, [field]: value }));
  };

  const updateUser = (field: string, value: any) => {
    setCandidate((p) => ({
      ...p!,
      user: { ...(p?.user! || {}), [field]: value },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setImage(file);
  };

  const executeImageUpload = async () => {
    if (!image || !candidate) return;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", candidate.user?.fullName || "profile");
    formData.append("folderName", "applicant-profile-images");

    try {
      const res = await axios.post("/api/helper/upload-img", formData);
      updateUser("profileImage", res.data.path);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    update("skills", value);
    const parts = value.split(",");
    const current = parts[parts.length - 1].trim().toLowerCase();

    if (!current) {
      setSuggestions([]);
      return;
    }
    const filtered = SKILLS.filter((skill) =>
      skill.toLowerCase().includes(current)
    );
    setSuggestions(filtered);
  };

  const applySuggestion = (skill: string) => {
    const parts = candidate?.skills?.split(",") ?? [];
    parts[parts.length - 1] = " " + skill;
    update("skills", parts.join(",").trim());
    setSuggestions([]);
  };

  const saveProfile = async () => {
    if (!candidate) return;
    setLoading(true);
    try {
      await axios.put("/spring-server/api/candidate/update", candidate);
      toast.success("Profile updated successfully!");
    } catch (e) {
      toast.error("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !candidate) return <Loading />;

  return (
    <div className="min-h-screen bg-base-200/50 pb-32">
      <PageTitle title="Edit Professional Profile" />

      <div className="container mx-auto px-6 lg:px-20 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-sm border border-base-content/5 p-6 text-center">
              <h3 className="text-xs font-black uppercase tracking-widest opacity-40 mb-6">
                Display Picture
              </h3>
              <div className="relative group w-40 h-40 mx-auto mb-6">
                <img
                  src={
                    imagePreview ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                  }
                  className="w-full h-full rounded-3xl object-cover border-4 border-base-200 shadow-lg"
                  alt="Profile"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl cursor-pointer text-white">
                  <IconPhoto size={32} />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {image && (
                <button
                  className="btn btn-primary btn-sm btn-block mb-4"
                  onClick={executeImageUpload}
                >
                  <IconUpload size={18} /> Confirm Upload
                </button>
              )}

              <div className="space-y-4 text-left border-t border-base-content/5 pt-6 mt-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Email Address
                  </legend>
                  <input
                    className="input input-ghost w-full font-medium"
                    value={candidate.user?.email}
                    readOnly
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Phone Number
                  </legend>
                  <input
                    className="input input-primary w-full"
                    value={candidate.user?.phone || ""}
                    onChange={(e) => updateUser("phone", e.target.value)}
                  />
                </fieldset>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-content/5 p-6">
              <h3 className="text-xs font-black uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2">
                <IconLink size={16} /> Social Presence
              </h3>
              <div className="space-y-4">
                <input
                  className="input input-primary  w-full"
                  placeholder="LinkedIn URL"
                  value={candidate.linkedinUrl || ""}
                  onChange={(e) => update("linkedinUrl", e.target.value)}
                />
                <input
                  className="input input-primary  w-full"
                  placeholder="GitHub URL"
                  value={candidate.githubUrl || ""}
                  onChange={(e) => update("githubUrl", e.target.value)}
                />
                <input
                  className="input input-primary  w-full"
                  placeholder="Portfolio URL"
                  value={candidate.portfolioUrl || ""}
                  onChange={(e) => update("portfolioUrl", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* PERSONAL SUMMARY CARD */}
            <div className="card bg-base-100 shadow-sm border border-base-content/5 p-8">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                <IconUser className="text-primary" /> Personal Summary
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Full Name
                  </legend>
                  <input
                    className="input input-primary w-full"
                    value={candidate.user?.fullName || ""}
                    onChange={(e) => updateUser("fullName", e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Resume Headline
                  </legend>
                  <input
                    className="input input-primary w-full"
                    placeholder="e.g. Senior Java Developer"
                    value={candidate.resumeHeadline || ""}
                    onChange={(e) => update("resumeHeadline", e.target.value)}
                  />
                </fieldset>
              </div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-bold">
                  Professional Bio
                </legend>
                <textarea
                  className="textarea textarea-primary w-full h-32"
                  placeholder="Tell us about your journey..."
                  value={candidate.summary || ""}
                  onChange={(e) => update("summary", e.target.value)}
                />
              </fieldset>
            </div>

            {/* PROFESSIONAL INFO CARD */}
            <div className="card bg-base-100 shadow-sm border border-base-content/5 p-8">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                <IconBriefcase className="text-primary" /> Career Details
              </h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Current Company
                  </legend>
                  <input
                    className="input input-primary w-full"
                    value={candidate.currentCompany || ""}
                    onChange={(e) => update("currentCompany", e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Experience (Yrs)
                  </legend>
                  <input
                    type="number"
                    className="input input-primary w-full"
                    value={candidate.experienceYears || ""}
                    onChange={(e) =>
                      update("experienceYears", Number(e.target.value))
                    }
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Notice Period
                  </legend>
                  <input
                    className="input input-primary w-full"
                    value={candidate.noticePeriod || ""}
                    onChange={(e) => update("noticePeriod", e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="relative mb-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Skills (Comma Separated)
                  </legend>
                  <input
                    className="input input-primary w-full"
                    value={candidate.skills || ""}
                    onChange={handleChange}
                  />
                </fieldset>
                {suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 bg-base-100 border border-base-300 shadow-2xl rounded-xl mt-1 z-50 max-h-48 overflow-y-auto">
                    {suggestions.map((s) => (
                      <div
                        key={s}
                        className="p-3 hover:bg-primary hover:text-white cursor-pointer transition-colors text-sm font-bold"
                        onClick={() => applySuggestion(s)}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend font-bold">
                  Work Experience Details
                </legend>
                <textarea
                  className="textarea textarea-primary w-full h-32"
                  value={candidate.experience || ""}
                  onChange={(e) => update("experience", e.target.value)}
                />
              </fieldset>
            </div>

            {/* EDUCATION CARD */}
            <div className="card bg-base-100 shadow-sm border border-base-content/5 p-8">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                <IconSchool className="text-primary" /> Education
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">Degree</legend>
                  <select
                    className="select select-primary w-full"
                    value={candidate.degree || ""}
                    onChange={(e) => update("degree", e.target.value)}
                  >
                    <option value="">Select Degree</option>
                    {DEGREES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-bold">
                    Certifications
                  </legend>
                  <input
                    className="input input-primary w-full"
                    value={candidate.certifications || ""}
                    onChange={(e) => update("certifications", e.target.value)}
                  />
                </fieldset>
              </div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-bold">
                  Education History
                </legend>
                <textarea
                  className="textarea textarea-primary w-full h-24"
                  value={candidate.education || ""}
                  onChange={(e) => update("education", e.target.value)}
                />
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY SAVE BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-content/10 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-100">
        <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center">
          <p className="text-sm opacity-50 hidden md:block">
            All changes are saved locally until you hit update.
          </p>
          <button className="btn btn-primary px-12 gap-2" onClick={saveProfile}>
            <IconDeviceFloppy size={20} /> Save Profile Changes
          </button>
        </div>
      </div>
    </div>
  );
}
