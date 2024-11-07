"use client";

import Image from "next/image";
import PotluckForm from "@/components/Potluck/PotluckForm";
import PotluckItemList from "@/components/Potluck/PotluckItems";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";
import axios from "axios";
import Counter from "@/components/Potluck/Counter";
import FallingLeaves from "@/components/FallingLeaves";
import { defaultTheme, ThemeProvider } from "@/components/context/Theme";

const options = {
  title: "Thanksgiving 2024",
  backgroundImage: "/christmas-background.png",
  falling: "snow",
  theme: defaultTheme,
};

const Snow = () => (
  <Snowfall
    style={{
      position: "fixed",
      width: "100vw",
      height: "100vh",
    }}
  />
);

const Falling = {
  snow: Snow,
  leaves: FallingLeaves,
};

const Potluck = ({ title, backgroundImage, falling, theme } = options) => {
  const [potluckItems, setPotluckItems] = useState(null);
  const FallingComponent = Falling[falling];

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
    <ThemeProvider theme={theme}>
      <FallingComponent />
      <div className="-z-10 fixed h-screen w-screen">
        <Image
          src={backgroundImage}
          alt={backgroundImage}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <main className="flex flex-col min-h-screen p-4 sm:container mx-auto gap-4 parallax">
        <h1 className="mt-8 font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center my-4">
          {title}
        </h1>
        <div className="font-clean flex flex-col gap-4">
          <Counter potluckItems={potluckItems} />
          <PotluckForm onSuccess={fetchPotluckItems} />
          <PotluckItemList potluckItems={potluckItems} />
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Potluck;
