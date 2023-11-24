import PotluckForm from "@/components/PotluckForm";
import PotluckItemList from "@/components/PotluckItems";

import prisma from "@/prisma";

const Page = async () => {
  const potluckItems = await prisma.potluckItem.findMany();

  return (
    <main className="flex flex-col min-h-screen p-24">
      <PotluckForm />
      <PotluckItemList potluckItems={potluckItems} />
    </main>
  );
};

export default Page;
