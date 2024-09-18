const AnimePage: React.FC = () => {
  return (
    <div className="w-full ">
      <h1>Nicholas's Top Anime</h1>
      <h2>comedy</h2>
      {["comedy1", "comedy2", "comedy3"].map((v, index) => (
        <div key={index}>
          <h3>{v}</h3>
          <div>xxx</div>
        </div>
      ))}
      <h2>thriller</h2>
      {["thriller1", "thriller2", "thriller3"].map((v, index) => (
        <div key={index}>
          <h3>{v}</h3>
          <div>xxx</div>
        </div>
      ))}
      <p>details in a anilist /a </p>
    </div>
  );
};

export default AnimePage;
