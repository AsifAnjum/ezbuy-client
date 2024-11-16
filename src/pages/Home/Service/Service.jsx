import { TbArrowNarrowUp, TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineSafetyCertificate } from "react-icons/ai";

const Service = () => {
  return (
    <section className="relative !mb-52">
      <div className="flex flex-wrap justify-around gap-5">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-black border-[12px] rounded-full">
            <TbTruckDelivery size={40} className="text-white" />
          </div>
          <p className="mt-2 text-lg font-bold tracking-widest">
            FREE AND FAST DELIVERY
          </p>
          <p className="text-slate-900">
            Free Delivery for all orders over $140
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-black border-[12px] rounded-full">
            <RiCustomerService2Line size={40} className="text-white" />
          </div>
          <p className="mt-2 text-lg font-bold tracking-wider">
            24/7 CUSTOMER SERVICE
          </p>
          <p className="text-slate-900">Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-black border-[12px] rounded-full">
            <AiOutlineSafetyCertificate size={40} className="text-white" />
          </div>
          <p className="mt-2 text-lg font-bold tracking-wider">
            MONEY BACK GUARANTEE
          </p>
          <p className="text-slate-900">We return within 30 days</p>
        </div>
      </div>
      <p
        className="absolute right-0 cursor-pointer -bottom-40 tooltip tooltip-error"
        data-tip="Go To Top"
      >
        <TbArrowNarrowUp
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          size={40}
          className="p-1 rounded-full bg-slate-100"
        />
      </p>
    </section>
  );
};
export default Service;
