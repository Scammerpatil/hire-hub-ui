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
import { IconBriefcase2, IconUsers } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/Type";
import PageTitle from "@/components/PageTitle";
export default function CompanyDashboard() {
  const { user } = useAuth() as { user: User };
  const stats = {
    totalJobs: 12,
    activeJobs: 7,
    totalApplicants: 145,
    shortlisted: 24,
  };

  const applicationsData = [
    { month: "Jan", applicants: 20 },
    { month: "Feb", applicants: 35 },
    { month: "Mar", applicants: 15 },
    { month: "Apr", applicants: 28 },
    { month: "May", applicants: 47 },
  ];

  const jobStatusData = [
    { name: "Active", value: 7 },
    { name: "Closed", value: 5 },
  ];

  const pieColors = ["var(--color-success)", "var(--color-error)"];

  return (
    <>
      <PageTitle title={`${user.fullName} Dashboard`} />
      <div className="space-y-8 px-10">
        {/* Stats Section */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-md bg-base-200 rounded-xl w-full">
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
            <div className="stat-value text-info">{stats.activeJobs}</div>
            <div className="stat-desc">5% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <IconUsers size={48} />
            </div>
            <div className="stat-title">Total Applicants</div>
            <div className="stat-value text-primary">
              {stats.totalApplicants}
            </div>
            <div className="stat-desc">10% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <IconUsers size={48} />
            </div>
            <div className="stat-title">Shortlisted Candidates</div>
            <div className="stat-value text-secondary">{stats.shortlisted}</div>
            <div className="stat-desc">8% more than last month</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bar Chart: Applicants Over Time */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Applicants Over Months
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationsData}>
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

          {/* Pie Chart: Active vs Closed Jobs */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Job Status Overview
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobStatusData}
                  dataKey="value"
                  label
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {jobStatusData.map((entry, index) => (
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
