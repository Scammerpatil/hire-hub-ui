"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { IconBriefcase2, IconUsers } from "@tabler/icons-react";
import PageTitle from "../../../components/PageTitle";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../../components/Loading";

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    if (!user?.userId) return;

    setLoading(true);

    axios
      .get(`/spring-server/api/dashboard/company/${user.userId}`)
      .then((res) => {
        setDashboard(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load company dashboard", err);
        setLoading(false);
      });
  }, [user?.userId]);

  if (loading) return <Loading />;

  if (!dashboard) {
    return <div className="p-10 text-error">Failed to load dashboard</div>;
  }

  const { stats, applicationsByMonth, jobStatus } = dashboard;

  const jobStatusData = [
    { name: "Active", value: jobStatus.active },
    { name: "Closed", value: jobStatus.closed },
  ];

  const pieColors = ["var(--color-success)", "var(--color-error)"];

  return (
    <>
      <PageTitle title={`${user.fullName} Dashboard`} />

      <div className="space-y-8 px-10 py-6">
        {/* Stats Section */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-md bg-base-200 rounded-xl w-full">
          <div className="stat">
            <div className="stat-figure text-accent">
              <IconBriefcase2 size={48} />
            </div>
            <div className="stat-title">Total Jobs Posted</div>
            <div className="stat-value text-accent">{stats.totalJobs}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-info">
              <IconBriefcase2 size={48} />
            </div>
            <div className="stat-title">Active Jobs</div>
            <div className="stat-value text-info">{stats.activeJobs}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <IconUsers size={48} />
            </div>
            <div className="stat-title">Total Applicants</div>
            <div className="stat-value text-primary">
              {stats.totalApplicants}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <IconUsers size={48} />
            </div>
            <div className="stat-title">Shortlisted Candidates</div>
            <div className="stat-value text-secondary">{stats.shortlisted}</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Applicants Over Months
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationsByMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="applicants"
                  fill="var(--color-info)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Job Status Overview
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobStatusData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {jobStatusData.map((_, index) => (
                    <Cell key={index} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
