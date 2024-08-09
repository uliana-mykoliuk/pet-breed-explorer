import Image from "next/image";
import CatImg from "@/assets/cat-choise.jpg";
import DogImg from "@/assets/dog-choise.jpg";

const ChoosePetBtn = ({ img, handleChoosePet, pet, text }) => {
  return (
    <button onClick={handleChoosePet} className="grid justify-items-center">
      <Image
        src={img}
        alt={pet}
        className="w-[300px] h-[300px] object-cover rounded-full"
      />
      <p className="text-green-900 tracking-[1px] text-center mt-[30px] max-w-[450px] font-normal">
        {text}
      </p>
    </button>
  );
};

const ChoosePet = ({ handleChooseCat, handleChooseDog, componentRef }) => {
  return (
    <div
      ref={componentRef}
      className="px-[80px] py-[50px] min-h-screen flex flex-col justify-center"
    >
      <h2 className="text-center text-[48px] text-yellow-500 tracking-[1px]">
        Are you Cat or Dog person?
      </h2>
      <p className="mt-[12px] text-[18px] text-center mb-[50px]">
        Find your perfect match! Choose your side
      </p>
      <div className="grid grid-cols-2 gap-x-[50px]">
        <ChoosePetBtn
          img={CatImg}
          handleChoosePet={handleChooseCat}
          pet="cat"
          text="Imagine a tiny, furry ninja at home—pouncing on invisible foes,
            mastering acrobatic leaps, and napping on your keyboard, all with a
            perfect blend of grace and goofiness!"
        />
        <ChoosePetBtn
          img={DogImg}
          handleChoosePet={handleChooseDog}
          pet="dog"
          text="Imagine a joyful, four-legged shadow — always ready to turn a walk
            into an adventure, greet you with a wagging tail, and brighten your
            day with a goofy grin. Dogs make every moment more fun!"
        />
      </div>
    </div>
  );
};

export default ChoosePet;
