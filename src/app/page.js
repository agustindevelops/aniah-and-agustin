import Potluck from "@/components/Potluck";

const Page = () => {
  return (
    <Potluck
      title="Thanksgiving 2024"
      backgroundImage={"/fall-background.jpg"}
      falling="leaves"
      theme={{
        season: "fall",
        colors: { accent: "red-600", border: "red-200" },
      }}
    />
  );
};

export default Page;
