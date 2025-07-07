import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Pompiere } from "next/font/google";

const pompiere = Pompiere({
  variable: "--font-pompiere",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Tick Tasks",
  description: "A task management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pompiere.variable} font-pompiere antialiased`}>
        {children}
         <ToastContainer position="top-right" autoClose={2000} />
      </body>
    </html>
  );
}
