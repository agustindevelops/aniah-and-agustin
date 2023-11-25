"use client";

import Image from "next/image";
import PotluckForm from "@/components/Potluck/PotluckForm";
import PotluckItemList from "@/components/Potluck/PotluckItems";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";
import axios from "axios";
import Counter from "@/components/Potluck/Counter";

const Potluck = () => {
  const [potluckItems, setPotluckItems] = useState(null);

  const fetchPotluckItems = async () => {
    try {
      const { data } = await axios.get("/api/potluck");
      setPotluckItems(data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchPotluckItems();
  }, []);

  return (
    <>
      <Snowfall />
      <div className="-z-10 fixed h-screen w-screen">
        <Image
          src="/christmas-background.png"
          alt="christmas-background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <main className="flex flex-col min-h-screen p-4 sm:container mx-auto gap-4 parallax">
        <h1 className="mt-8 font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center my-4">
          Christmas Party 2023
        </h1>
        <div className="font-clean flex flex-col gap-4">
          <Counter potluckItems={potluckItems} />
          <PotluckForm onSuccess={fetchPotluckItems} />
          <PotluckItemList potluckItems={potluckItems} />
        </div>
      </main>
    </>
  );
};

export default Potluck;
