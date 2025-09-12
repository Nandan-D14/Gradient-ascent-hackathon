import React from "react";
// Adjust the import path as needed based on your folder structure
import Dashboard from "../Dashboard";

const ActivitiesPage = () => {
  return (
    <div>
      <Dashboard />
      <section>
        <h2>Activities</h2>
        {/* Add your activities content here */}
        <ul>
          <li>Activity 1</li>
          <li>Activity 2</li>
          <li>Activity 3</li>
        </ul>
      </section>
    </div>
  );
};

export default ActivitiesPage;