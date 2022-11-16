import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../configs/firebase.config";
import ProjectForm from "../../components/ui/form/ProjectForm";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    const projectRef = doc(collection(db, "projects"), id);

    onSnapshot(projectRef, (res) => setProject({ id: res.id, ...res.data() }));
  }, [id]);

  return (
    <div className="py-10">
      <div className="container">
        <div className="grid grid-cols-2 gap-6">
          <div className="aspect-video rounded-lg overflow-hidden">
            {project && (
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <ProjectForm type="update" />
        </div>
      </div>
    </div>
  );
};

export default Project;
