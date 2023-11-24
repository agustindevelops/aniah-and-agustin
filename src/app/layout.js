import {
  Inter,
  Mountains_of_Christmas,
  Fredoka,
  Pinyon_Script,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const christmasFont = Mountains_of_Christmas({
  variable: "--christmas-font",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const fredokaFont = Fredoka({
  variable: "--clean-font",
  subsets: ["latin"],
  weight: ["500"],
});
const pinyonFont = Pinyon_Script({
  variable: "--cursive-font",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Potluck 2023",
  description: "Potluck List for Christmas Party 2023 with Agustin & Aniah",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${christmasFont.variable} ${fredokaFont.variable} ${pinyonFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
