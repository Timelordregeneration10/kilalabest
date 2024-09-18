const ApplicationPage:React.FC=()=> {

    return (
        <div className="w-full ">
          <h1>{"Nicholas's Application"}</h1>
          {["application1", "application2", "application3"].map((v, index) => (
            <div key={index}>
              <h2>{v}</h2>
              <div>xxx</div>
            </div>
          ))}
        </div>
    )
}

export default ApplicationPage;