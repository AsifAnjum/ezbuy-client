import useTimeLeftCount from "../../../hooks/useTimeLeftCount";
import randomDate from "../../../lib/randomDateGen";

const targetDate = randomDate;

const CountDown = () => {
  const timeLeft = useTimeLeftCount(targetDate);

  return (
    <div className="flex flex-wrap gap-2 text-center md:gap-5 ">
      {["days", "hours", "min", "sec"].map((label, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full"
        >
          <span className="font-mono text-3xl font-bold countdown">
            <span style={{ "--value": timeLeft[label] }}></span>
          </span>
          <span className="font-serif text-sm font-semibold ">{label}</span>
        </div>
      ))}
    </div>
  );
};
export default CountDown;
