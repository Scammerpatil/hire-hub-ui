"use client";

import Loading from "../../../components/Loading";
import PageTitle from "../../../components/PageTitle";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ReferralsPage() {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReferrals = async () => {
    if (!user?.userId) return;
    console.log("Fetching referrals for user:", user);

    setLoading(true);
    try {
      const res = await axios.get(
        `/spring-server/api/application/employee/refer/${user.userId}`,
      );
      setReferrals(res.data);
    } catch (error) {
      console.error("Failed to load referrals", error);
      toast.error("Failed to load referrals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
      <PageTitle title="My Referrals" />

      <div className="container mx-auto px-10 mt-6">
        {referrals.length === 0 ? (
          <p className="text-center text-xl font-semibold opacity-70">
            No referrals made yet
          </p>
        ) : (
          <div className="grid gap-4">
            {referrals.map((ref) => (
              <div
                key={ref.referralId}
                className="card bg-base-200 shadow-md border"
              >
                <div className="card-body">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="card-title text-primary">
                        {ref.job?.jobTitle}
                      </h2>
                      <p className="opacity-70">
                        {ref.job?.company?.user?.fullName}
                      </p>
                    </div>

                    <span className="badge badge-info">Referred</span>
                  </div>

                  <div className="divider" />

                  {/* Candidate Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p>
                      <strong>Candidate:</strong>{" "}
                      {ref.referredCandidate?.user?.fullName}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {ref.referredCandidate?.user?.email}
                    </p>
                    <p>
                      <strong>Current Role:</strong>{" "}
                      {ref.referredCandidate?.currentJobTitle || "N/A"}
                    </p>
                    <p>
                      <strong>Company:</strong>{" "}
                      {ref.referredCandidate?.currentCompany || "N/A"}
                    </p>
                  </div>

                  <div className="divider" />

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm opacity-60">
                      Referred on:{" "}
                      {new Date(ref.referralDate).toLocaleDateString()}
                    </p>

                    <div className="flex gap-2">
                      <Link
                        href={`/employee/applications/view?candidateId=${ref.referredCandidate?.candidateId}`}
                        className="btn btn-outline btn-sm"
                      >
                        View Candidate
                      </Link>

                      <Link
                        href={`/employee/job?jobId=${ref.job?.jobId}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Job
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
