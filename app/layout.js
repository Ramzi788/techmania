import Nav from "@/app/components/Nav";
import "@styles/globals.css";
import OfferBar from "./components/OfferBar";
import Providers from "./providers";

export const metadata = {
  title: "TechMania",
  description: "Ecommerce Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {" "}
          <main className="flex flex-col w-full">
            <OfferBar />
            <Nav />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
