import CardWrapper from "@/components/Card/CardWrapper";
import Spinner from "@/components/Spinner";
import { getCategoryByValue } from "@/components/Potluck/constants";
import classNames from "classnames";

const PotluckItemList = ({ potluckItems }) => {
  if (!potluckItems) return <Spinner />;

  return (
    <CardWrapper>
      <h2 className="mb-3 text-center text-2xl font-bold text-stone-900">
        Potluck Items
      </h2>
      {potluckItems.length === 0 ? (
        <p className="text-center text-base text-stone-600">
          The table is still open. Add the first dish.
        </p>
      ) : (
        <ul className="divide-y divide-orange-200">
          {potluckItems.map((item) => (
            <Item key={`potluck-entry-${item.id}`} {...item} />
          ))}
        </ul>
      )}
    </CardWrapper>
  );
};

const Item = ({ item, name, category }) => {
  const { bgColor, label, onBadge } = getCategoryByValue(category);
  const labelClass = classNames(
    "inline-block shrink-0 rounded-full px-3 py-1 text-sm font-semibold",
    bgColor,
    onBadge
  );

  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div>
        <p className="text-lg text-stone-900">{item}</p>
        <p className="text-sm text-stone-600">{name}</p>
      </div>
      <span className={labelClass}>{label}</span>
    </li>
  );
};

export default PotluckItemList;
