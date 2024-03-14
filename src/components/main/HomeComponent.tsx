import NewReleases from "./NewReleases";

const HomeComponent = () => {
  return (
    <div className="bg-gradient-to-br from-[#183547] to-[#121212] my-5 mr-2 rounded-xl h-[95vh]">
      <div className="container mx-auto p-3">
        <NewReleases />
      </div>
    </div>
  );
};

export default HomeComponent;
