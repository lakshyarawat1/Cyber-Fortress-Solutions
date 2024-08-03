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
        <h1 className="text-7xl font-black tracking-tighter ">
          Welcome to <span className="text-red-500">Cyber</span> Fortress {">_"}
        </h1>
        <h4 className="text-muted-foreground px-36 text-xl border-b py-12 pb-20">
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
        <div className="flex py-12 flex-wrap gap-6 px-6">
          {homeConstants.map((tile, idx) => (
            <Card
              className="max-w-[30%] max-h-[30rem] mx-auto cursor-pointer hover:shadow-lg duration-500 dark:hover:shadow-slate-700 dark:hover:shadow-lg hover:scale-[102%]"
              key={idx}
            >
              <Image
                src={tile.svg}
                alt="Tile"
                width={400}
                height={400}
                className="rounded-t-lg object-none w-full h-[46%]"
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
