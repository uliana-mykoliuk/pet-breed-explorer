import { useEffect, useState } from "react";
import Card from "./card.component";
import { Breed, PetType } from "@/types";
import { fetchBreeds, fetchCatImageById } from "@/app/api/cats";
import { fetchDogBreeds, fetchDogImageById } from "@/app/api/dogs";

interface CardListProps {
  title: string;
  subtitle: string;
  petType: PetType;
  handleChangePet: (type: PetType) => void;
}

const CardList: React.FC<CardListProps> = ({
  title,
  subtitle,
  petType,
  handleChangePet,
}) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [visibleBreeds, setVisibleBreeds] = useState<number>(4);

  const fetchData = async () => {
    const fetchBreedsFunc = petType === "cat" ? fetchBreeds : fetchDogBreeds;
    const fetchImageFunc =
      petType === "cat" ? fetchCatImageById : fetchDogImageById;
    const breedsData = await fetchBreedsFunc();
    const imagesData = await Promise.all(
      breedsData.map(async (breed: Breed) => {
        if (breed.reference_image_id) {
          const image = await fetchImageFunc(breed.reference_image_id);
          return { id: breed.id, url: image?.url || "" };
        }
        return { id: breed.id, url: "" };
      })
    );
    setBreeds(breedsData);
    setImages(
      imagesData.reduce((acc, { id, url }) => ({ ...acc, [id]: url }), {})
    );
  };

  useEffect(() => {
    fetchData();
    setVisibleBreeds(4);
  }, [petType]);

  const handleLoadMoreBreeds = () => {
    setVisibleBreeds((prev) => prev + 8);
  };

  return (
    <div
      id="card-list"
      className="px-6 py-6 sm:px-12 md:px-24 md:py-12 min-h-screen flex flex-col justify-center"
    >
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
            onClick={handleLoadMoreBreeds}
            className="duration-500 ease font-rowdies px-8 py-1.5 mt-4 text-white bg-yellow-500 hover:bg-yellow-700 focus:bg-yellow-700 rounded-full md:px-16 md:py-3 md:mt-8"
          >
            Load More
          </button>
        )}
        <button
          onClick={() => handleChangePet(petType === "cat" ? "dog" : "cat")}
          className="duration-500 ease font-rowdies px-8 py-1.5 mt-4 bg-green-200 hover:bg-green-900 hover:text-white focus:bg-green-900 focus:text-white rounded-full md:px-16 md:py-3 md:mt-8 ml-3"
        >
          Looking for a {petType === "cat" ? "dog" : "cat"}?
        </button>
      </div>
    </div>
  );
};

export default CardList;
