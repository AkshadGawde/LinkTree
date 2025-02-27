import { useEffect, useState } from "react";
import axios from "axios";

const ReferralStats = () => {
  const [stats, setStats] = useState({
    totalReferrals: 0,
    successfulReferrals: 0,
    pendingReferrals: 0,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferralStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Session expired. Please log in again.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/referrals/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);
      } catch (err) {
        setError("Failed to fetch referral stats.");
      }
    };

    fetchReferralStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Referral Stats</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-2">
        <p>Total Referrals: {stats.totalReferrals}</p>
        <p>Successful Referrals: {stats.successfulReferrals}</p>
        <p>Pending Referrals: {stats.pendingReferrals}</p>
      </div>
    </div>
  );
};

export default ReferralStats;
