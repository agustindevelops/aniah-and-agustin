import { useTheme } from "@/components/context/Theme";

const CardWrapper = ({ children }) => {
  const {
    season,
    colors: { accent, border },
  } = useTheme();

  if (season === "christmas") return <Christmas>{children}</Christmas>;
  if (season === "fall") return <Fall>{children}</Fall>;

  return (
    <div
      className={`bg-${accent} bg-opacity-10 shadow-lg rounded-lg overflow-hidden border border-${border}`}
    >
      <div
        className={`bg-gradient-to-t from-${accent} to-blue-300 bg-opacity-10 p-4`}
      >
        {children}
      </div>
    </div>
  );
};

const Christmas = ({ children }) => {
  return (
    <div className="bg-blue-100 bg-opacity-10 shadow-lg rounded-lg overflow-hidden border border-blue-200">
      <div className="bg-gradient-to-t from-blue-100 to-blue-300 bg-opacity-10 p-4">
        {children}
      </div>
    </div>
  );
};

const Fall = ({ children }) => {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-orange-200 bg-orange-50/95 shadow-2xl shadow-orange-950/20">
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
};

export default CardWrapper;
