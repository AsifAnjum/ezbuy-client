import { useRef } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import SectionTitle from "../../../component/SectionTitle";
import { categories } from "../../../lib/constants/constants";

const Categories = () => {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          className: "center",
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const categoriesContent = categories.map((item) => (
    <Link
      to={item.url}
      key={item.id}
      className="border-2 group py-2 max-[360px]:!w-36 !w-44  hover:bg-red-500/85 hover:border-red-500/85 rounded duration-700 cursor-pointer hover:text-white "
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-2 group-hover:animate-shake">{item.img}</div>

        <p className="font-semibold">{item.title}</p>
      </div>
    </Link>
  ));
  return (
    <section className="">
      <SectionTitle title="Categories" />
      <div className="flex min-[450px]:items-center max-[450px]:flex-col min-[450px]:justify-between my-8">
        <h1 className="section-subtitle">Browse By Category</h1>

        <div className="space-x-1 max-[450px]:ml-auto max-[450px]:mt-8 mt-5">
          <span
            onClick={previous}
            className="p-[8px] bg-gray-200 rounded-[20px] cursor-pointer"
          >
            <GoArrowLeft size={23} className="inline mb-1" />
          </span>
          <span
            onClick={next}
            className="p-[8px] bg-gray-200 rounded-[20px] cursor-pointer"
          >
            <GoArrowRight size={23} className="inline mb-1" />
          </span>
        </div>
      </div>

      <div className="slider-container">
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {categoriesContent}
        </Slider>
      </div>
    </section>
  );
};
export default Categories;
