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
    <div className="bg-red-800 bg-opacity-10 shadow-lg rounded-lg overflow-hidden border border-orange-950">
      <div className="bg-gradient-to-t from-orange-100 to-orange-500 bg-opacity-10 p-4">
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
