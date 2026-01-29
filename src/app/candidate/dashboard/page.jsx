"use client";

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
import {
  IconBriefcase2,
  IconListCheck,
  IconClipboardCheck,
  IconFileCertificate,
} from "@tabler/icons-react";

import { useAuth } from "../../../context/AuthContext";
import PageTitle from "../../../components/PageTitle";

export default function CandidateDashboard() {
  const { user } = useAuth();

  // Example stats (replace with API later)
  const stats = {
    jobsApplied: 14,
    activeApplications: 6,
    shortlisted: 2,
    testsPending: 3,
  };

  // Application trend data
  const applicationsData = [
    { month: "Jan", applied: 3 },
    { month: "Feb", applied: 4 },
    { month: "Mar", applied: 2 },
    { month: "Apr", applied: 1 },
    { month: "May", applied: 4 },
  ];

  // Test performance
  const testPerformance = [
    { name: "Passed", value: 2 },
    { name: "Failed", value: 1 },
  ];

  const pieColors = ["var(--color-success)", "var(--color-error)"];

  return (
    <>
      <PageTitle title={`${user.fullName} Dashboard`} />

      <div className="space-y-8 px-10 mt-6">
        {/* ======================= */}
        {/* Stats Section */}
        {/* ======================= */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-md bg-base-200 rounded-xl w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <IconBriefcase2 size={48} />
            </div>
            <div className="stat-title">Jobs Applied</div>
            <div className="stat-value text-primary">{stats.jobsApplied}</div>
            <div className="stat-desc">You're getting noticed!</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <IconListCheck size={48} />
            </div>
            <div className="stat-title">Active Applications</div>
            <div className="stat-value text-secondary">
              {stats.activeApplications}
            </div>
            <div className="stat-desc">Keep track of updates</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <IconClipboardCheck size={48} />
            </div>
            <div className="stat-title">Shortlisted</div>
            <div className="stat-value text-accent">{stats.shortlisted}</div>
            <div className="stat-desc">Great progress!</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-info">
              <IconFileCertificate size={48} />
            </div>
            <div className="stat-title">Tests Pending</div>
            <div className="stat-value text-info">{stats.testsPending}</div>
            <div className="stat-desc">Complete them on time</div>
          </div>
        </div>

        {/* ======================= */}
        {/* Charts Section */}
        {/* ======================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Applications Over Months
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="applied"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Test Performance
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={testPerformance}
                  dataKey="value"
                  label
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {testPerformance.map((entry, index) => (
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
