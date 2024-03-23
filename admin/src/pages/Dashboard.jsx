import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Home,
  Activity,
  Users,
  Calendar,
  TrendingUp,
  Eye,
  AlertCircle,
  Loader,
} from "lucide-react";
import { backendurl } from "../App";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalViews: 0,
    pendingAppointments: 0,
    recentActivity: [],
    viewsData: {},
    loading: true,
    error: null,
  });

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Property Views Over Time",
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        },
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 4,
        hoverRadius: 6
      }
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        setStats((prev) => ({
          ...prev,
          ...response.data.stats,
          loading: false,
          error: null,
        }));
      } else {
        throw new Error(response.data.message || "Failed to fetch stats");
      }
    } catch (error) {
      setStats((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to fetch dashboard data",
      }));
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Home,
      color: "bg-blue-500",
      description: "Total properties listed",
    },
    {
      title: "Active Listings",
      value: stats.activeListings,
      icon: Activity,
      color: "bg-green-500",
      description: "Currently active listings",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: Eye,
      color: "bg-purple-500",
      description: "Property page views",
    },
    {
      title: "Pending Appointments",
      value: stats.pendingAppointments,
      icon: Calendar,
      color: "bg-orange-500",
      description: "Awaiting confirmation",
    },
  ];

  if (stats.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-gray-500 mb-4">{stats.error}</p>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <TrendingUp className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-32 px-4 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-gray-600">Overview of your property management system</p>
          </div>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors duration-200 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Last 30 days
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Views Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Property Views
            </h2>
            <div className="h-[400px]">
              {stats.viewsData && Object.keys(stats.viewsData).length > 0 ? (
                <Line data={stats.viewsData} options={chartOptions} />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">No view data available</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {stats.recentActivity?.length > 0 ? (
                stats.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg 
                      transition-colors duration-200"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No recent activity
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;