import Image from "next/image";

const Card = ({ name, image }) => {
  return (
    <div className="w-full rounded-[20px] bg-neutral-100 shadow-lg">
      <Image
        alt={name}
        src={image}
        width={100}
        height={100}
        className="w-full rounded-t-[20px] object-cover h-[200px]"
      />
      <div className="rounded-[20px] flex flex-col justify-end items-center p-[20px]">
        <p className="text-green-900 tracking-[1px] text-[18px] font-bold text-center">
          {name}
        </p>
      </div>
    </div>
  );
};

export default Card;
