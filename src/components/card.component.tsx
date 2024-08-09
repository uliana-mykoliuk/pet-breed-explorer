import Image from "next/image";
import Link from "next/link";

const Card = ({ id, name, image, pet }) => {
  return (
    <Link
      href={`${pet}/${id}`}
      className="block w-full rounded-[20px] bg-neutral-100 shadow-lg"
    >
      <Image
        alt={name}
        src={image}
        width={1000}
        height={1000}
        className="w-full rounded-t-[20px] object-cover h-[200px]"
      />
      <div className="rounded-[20px] flex flex-col justify-end items-center p-[20px]">
        <p className="text-green-900 tracking-[1px] text-[18px] font-bold text-center">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default Card;
