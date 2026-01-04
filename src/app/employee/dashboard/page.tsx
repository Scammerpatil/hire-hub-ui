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
  IconUserPlus,
  IconListCheck,
  IconClipboardCheck,
} from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/Type";
import PageTitle from "@/components/PageTitle";

export default function EmployeeDashboard() {
  const { user } = useAuth() as { user: User };

  const stats = {
    jobsApplied: 9,
    referralsMade: 4,
    shortlisted: 3,
    testsTaken: 6,
  };

  // Applications Over Months (Dummy Data)
  const applicationsData = [
    { month: "Jan", applications: 2 },
    { month: "Feb", applications: 3 },
    { month: "Mar", applications: 1 },
    { month: "Apr", applications: 2 },
    { month: "May", applications: 4 },
  ];

  // Referral performance
  const referralData = [
    { name: "Accepted", value: 2 },
    { name: "Rejected", value: 2 },
  ];

  const pieColors = ["var(--color-success)", "var(--color-error)"];

  return (
    <>
      <PageTitle title={`${user.fullName} Dashboard`} />

      <div className="space-y-8 px-10">
        {/* ====================== */}
        {/* Stats Section */}
        {/* ====================== */}
        <div className="stats stats-vertical lg:stats-horizontal shadow-md bg-base-200 rounded-xl w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <IconBriefcase2 size={48} />
            </div>
            <div className="stat-title">Jobs Applied</div>
            <div className="stat-value text-primary">{stats.jobsApplied}</div>
            <div className="stat-desc">Steady progress this month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <IconUserPlus size={48} />
            </div>
            <div className="stat-title">Referrals Made</div>
            <div className="stat-value text-secondary">
              {stats.referralsMade}
            </div>
            <div className="stat-desc">Great support to your team!</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <IconListCheck size={48} />
            </div>
            <div className="stat-title">Shortlisted Applications</div>
            <div className="stat-value text-accent">{stats.shortlisted}</div>
            <div className="stat-desc">Better than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-info">
              <IconClipboardCheck size={48} />
            </div>
            <div className="stat-title">Tests Taken</div>
            <div className="stat-value text-info">{stats.testsTaken}</div>
            <div className="stat-desc">Keep it up!</div>
          </div>
        </div>

        {/* ====================== */}
        {/* Charts Section */}
        {/* ====================== */}
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
                  dataKey="applications"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center uppercase">
              Referral Success Ratio
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={referralData}
                  dataKey="value"
                  label
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {referralData.map((entry, index) => (
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
