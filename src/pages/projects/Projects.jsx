import React, { useEffect, useState } from "react";
import ProjectForm from "../../components/ui/form/ProjectForm";
import {
  ProjectItem,
  ProjectList,
} from "../../components/ui/project/ProjectUi";
import { db } from "../../configs/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const colRef = collection(db, "projects");

  useEffect(() => {
    onSnapshot(colRef, (res) => {
      const docs = res.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setProjects(temp);
    });
  }, []);

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
          {projects?.length > 0 &&
            projects.map((project) => (
              <ProjectItem key={project.id} data={project} />
            ))}
        </ProjectList>
      </div>
    </div>
  );
};

export default Projects;
