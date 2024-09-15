import { ModeToggle } from "@/components/theme/ThemeChangeTool";
import { BackgroundLines } from "@/components/ui/background-lines";
import Image from "next/image";

export default function Home() {
  return (
    <BackgroundLines className="h-[100vh]">
      <ModeToggle />
      <div className="flex justify-center items-center flex-col px-[400px] h-[100%]">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Chat Smarter
          <br /> Connect Better
        </h2>
        <p className="max-w-xl mx-auto text-md md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Experience seamless conversations with our intuitive chat app designed
          for individuals and teams.
        </p>
      </div>
    </BackgroundLines>
  );
}
