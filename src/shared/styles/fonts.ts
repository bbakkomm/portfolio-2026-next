import localFont from "next/font/local";

export const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  weight: "200 900",
  display: "swap",
  preload: true,
  variable: "--font-pretendard-var",
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});

export const montserrat = localFont({
  src: [
    { path: "../../../public/fonts/Montserrat-Regular.woff2", weight: "400" },
    { path: "../../../public/fonts/Montserrat-Bold.woff2", weight: "700" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-montserrat-var",
});

export const poppins = localFont({
  src: [
    { path: "../../../public/fonts/Poppins-Regular.woff2", weight: "400" },
    { path: "../../../public/fonts/Poppins-Bold.woff2", weight: "700" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-poppins-var",
});

export const bebas = localFont({
  src: "../../../public/fonts/BebasNeue-Regular.woff2",
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-bebas-var",
});

export const bruno = localFont({
  src: "../../../public/fonts/BrunoAce-Regular.woff2",
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-bruno-var",
});

export const brunoSC = localFont({
  src: "../../../public/fonts/BrunoAceSC-Regular.woff2",
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-brunosc-var",
});

export const nexon = localFont({
  src: [
    { path: "../../../public/fonts/NEXONLv1GothicLight.woff2", weight: "300" },
    { path: "../../../public/fonts/NEXONLv1GothicRegular.woff2", weight: "400" },
    { path: "../../../public/fonts/NEXONLv1GothicBold.woff2", weight: "700" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-nexon-var",
});
