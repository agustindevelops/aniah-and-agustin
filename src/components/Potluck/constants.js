export const CATEGORIES = [
  {
    label: "Main Dish",
    value: "main-dish",
    textColor: "text-green-800",
    bgColor: "bg-green-800",
    borderColor: "border-green-800",
  },
  {
    label: "Appetizer",
    value: "appetizers",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-400",
    borderColor: "border-yellow-400",
  },
  {
    label: "Side",
    value: "sides",
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-600",
    borderColor: "border-yellow-600",
  },
  {
    label: "Dessert",
    value: "dessert",
    textColor: "text-red-500",
    bgColor: "bg-red-500",
    borderColor: "border-red-500",
  },
];

export const CATEGORY_INDEX = CATEGORIES.reduce((acc, { label, value }, i) => {
  acc[value] = i;
  return acc;
}, {});

export const getCategoryByValue = (value) => CATEGORIES[CATEGORY_INDEX[value]];
