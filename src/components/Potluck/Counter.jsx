import CountUp from "react-countup";
import { CATEGORIES } from "@/components/Potluck/constants";
import classNames from "classnames";
import Spinner from "@/components/Spinner";

const Counter = ({ potluckItems }) => {
  if (!potluckItems) return <Spinner />;

  return (
    <div className="flex flex-row justify-around gap-2 sm:gap-3">
      {CATEGORIES.map(({ label, textColor, borderColor, value }) => {
        const total = potluckItems.reduce((total, { category }) => {
          return value === category ? total + 1 : total;
        }, 0);

        const numberClass = classNames(textColor);
        const cardClass = classNames(
          "flex w-full flex-col items-center justify-center rounded-2xl border-2 bg-white/95 px-2 py-2 text-center shadow-lg sm:py-3",
          borderColor
        );

        return (
          <div key={value} className={cardClass}>
            <span
              className={classNames(
                numberClass,
                "text-xs leading-tight sm:text-sm"
              )}
            >
              {label}
            </span>
            <CountUp
              end={total}
              className={classNames(
                numberClass,
                "text-2xl leading-none sm:text-3xl"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Counter;
