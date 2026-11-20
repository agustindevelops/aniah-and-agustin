import CardWrapper from "@/components/Card/CardWrapper";
import Spinner from "@/components/Spinner";
import { getCategoryByValue } from "@/components/Potluck/constants";
import classNames from "classnames";

const PotluckItemList = ({ potluckItems, onEdit }) => {
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
            <Item key={`potluck-entry-${item.id}`} {...item} onEdit={onEdit} />
          ))}
        </ul>
      )}
    </CardWrapper>
  );
};

const Item = ({ id, item, name, category, onEdit }) => {
  const { bgColor, label, onBadge } = getCategoryByValue(category);
  const labelClass = classNames(
    "inline-block shrink-0 rounded-full px-3 py-1 text-sm font-semibold",
    bgColor,
    onBadge
  );

  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-lg text-stone-900">{item}</p>
          <button
            type="button"
            aria-label={`Edit ${item}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone-500 transition hover:bg-orange-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-700"
            onClick={() => onEdit({ id, item, name, category })}
          >
            <EditIcon />
          </button>
        </div>
        <p className="text-sm text-stone-600">{name}</p>
      </div>
      <span className={labelClass}>{label}</span>
    </li>
  );
};

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export default PotluckItemList;
