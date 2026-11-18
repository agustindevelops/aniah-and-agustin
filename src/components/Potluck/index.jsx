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
  title: "Thanksgiving 2026",
  date: "Wednesday, November 25",
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

const Potluck = ({
  title,
  date,
  backgroundImage,
  falling,
  theme,
} = options) => {
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
        <header className="mt-8 flex justify-center">
          <div className="max-w-3xl rounded-3xl bg-stone-950/70 px-6 py-5 text-center shadow-xl backdrop-blur-sm sm:px-10">
            <h1 className="font-clean text-4xl leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {date ? (
              <p className="font-clean mt-2 text-xl tracking-wide text-amber-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] sm:text-2xl md:text-3xl">
                {date}
              </p>
            ) : null}
          </div>
        </header>
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
