import React from "react";

import Link from "next/link";

const activities = [
  {
    title: "Calculus Quiz",
    description: "Test your understanding of calculus concepts.",
    status: "Completed",
    link: "#",
  },
  {
    title: "Physics Lab Activity",
    description: "Hands-on experiment with motion and forces.",
    status: "In Progress",
    link: "#",
  },
  {
    title: "Linear Algebra Worksheet",
    description: "Practice problems on matrices and vectors.",
    status: "Not Started",
    link: "#",
  },
];

const ActivitiesPage = () => (
  <main className="p-8">
    <h2 className="text-2xl font-bold mb-6">Your Activities</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {activities.map((activity, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm flex flex-col"
        >
          <h3 className="text-lg font-semibold">{activity.title}</h3>
          <p className="mt-2 text-gray-600">{activity.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  activity.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : activity.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {activity.status}
              </span>
              <Link
                href={activity.link}
                className="text-primary-600 hover:underline text-sm"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
);

export default ActivitiesPage;