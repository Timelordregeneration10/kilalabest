const AttemptPage: React.FC = () => {
  return (
    <div className="w-full ">
      <h1>{"Nicholas's Attempt"}</h1>
      {["attempt1", "attempt2", "attempt3"].map((v, index) => (
        <div key={index}>
          <h2>{v}</h2>
          <div>xxx</div>
        </div>
      ))}
    </div>
  );
};

export default AttemptPage;
