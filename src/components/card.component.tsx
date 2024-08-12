import Image from "next/image";
import Link from "next/link";
import ImageNotFound from "@/assets/image-not-found.png";

interface CardProps {
  id: string;
  name: string;
  image?: string;
  pet: string;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  image = ImageNotFound,
  pet,
}) => {
  return (
    <Link
      href={`${pet}/${id}`}
      className="block w-full max-w-[320px] rounded-2xl bg-neutral-100 shadow-lg focus:outline-none"
    >
      <Image
        alt={!image ? "Image not available" : name}
        src={image ? image : ImageNotFound}
        width={1000}
        height={1000}
        className="w-full h-36 md:h-48 object-cover rounded-t-2xl"
      />
      <div className="flex flex-col items-center justify-end p-3 md:p-5 rounded-2xl">
        <p className="text-base md:text-lg font-bold text-center text-green-900 tracking-wide">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default Card;
