const ProjectPage: React.FC = () => {
  return (
    <div className="w-full ">
      <h1>{"Nicholas's Project"}</h1>
      {["project1", "project2", "project3"].map((v, index) => (
        <div key={index}>
          <h2>{v}</h2>
          <div>xxx</div>
        </div>
      ))}
    </div>
  );
};

export default ProjectPage;
