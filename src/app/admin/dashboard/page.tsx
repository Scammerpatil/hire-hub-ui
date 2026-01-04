"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { IconBriefcase2, IconBuilding, IconUsers } from "@tabler/icons-react";
import PageTitle from "@/components/PageTitle";

export default function AdminDashboard() {
  const stats = {
    totalCompanies: 42,
    totalApplicants: 318,
    totalJobs: 64,
    totalActiveJobs: 32,
  };

  const jobsData = [
    { name: "Jan", jobs: 12 },
    { name: "Feb", jobs: 19 },
    { name: "Mar", jobs: 8 },
    { name: "Apr", jobs: 15 },
    { name: "May", jobs: 23 },
  ];

  const pieData = [
    { name: "Active", value: 32 },
    { name: "Closed", value: 32 },
  ];

  const pieColors = ["var(--color-primary)", "var(--color-error)"];

  return (
    <>
      <PageTitle title="Admin Dashboard" />
      <div className="space-y-8 px-10 ">
        {/* Stats Section */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-md bg-base-200 rounded-xl w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <IconBuilding size={48} />
            </div>
            <div className="stat-title">Total Companies</div>
            <div className="stat-value text-primary">
              {stats.totalCompanies}
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <IconUsers size={48} />
            </div>
            <div className="stat-title">Total Applicants</div>
            <div className="stat-value text-secondary">
              {stats.totalApplicants}
            </div>
            <div className="stat-desc">8% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <IconBriefcase2 size={48} />
            </div>
            <div className="stat-title">Total Jobs Posted</div>
            <div className="stat-value text-accent">{stats.totalJobs}</div>
            <div className="stat-desc">12% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-info">
              <IconBriefcase2 size={48} />
            </div>
            <div className="stat-title">Active Jobs</div>
            <div className="stat-value text-info">{stats.totalActiveJobs}</div>
            <div className="stat-desc">5% more than last month</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Jobs Posted Over Months
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="jobs"
                  fill="var(--color-info)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Job Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
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
