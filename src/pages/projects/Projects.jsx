import React from "react";
import ProjectForm from "../../components/ui/form/ProjectForm";
import {
  ProjectItem,
  ProjectList,
} from "../../components/ui/project/ProjectUi";

const Projects = () => {
  return (
    <div>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold capitalize mb-6 text-gray-600">
            Quản lý dự án
          </h1>
          <ProjectForm />
        </div>
        <ProjectList>
          <ProjectItem />
        </ProjectList>
      </div>
    </div>
  );
};

export default Projects;
