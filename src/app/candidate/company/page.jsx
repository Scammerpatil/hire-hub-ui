"use client";

import Loading from "../../../components/Loading";
import PageTitle from "../../../components/PageTitle";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyPage() {
  const searchParam = useSearchParams();
  const companyId = searchParam.get("companyId");
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCompanyData = async (companyId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/spring-server/api/company/get-company/${companyId}`,
      );
      const data = await response.json();
      setCompanyData(data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchCompanyData(companyId);
    }
  }, [companyId]);

  if (loading) return <Loading />;

  if (!companyData) return <p>No company data found.</p>;

  return (
    <>
      <PageTitle title={`${companyData.user?.fullName}'s Company Details`} />

      <div className="container mx-auto p-6">
        <div className="card bg-base-100 shadow-xl border">
          <figure className="bg-base-200 p-6">
            <img
              src={companyData.user?.profileImage}
              alt={`${companyData.user?.fullName} Logo`}
              className="rounded-lg h-32 w-32 object-cover"
            />
          </figure>

          <div className="card-body space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="card-title text-primary">
                  {companyData.user?.fullName}
                </h2>
                <p className="opacity-60">{companyData.industry}</p>
              </div>

              <div
                className={`badge badge-lg ${
                  companyData.isBlocked ? "badge-error" : "badge-success"
                }`}
              >
                {companyData.isBlocked ? "Blocked" : "Active"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="font-semibold">
                Company Owner:{" "}
                <span className="font-normal opacity-70">
                  {companyData.user?.fullName}, {companyData.user?.email}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Company Size:</span>
                <span className="opacity-70">{companyData.companySize}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Address:</span>
                <span className="opacity-70">{companyData.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Website:</span>
                {companyData.website ? (
                  <a
                    href={companyData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    {companyData.website}
                  </a>
                ) : (
                  <span className="opacity-70">N/A</span>
                )}
              </div>
            </div>

            <div className="pt-4">
              <p className="font-semibold text-lg">About Company:</p>
              <p className="opacity-70 whitespace-pre-line">
                {companyData.description || "No description provided."}
              </p>
            </div>

            <div className="text-sm opacity-70 pt-2">
              <strong>Created On:</strong>{" "}
              {new Date(companyData.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
