import Image, { StaticImageData } from "next/image";
import CatImg from "@/assets/cat-choise.jpg";
import DogImg from "@/assets/dog-choise.jpg";

interface ChoosePetBtnProps {
  img: StaticImageData;
  handleChoosePet: () => void;
  pet: string;
  text: string;
}

const ChoosePetBtn: React.FC<ChoosePetBtnProps> = ({
  img,
  handleChoosePet,
  pet,
  text,
}) => {
  return (
    <button
      onClick={handleChoosePet}
      className="grid justify-items-center transform transition-transform duration-500 ease hover:scale-125 focus:scale-125 grayscale-[75%] hover:grayscale-0 focus:grayscale-0"
    >
      <Image
        src={img}
        alt={pet}
        className="w-32 h-32 md:w-40 md:h-40  object-cover rounded-full"
      />
      <p className="mt-3 md:mt-6 text-sm md:text-base font-medium text-center text-green-900 tracking-wide max-w-[450px]">
        {text}
      </p>
      <p className="mt-2 md:mt-4 text-sm md:text-base font-rowdies text-center text-yellow-500">
        Click Me!
      </p>
    </button>
  );
};

interface ChoosePetProps {
  handleChooseCat: () => void;
  handleChooseDog: () => void;
  componentRef: React.RefObject<HTMLDivElement>;
}

const ChoosePet: React.FC<ChoosePetProps> = ({
  handleChooseCat,
  handleChooseDog,
  componentRef,
}) => {
  return (
    <div
      ref={componentRef}
      className="min-h-screen flex flex-col justify-center py-6 md:py-12 px-6 sm:px-12 md:px-24"
    >
      <h2 className="text-center text-3xl md:text-5xl text-yellow-500 tracking-wide">
        Are you a Cat or Dog person?
      </h2>
      <p className="mt-3 text-base md:text-lg text-center mb-5 md:mb-12">
        Find your perfect match! Choose your side
      </p>
      <div className="grid sm:grid-cols-2 gap-y-5 md:gap-y-8 gap-x-8 md:gap-x-12">
        <ChoosePetBtn
          img={CatImg}
          handleChoosePet={handleChooseCat}
          pet="cat"
          text="Imagine a tiny, furry ninja at home—pouncing on invisible foes, mastering acrobatic leaps, and napping on your keyboard, all with a perfect blend of grace and goofiness!"
        />
        <ChoosePetBtn
          img={DogImg}
          handleChoosePet={handleChooseDog}
          pet="dog"
          text="Imagine a joyful, four-legged shadow — always ready to turn a walk into an adventure, greet you with a wagging tail, and brighten your day with a goofy grin. Dogs make every moment more fun!"
        />
      </div>
    </div>
  );
};

export default ChoosePet;
