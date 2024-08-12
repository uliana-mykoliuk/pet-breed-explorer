import Image from "next/image";
import HeroDogBg from "@/assets/hero-dog-bg.jpg";

interface HeroProps {
  onBtnClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBtnClick }) => {
  return (
    <main className="flex items-center min-h-screen bg-neutral-50 py-12 px-6 sm:px-12 md:px-24">
      <div className="flex flex-col items-center md:flex-row">
        <Image
          src={HeroDogBg}
          className="object-cover rounded-full h-36 w-36 md:h-80 md:w-80 xl:h-[450px] xl:w-[450px]"
          alt="Hero background image"
        />
        <div className="mt-5 text-center md:mt-0 md:ml-10 xl:ml-20 md:text-left">
          <p className="font-bold tracking-widest text-xs text-green-800 md:text-sm">
            Unlock your fluffy happiness
          </p>
          <h1 className="text-3xl text-yellow-500 md:text-5xl md:leading-tight">
            Pet Breed Explorer
          </h1>
          <p className="mt-2 tracking-wide text-sm md:text-lg">
            If you are not sure what your future friend looks like, we are glad
            to help you discover.
          </p>
          <button
            onClick={onBtnClick}
            className="mt-4 rounded-full bg-yellow-500 text-white text-sm py-1.5 px-4 md:mt-8 md:text-base md:py-3 md:px-6"
          >
            Let's have a look
          </button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
