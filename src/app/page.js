import PotluckForm from "@/components/PotluckForm";
import PotluckItemList from "@/components/PotluckItems";

import prisma from "@/prisma";

const Page = async () => {
  const potluckItems = await prisma.potluckItem.findMany();

  return (
    <main className="flex flex-col min-h-screen p-4 sm:container mx-auto gap-4">
      <h1 className="font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-red-600 text-center my-4">
        Christmas Party Potluck 2023
      </h1>
      <div className="font-clean flex flex-col gap-4">
        <PotluckForm />
        <PotluckItemList potluckItems={potluckItems} />
      </div>
    </main>
  );
};

export default Page;
