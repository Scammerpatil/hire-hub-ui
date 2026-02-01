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
} from "recharts";
import { IconUserPlus } from "@tabler/icons-react";
import { useAuth } from "../../../context/AuthContext";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;

    axios
      .get(`/spring-server/api/dashboard/employee/${user.userId}`)
      .then((res) => {
        setDashboard(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading) return <Loading />;
  if (!dashboard) return <div className="p-10 text-error">Failed</div>;

  const { stats, referralsByMonth } = dashboard;

  return (
    <>
      <PageTitle title={`${user.fullName} Dashboard`} />

      <div className="space-y-8 px-10 mt-6">
        {/* Stats */}
        <div className="stats shadow-md bg-base-200 rounded-xl w-fit">
          <div className="stat">
            <div className="stat-figure text-primary">
              <IconUserPlus size={48} />
            </div>
            <div className="stat-title">Referrals Made</div>
            <div className="stat-value text-primary">{stats.referralsMade}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6 bg-base-200 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center uppercase">
            Referrals Over Months
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={referralsByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="var(--color-primary)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
