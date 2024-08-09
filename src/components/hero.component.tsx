import Image from "next/image";

import HeroDogBg from "@/assets/hero-dog-bg.jpg";

const Hero = ({ onBtnClick }) => {
  return (
    <main className="h-screen bg-neutral-50 flex items-center px-[100px]">
      <div className="flex items-center">
        <Image
          src={HeroDogBg}
          className="h-[450px] w-[450px] object-cover rounded-full"
          alt=""
        />
        <div className="ml-[90px]">
          <p className="text-[14px] text-green-800 font-bold tracking-[2px]">
            Unlock your fluffy happyness
          </p>
          <h1 className="text-yellow-500 text-[64px] leading-[70px]">
            Pet Breed Explorer
          </h1>
          <p className="text-[20px] mt-[16px] tracking-[1px]">
            If you are not sure what your future friend looks like we are glad
            to help you discover
          </p>
          <button
            onClick={onBtnClick}
            className="bg-yellow-500 text-white py-[12px] px-[16px] rounded-full mt-[30px]"
          >
            Let's have a look
          </button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
