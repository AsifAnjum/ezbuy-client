import { Link } from "react-router-dom";
import exclusive from "../../../assets/product/jbl.png";
import CountDown from "./CountDown";

const Exclusive = () => {
  return (
    <section className="px-10 py-20 bg-black">
      <div className="flex flex-col ">
        <div className="flex max-lg:flex-col-reverse max-lg:gap-y-5">
          <p className="text-4xl font-semibold tracking-wider text-white md:text-6xl">
            Enhance Your Music Experience
          </p>
          <div className="relative lg:w-4/5 max-lg:mt-16">
            <div className="absolute w-full h-full scale-y-[1.80] rounded-full inset-y-28 bg-gradient-to-b from-white/45 to-transparent blur-3xl"></div>
            <img src={exclusive} loading="lazy" alt="" className="relative" />
          </div>
        </div>

        <div className="mt-24 lg:-mt-24">
          {/* countdown */}
          <CountDown />

          <Link to="/" className="mt-16 text-white w-36 btn btn-error">
            Buy Now
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Exclusive;
