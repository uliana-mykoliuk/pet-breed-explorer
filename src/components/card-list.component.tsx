import Card from "./card.component";
import { Breed, PetType } from "@/types";

interface CardListProps {
  title: string;
  subtitle: string;
  breeds: Breed[];
  visibleBreeds: number;
  images: { [key: string]: string };
  handleLoadMorePets: () => void;
  handleChangePet: (type: PetType) => void;
  componentRef: React.RefObject<HTMLDivElement>;
  petType: PetType;
}

const CardList: React.FC<CardListProps> = ({
  title,
  subtitle,
  breeds,
  visibleBreeds,
  images,
  handleLoadMorePets,
  handleChangePet,
  componentRef,
  petType,
}) => {
  return (
    <div ref={componentRef} className="px-6 py-6 sm:px-12 md:px-24 md:py-12">
      <h2 className="text-center text-3xl md:text-5xl text-yellow-500 tracking-wide">
        {title}
      </h2>
      <p className="mt-3 mb-5 text-center text-base md:text-lg md:mb-12">
        {subtitle}
      </p>
      <div className="grid gap-4 justify-items-center sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {breeds.slice(0, visibleBreeds).map((pet) => (
          <Card
            pet={petType}
            id={pet.id.toString()}
            key={pet.id}
            name={pet.name}
            image={images[pet.id]}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center mt-4 md:mt-8">
        {visibleBreeds < breeds.length && (
          <button
            onClick={handleLoadMorePets}
            className="px-8 py-1.5 mt-4 text-white bg-yellow-500 rounded-full md:px-16 md:py-3 md:mt-8"
          >
            Load More
          </button>
        )}
        <button
          onClick={() => handleChangePet(petType === "cat" ? "dog" : "cat")}
          className="px-8 py-1.5 mt-4 text-white bg-neutral-400 rounded-full md:px-16 md:py-3 md:mt-8 ml-3"
        >
          Looking for a {petType === "cat" ? "dog" : "cat"}?
        </button>
      </div>
    </div>
  );
};

export default CardList;
