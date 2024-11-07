import CardWrapper from "@/components/Card/CardWrapper";
import Spinner from "@/components/Spinner";
import { getCategoryByValue } from "@/components/Potluck/constants";
import classNames from "classnames";

const PotluckItemList = ({ potluckItems }) => {
  if (!potluckItems) return <Spinner />;

  return (
    <CardWrapper>
      <h2 className="text-2xl font-bold text-center mb-6">Potluck Items</h2>
      <ul className="divide-y divide-gray-200">
        {potluckItems.map((item, index) => (
          <Item key={`potluck-entry-${name}-${index}`} {...item} />
        ))}
      </ul>
    </CardWrapper>
  );
};

const Item = ({ item, name, category }) => {
  const { bgColor, label } = getCategoryByValue(category);
  const labelClass = classNames(
    "inline-block px-3 py-1 text-sm font-semibold rounded-full",
    bgColor,
  );

  return (
    <li className="py-4 flex justify-between items-center">
      <div>
        <p className="text-lg text-gray-900">{item}</p>
        <p className="text-sm text-gray-600">{name}</p>
      </div>
      <span className={labelClass}>{label}</span>
    </li>
  );
};

export default PotluckItemList;
