import { FaGreaterThan } from "react-icons/fa6";
import { slide, tags } from "../../../lib/constants/constants.jsx";

import Slider from "react-slick";
import { Link } from "react-router-dom";

const Hero = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    dots: true,
    dotsClass: "custom-dots",
    autoplaySpeed: 2000,

    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "#000",

          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        onClick={() => i + 1}
        className={`relative w-3 h-3 border-2 border-gray-400 rounded-full cursor-pointer`}
      ></button>
    ),
  };

  const tagsContent = tags.map((tag) => (
    <li key={tag.id} className="">
      <Link
        to={tag.url}
        className="flex items-center font-semibold transition-colors duration-1000 tracking-wides hover:text-gray-500"
      >
        {tag.title}
        <FaGreaterThan className="inline ml-auto" />
      </Link>
    </li>
  ));

  return (
    <section className="">
      <div className="flex">
        <div className="hidden w-1/4 mt-6 xl:block">
          <ul className="space-y-3">{tagsContent}</ul>
        </div>
        {/* vertical line  */}
        <div className="mx-12 border-l-[1px] border-zinc-500 h-18  xl:block hidden"></div>
        {/* carousel */}
        <div className="w-full mt-6 bg-black xl:w-3/4">
          <div className="">
            <div className="slider-container">
              <Slider {...settings}>
                {slide.map((item) => (
                  <div key={item.id}>
                    <div className="text-white hero">
                      <div className="flex-col hero-content lg:flex-row-reverse">
                        <img src={item.img} className="w-full" />
                        <div>
                          <p>{item.title}</p>
                          <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
