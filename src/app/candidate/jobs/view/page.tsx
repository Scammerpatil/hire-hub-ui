"use client";
import Loading from "@/components/Loading";
import { Job, McqQuestion } from "@/Type";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Markdown from "react-markdown";
import { useAuth } from "@/context/AuthContext";
import {
  IconMapPin,
  IconBriefcase,
  IconCurrencyRupee,
  IconUsers,
  IconArrowLeft,
  IconClock,
  IconCertificate,
  IconSend,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParam = useSearchParams();
  const jobId = searchParam.get("jobId");

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [mcqQuestions, setMcqQuestions] = useState<McqQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [questionRecieved, setQuestionRecieved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const TEST_DURATION = 300;

  const OPTION_KEY_TO_VALUE: Record<string, string> = {
    optionA: "A",
    optionB: "B",
    optionC: "C",
    optionD: "D",
  };

  const [timeLeft, setTimeLeft] = useState<number>(TEST_DURATION);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/spring-server/api/jobs/get-job-details/${jobId}`
      );
      setJob(response.data);
    } catch {
      toast.error("Failed to fetch job details.");
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUp = async () => {
    toast.error("Time is up! Submitting your assessment.");
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedOption]) => ({
        questionId: Number(questionId),
        selectedOption,
      })
    );
    setIsSubmitting(true);
    try {
      await axios.post(`/spring-server/api/application/apply/submit`, {
        candidateId: user?.userId,
        jobId: job?.jobId,
        answers: formattedAnswers,
      });

      router.push("/candidate/applications");
    } catch {
      toast.error("Failed to submit after time expiry.");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchJobDetails();
  }, [jobId]);

  useEffect(() => {
    if (showModal) {
      if (questionRecieved) {
        setTimeLeft(TEST_DURATION);
      }

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [showModal]);

  const startApplication = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/spring-server/api/application/apply/start`,
        {
          candidateId: user?.userId,
          jobId: job?.jobId,
        }
      );
      setMcqQuestions(res.data || []);
      setQuestionRecieved(true);
      setShowModal(true);
    } catch (error: any) {
      toast.error(error?.response?.data || "Failed to start application.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: OPTION_KEY_TO_VALUE[option],
    }));
  };

  const submitAssessment = async () => {
    if (Object.keys(answers).length < mcqQuestions.length) {
      return toast.error("Please answer all questions before submitting.");
    }

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedOption]) => ({
        questionId: Number(questionId),
        selectedOption,
      })
    );

    setIsSubmitting(true);
    try {
      console.log({
        candidateId: user?.userId,
        jobId: job?.jobId,
        answers: formattedAnswers,
      });
      await axios.post(`/spring-server/api/application/apply/submit`, {
        candidateId: user?.userId,
        jobId: job?.jobId,
        answers: formattedAnswers,
      });
      toast.success("Application submitted successfully!");
      setShowModal(false);
      router.push("/candidate/applications");
    } catch (error: any) {
      toast.error("Failed to submit assessment.");
    } finally {
      setIsSubmitting(false);
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
                  {questionRecieved && (
                    <button
                      className="btn btn-secondary btn-lg mt-4"
                      onClick={() => setShowModal(true)}
                    >
                      Open Assessment Questions
                    </button>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ASSESSMENT MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="modal modal-open items-start pt-10 pb-10 overflow-y-auto bg-base-300/80 backdrop-blur-sm z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box max-w-4xl w-full bg-base-100 p-0 overflow-hidden shadow-2xl rounded-3xl"
            >
              <div className="bg-primary p-8 text-primary-content flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black">
                    Pre-Screening Assessment
                  </h2>
                  <p className="opacity-80 text-sm">
                    Answer the following {mcqQuestions.length} questions to
                    complete your application.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs uppercase opacity-70">
                      Time Remaining
                    </p>
                    <p
                      className={`font-bold text-lg ${
                        timeLeft <= 30 ? "text-error" : ""
                      }`}
                    >
                      {Math.floor(timeLeft / 60)}:
                      {(timeLeft % 60).toString().padStart(2, "0")}
                    </p>
                  </div>

                  <div
                    className="radial-progress text-primary-content"
                    style={
                      {
                        "--value":
                          (Object.keys(answers).length / mcqQuestions.length) *
                          100,
                        "--size": "3rem",
                      } as any
                    }
                  >
                    <span className="text-xs font-bold">
                      {Math.round(
                        (Object.keys(answers).length / mcqQuestions.length) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-10 max-h-[60vh] overflow-y-auto">
                {mcqQuestions.map((q, index) => (
                  <div key={q.questionId} className="space-y-4">
                    <div className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center shrink-0 font-bold text-sm">
                        {index + 1}
                      </span>
                      <h4 className="text-lg font-semibold leading-relaxed">
                        {q.questionText}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12">
                      {["optionA", "optionB", "optionC", "optionD"].map(
                        (optKey) => {
                          const optionValue = q[
                            optKey as keyof McqQuestion
                          ] as string;
                          const isSelected =
                            answers[q.questionId] ===
                            OPTION_KEY_TO_VALUE[optKey];
                          return (
                            <button
                              key={optKey}
                              onClick={() =>
                                handleOptionSelect(q.questionId, optKey)
                              }
                              className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 text-primary font-bold shadow-md"
                                  : "border-base-content/10 hover:border-primary/40"
                              }`}
                            >
                              <span>{optionValue}</span>
                              {isSelected && (
                                <IconCircleCheckFilled size={20} />
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-base-200/50 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm opacity-60">
                  {Object.keys(answers).length} of {mcqQuestions.length}{" "}
                  questions answered
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    className="btn btn-ghost flex-1 md:flex-none"
                    onClick={() => setShowModal(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary flex-1 md:px-12"
                    onClick={submitAssessment}
                    disabled={
                      isSubmitting ||
                      Object.keys(answers).length < mcqQuestions.length
                    }
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
