import BestSelling from "../BestSelling/BestSelling";
import Categories from "../Categories/Categories";
import Exclusive from "../Exclusive/Exclusive";
import ExploreProducts from "../ExploreProducts/ExploreProducts";
import Hero from "../Hero/Hero";
import NewArrival from "../NewArrival/NewArrival";
import Offer from "../Offer/Offer";
import Service from "../Service/Service";

const Home = () => {
  return (
    <div className="space-y-40">
      <Hero />
      <Offer />
      <Categories />
      <BestSelling />
      <Exclusive />
      <ExploreProducts />
      <NewArrival />
      <Service />
    </div>
  );
};
export default Home;
