import Navbar from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { homeConstants } from "@/constants/homeConstants";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="text-center w-[80%] border-x-2 border-dashed mx-auto mt-[6%]   dark:bg-[#020817] bg-primary bg-white">
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter ">
          Welcome to <span className="text-red-500">Cyber</span> Fortress {">_"}
        </h1>
        <h4 className="text-muted-foreground px-36 md:text-xl border-b py-12 pb-20">
          We specialize in
          <span className="dark:text-white text-black">
            {" "}
            web development and cybersecurity consulting
          </span>
          . Our expert team is dedicated to safeguarding your digital assets.
        </h4>
        <div className="flex gap-5 mx-auto w-[40%] py-16 justify-center pb-16 border-x-2  border-dashed">
          <Button>Get Started</Button>
          <Button variant="outline">About Us</Button>
        </div>
        <div className="flex flex-col border-t pt-12">
          <h1 className="text-4xl font-black tracking-tighter">
            What do we offer ?
          </h1>
        </div>
        <div className="md:flex py-12 md:flex-wrap gap-6 px-6 ">
          {homeConstants.map((tile, idx) => (
            <Card
              className="md:max-w-[30%] max-w-[80%] max-h-[50rem] md:max-h-[30rem] mx-auto cursor-pointer hover:shadow-lg duration-500 dark:hover:shadow-slate-700 dark:hover:shadow-lg hover:scale-[102%]"
              key={idx}
            >
              {/* ⚡ Bolt: Removed priority prop from below-the-fold images.
                  These images render below the hero section. Using priority here forces immediate preloading,
                  wasting critical bandwidth that competes with above-the-fold assets, delaying actual LCP.
                  Removing priority restores Next.js's default loading="lazy" behavior.
                  Additionally: Using static imports (automatically provides blur placeholder/dimensions)
                  and the sizes attribute ensures responsive, bandwidth-efficient rendering without CLS. */}
              <Image
                src={tile.svg}
                alt={tile.title}
                className="rounded-t-lg object-cover w-full md:h-[46%]"
                placeholder="blur"
                sizes="(max-width: 768px) 80vw, 30vw"
              />

              <CardHeader>
                <CardTitle>{tile.title}</CardTitle>
                <CardDescription>{tile.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{tile.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <footer>
        <div className="text-muted-foreground text-sm dark:bg-[#020817]  dark:text-white pt-12 pb-2 text-center">
          <p>© 2024 Cyber Fortress. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
