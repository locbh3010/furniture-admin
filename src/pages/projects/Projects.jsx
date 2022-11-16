import React from "react";
import ProjectForm from "../../components/ui/form/ProjectForm";

const Projects = () => {
  return (
    <div>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold capitalize mb-6 text-gray-600">
            Quản lý dự án
          </h1>
          <ProjectForm />
        </div>
      </div>
    </div>
  );
};

export default Projects;
