const MusicPage: React.FC = () => {
  return (
    <div className="w-full ">
      <h1>{"Nicholas's Music"}</h1>
      <h2>天堂之风</h2>
      {["music1", "music2", "music3"].map((v, index) => (
        <div key={index}>
          <h2>{v}</h2>
          <div>xxx</div>
        </div>
      ))}
      <h2>衔尾游行</h2>
      {["music1", "music2", "music3"].map((v, index) => (
        <div key={index}>
          <h2>{v}</h2>
          <div>xxx</div>
        </div>
      ))}
    </div>
  );
};

export default MusicPage;
