import Categories from "./Categories";
import SearchBar from "../SearchBar/SearchBar";
import Carousal from "./Carousal";

const Landing = () => {
  return (
    <div>
      <SearchBar />
      <div className="landingMainSection">
        <Carousal />
        <Categories />
        <div className="topResults">TopResults</div>
      </div>
    </div>
  );
};

export default Landing;
