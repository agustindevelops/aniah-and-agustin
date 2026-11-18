import Potluck from "@/components/Potluck";

const Page = () => {
  return (
    <Potluck
      title="Thanksgiving 2026"
      date="Wednesday, November 25"
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
