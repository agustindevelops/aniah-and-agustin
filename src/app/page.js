import prisma from "@/prisma";
import Potluck from "@/components/Potluck";

const Page = async () => {
  const potluckItems = await prisma.potluckItem.findMany();

  return <Potluck potluckItems={potluckItems} />;
};

export default Page;
