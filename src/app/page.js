import PotluckForm from "@/components/PotluckForm";
import PotluckItemList from "@/components/PotluckItems";

import prisma from "@/prisma";
import Image from "next/image";

const Page = async () => {
  const potluckItems = await prisma.potluckItem.findMany();

  return (
    <>
      <div className="-z-10 fixed h-screen w-screen">
        <Image
          src="/christmas-background.png"
          alt="christmas-background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <main className="flex flex-col min-h-screen p-4 sm:container mx-auto gap-4 parallax">
        <h1 className="font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center my-4">
          Christmas Party Potluck 2023
        </h1>
        <div className="font-clean flex flex-col gap-4">
          <PotluckForm />
          <PotluckItemList potluckItems={potluckItems} />
        </div>
      </main>
    </>
  );
};

export default Page;
