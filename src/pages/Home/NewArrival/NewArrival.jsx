import { Link } from "react-router-dom";
import SectionTitle from "../../../component/SectionTitle";
import { newArrival } from "../../../lib/constants/constants";

const NewArrival = () => {
  return (
    <div className="">
      <SectionTitle title="Featured" />
      <h1 className="my-8 text-4xl font-bold tracking-wide">New Arrival</h1>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* <!-- Left Side --> */}
        <div className="flex items-center justify-center bg-black lg:h-[36rem]">
          <div className="relative">
            <img
              src={newArrival[0].img}
              loading="lazy"
              className="lg:-mb-[64px]"
              alt={newArrival[0].title}
            />
            <div className="absolute space-y-4 text-white bottom-8 lg:-bottom-8">
              <h1 className="text-3xl font-bold tracking-wide">
                {newArrival[0].title}
              </h1>
              <p className=" w-[14rem] text-slate-100/85">
                {newArrival[0].description}
              </p>
              <Link
                to="/"
                className="block text-lg font-semibold tracking-wide link"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* <!-- Right Side --> */}
        <div className="grid grid-rows-2 gap-4">
          {/* <!-- Top Right --> */}
          <div className="flex flex-col justify-center bg-black sm:flex-row-reverse">
            <div className="">
              <img
                loading="lazy"
                src={newArrival[1].img}
                className="h-full"
                alt=""
              />
            </div>
            <div className="sm:w-[64%] max-lg:mb-2 sm:mt-[100px] ml-8 space-y-4 text-white">
              <h1 className="text-3xl font-bold">{newArrival[1].title}</h1>
              <p className=" w-[14rem] text-slate-100/85">
                {newArrival[1].description}
              </p>
              <Link
                to="/"
                className="block text-lg font-semibold tracking-wide link"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* <!-- Bottom Right (Two Divs) --> */}
          <div className="grid min-[500px]:grid-cols-2 gap-4">
            <div className="relative flex items-center justify-center bg-black/85">
              <img loading="lazy" src={newArrival[2].img} className="" alt="" />
              <div className="absolute text-white left-6 bottom-4">
                <h1 className="text-3xl font-bold">{newArrival[2].title}</h1>
                <p className=" w-[14rem] text-slate-100/85">
                  {newArrival[2].description}
                </p>
                <Link
                  to="/"
                  className="block text-lg font-semibold tracking-wide link"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center bg-black/85">
              <img loading="lazy" src={newArrival[3].img} className="" alt="" />
              <div className="absolute text-white left-6 bottom-4">
                <h1 className="text-3xl font-bold">{newArrival[3].title}</h1>
                <p className=" w-[14rem] text-slate-100/85">
                  {newArrival[3].description}
                </p>
                <Link
                  to="/"
                  className="block text-lg font-semibold tracking-wide link"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewArrival;
