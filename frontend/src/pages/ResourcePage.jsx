import React from "react";
import ResourceList from "../components/ResourceList";

const ResourcePage = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Nearby & Available Resources
      </h1>
      <ResourceList />
    </div>
  );
};

export default ResourcePage;
