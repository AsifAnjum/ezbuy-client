import useTimeLeftCount from "../../../hooks/useTimeLeftCount";
import randomDate from "../../../lib/randomDateGen";

const targetDate = randomDate;

const CountDown = () => {
  const timeLeft = useTimeLeftCount(targetDate);

  return (
    <div className="flex items-center -mt-3 space-x-3">
      {/* <!-- Days Section --> */}
      <div className="flex flex-col items-center p-2">
        <span className="mb-2 text-xs font-semibold">Days</span>
        <span className="text-3xl font-bold countdown">
          <span
            style={{ "--value": timeLeft.days }}
            className="tracking-widest"
          ></span>
        </span>
      </div>

      {/* <!-- Separator --> */}
      <span className="flex mt-5 text-3xl font-semibold text-red-600">:</span>

      {/* <!-- Hours Section --> */}
      <div className="flex flex-col items-center p-2">
        <span className="mb-2 text-xs font-semibold">Hours</span>
        <span className="text-3xl font-bold countdown">
          <span
            style={{ "--value": timeLeft.hours }}
            className="tracking-widest"
          ></span>
        </span>
      </div>

      {/* <!-- Separator --> */}
      <span className="flex mt-5 text-3xl font-semibold text-red-600">:</span>

      {/* <!-- Minutes Section --> */}
      <div className="flex flex-col items-center p-2">
        <span className="mb-2 text-xs font-semibold">Minutes</span>
        <span className="text-3xl font-bold countdown">
          <span
            style={{ "--value": timeLeft.min }}
            className="tracking-widest"
          ></span>
        </span>
      </div>

      {/* <!-- Separator --> */}
      <span className="flex mt-5 text-3xl font-semibold text-red-600">:</span>
      {/* <!-- Second Section --> */}

      <div className="flex flex-col items-center p-2">
        <span className="mb-2 text-xs font-semibold">Second</span>
        <span className="text-3xl font-bold countdown">
          <span
            style={{ "--value": timeLeft.sec }}
            className="tracking-widest"
          ></span>
        </span>
      </div>
    </div>
  );
};
export default CountDown;
