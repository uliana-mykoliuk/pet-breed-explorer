import { useEffect, useState, useRef } from "react";
import Hero from "@/components/hero.component";
import ChoosePet from "@/components/choose-pet.component";
import CardList from "@/components/card-list.component";
import { fetchBreeds, fetchCatImageById } from "./api/cats";
import { fetchDogBreeds, fetchDogImageById } from "./api/dogs";
import { Breed, CatBreed, DogBreed, PetType } from "@/types";

export default function Home() {
  const choosePetRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLDivElement>(null);

  const [pet, setPet] = useState<PetType | "">("");
  const [catBreeds, setCatBreeds] = useState<CatBreed[]>([]);
  const [dogBreeds, setDogBreeds] = useState<DogBreed[]>([]);
  const [catImages, setCatImages] = useState<{ [key: string]: string }>({});
  const [dogImages, setDogImages] = useState<{ [key: string]: string }>({});
  const [visibleBreeds, setVisibleBreeds] = useState<{
    cat: number;
    dog: number;
  }>({ cat: 4, dog: 4 });

  const fetchData = async (type: PetType) => {
    const fetchBreedsFunc = type === "cat" ? fetchBreeds : fetchDogBreeds;
    const fetchImageFunc =
      type === "cat" ? fetchCatImageById : fetchDogImageById;
    const breeds = await fetchBreedsFunc();
    const images = await Promise.all(
      breeds.map(async (breed: Breed) => {
        if (breed.reference_image_id) {
          const image = await fetchImageFunc(breed.reference_image_id);
          return { id: breed.id, url: image?.url || "" };
        }
        return { id: breed.id, url: "" };
      })
    );
    if (type === "cat") {
      setCatBreeds(breeds);
      setCatImages(
        images.reduce((acc, { id, url }) => ({ ...acc, [id]: url }), {})
      );
    } else {
      setDogBreeds(breeds);
      setDogImages(
        images.reduce((acc, { id, url }) => ({ ...acc, [id]: url }), {})
      );
    }
  };

  useEffect(() => {
    if (pet === "cat" && catBreeds.length === 0) {
      fetchData("cat");
    } else if (pet === "dog" && dogBreeds.length === 0) {
      fetchData("dog");
    }
  }, [pet, catBreeds.length, dogBreeds.length]);

  useEffect(() => {
    if (pet) {
      setTimeout(() => {
        cardListRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  }, [pet]);

  const handleScrollToChoosePet = () => {
    choosePetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoadMoreBreeds = (type: PetType) => {
    setVisibleBreeds((prev) => ({ ...prev, [type]: prev[type] + 8 }));
  };

  const handleChoosePet = (type: PetType) => {
    setVisibleBreeds((prev) => ({ ...prev, [type]: 4 }));
    setPet(type);
  };

  return (
    <>
      <Hero onBtnClick={handleScrollToChoosePet} />
      <ChoosePet
        componentRef={choosePetRef}
        handleChooseCat={() => handleChoosePet("cat")}
        handleChooseDog={() => handleChoosePet("dog")}
      />
      {pet && (
        <CardList
          componentRef={cardListRef}
          title={`Looking for a ${pet === "cat" ? "Cat" : "Dog"}?`}
          subtitle={`Let's find out who is your future Mr. or Mrs. ${
            pet === "cat" ? "Meowster" : "Woofster"
          }`}
          breeds={pet === "cat" ? catBreeds : dogBreeds}
          visibleBreeds={visibleBreeds[pet]}
          images={pet === "cat" ? catImages : dogImages}
          handleLoadMorePets={() => handleLoadMoreBreeds(pet)}
          petType={pet}
          handleChangePet={(type: PetType) => handleChoosePet(type)}
        />
      )}
    </>
  );
}
