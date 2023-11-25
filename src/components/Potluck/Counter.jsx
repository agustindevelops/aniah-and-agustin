import CountUp from "react-countup";
import { CATEGORIES } from "@/components/Potluck/constants";
import classNames from "classnames";
import Spinner from "@/components/Spinner";

const Counter = ({ potluckItems }) => {
  if (!potluckItems) return <Spinner />;

  return (
    <div className="flex flex-row justify-around gap-4">
      {CATEGORIES.map(({ label, textColor, borderColor, value }) => {
        const total = potluckItems.reduce((total, { category }) => {
          return value === category ? total + 1 : total;
        }, 0);

        const numberClass = classNames(textColor);
        const cardClass = classNames(
          "bg-white rounded-2xl p-2 flex flex-col items-center justify-center border-2 w-full text-center",
          borderColor,
        );

        return (
          <div className={cardClass}>
            <span className={numberClass}>{label}</span>
            <CountUp end={total} className={numberClass} />
          </div>
        );
      })}
    </div>
  );
};

export default Counter;
