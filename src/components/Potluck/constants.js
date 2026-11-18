export const CATEGORIES = [
  {
    label: "Main Dish",
    value: "main-dish",
    textColor: "text-green-800",
    bgColor: "bg-green-800",
    borderColor: "border-green-800",
    onBadge: "text-white",
    choiceClass:
      "border-green-700 bg-green-50 text-green-900 hover:bg-green-100 peer-checked:border-green-800 peer-checked:bg-green-800 peer-checked:text-white",
  },
  {
    label: "Appetizer",
    value: "appetizers",
    textColor: "text-amber-700",
    bgColor: "bg-amber-300",
    borderColor: "border-amber-400",
    onBadge: "text-stone-900",
    choiceClass:
      "border-amber-400 bg-amber-50 text-amber-900 hover:bg-amber-100 peer-checked:border-amber-500 peer-checked:bg-amber-300 peer-checked:text-stone-900",
  },
  {
    label: "Side",
    value: "sides",
    textColor: "text-amber-800",
    bgColor: "bg-amber-500",
    borderColor: "border-amber-600",
    onBadge: "text-stone-900",
    choiceClass:
      "border-amber-600 bg-orange-50 text-amber-950 hover:bg-orange-100 peer-checked:border-amber-700 peer-checked:bg-amber-500 peer-checked:text-stone-900",
  },
  {
    label: "Dessert",
    value: "dessert",
    textColor: "text-red-600",
    bgColor: "bg-red-500",
    borderColor: "border-red-500",
    onBadge: "text-white",
    choiceClass:
      "border-red-400 bg-red-50 text-red-800 hover:bg-red-100 peer-checked:border-red-600 peer-checked:bg-red-500 peer-checked:text-white",
  },
  {
    label: "Drink",
    value: "drink",
    textColor: "text-red-900",
    bgColor: "bg-red-900",
    borderColor: "border-red-900",
    onBadge: "text-white",
    choiceClass:
      "border-red-900 bg-rose-50 text-red-950 hover:bg-rose-100 peer-checked:border-red-950 peer-checked:bg-red-900 peer-checked:text-white",
  },
];

export const CATEGORY_INDEX = CATEGORIES.reduce((acc, { label, value }, i) => {
  acc[value] = i;
  return acc;
}, {});

export const getCategoryByValue = (value) => CATEGORIES[CATEGORY_INDEX[value]];
