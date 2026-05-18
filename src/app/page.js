import HeroSlider from "@/components/HeroSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <HeroSlider></HeroSlider>
    </div>
  );
}
