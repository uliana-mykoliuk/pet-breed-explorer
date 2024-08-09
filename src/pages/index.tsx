import Hero from "@/components/hero.component";
import { useEffect, useState, useRef } from "react";
import { fetchBreeds, fetchCatImageById } from "./api/get-cats";
import { fetchDogBreeds, fetchDogImageById } from "./api/dogs";
import ChoosePet from "@/components/choose-pet.component";
import CardList from "@/components/card-list.component";

export default function Home() {
  const choosePetRef = useRef(null);
  const cardListRef = useRef(null);
  const [pet, setPet] = useState("");
  const [catBreeds, setCatBreeds] = useState([]);
  const [catImages, setCatImages] = useState({});
  const [visibleCatBreeds, setVisibleCatBreeds] = useState(4);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [dogImages, setDogImages] = useState({});
  const [visibleDogBreeds, setVisibleDogBreeds] = useState(4);

  const getCatBreeds = async () => {
    const breeds = await fetchBreeds();
    setCatBreeds(breeds);
  };

  const getCatImages = async () => {
    for (let breed of catBreeds) {
      if (breed.reference_image_id) {
        const image = await fetchCatImageById(breed.reference_image_id);
        setCatImages((prevImages) => ({
          ...prevImages,
          [breed.id]: image?.url || "",
        }));
      }
    }
  };

  const getDogBreeds = async () => {
    const breeds = await fetchDogBreeds();
    setDogBreeds(breeds);
  };

  const getDogImages = async () => {
    for (let breed of dogBreeds) {
      if (breed.reference_image_id) {
        const image = await fetchDogImageById(breed.reference_image_id);
        setDogImages((prevImages) => ({
          ...prevImages,
          [breed.id]: image?.url || "",
        }));
      }
    }
  };

  useEffect(() => {
    if (pet === "cat" && catBreeds.length === 0) {
      getCatBreeds();
    }
  }, [pet, dogBreeds]);

  useEffect(() => {
    if (pet === "dog" && dogBreeds.length === 0) {
      getDogBreeds();
    }
  }, [pet, dogBreeds]);

  useEffect(() => {
    if (catBreeds.length > 0) {
      getCatImages();
    }
  }, [catBreeds]);

  useEffect(() => {
    if (dogBreeds.length > 0) {
      getDogImages();
    }
  }, [dogBreeds]);

  useEffect(() => {
    if (pet) {
      if (cardListRef.current) {
        setTimeout(
          () => cardListRef.current.scrollIntoView({ behavior: "smooth" }),
          1000
        );
      }
    }
  }, [pet, catBreeds, dogBreeds]);

  const handleScrollToChoosePet = () => {
    choosePetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoadMoreCats = () => {
    setVisibleCatBreeds((prev) => prev + 8);
  };

  const handleLoadMoreDogs = () => {
    setVisibleDogBreeds((prev) => prev + 8);
  };

  const handleChooseCat = () => {
    setVisibleCatBreeds(4);
    setPet("cat");
  };

  const handleChooseDog = () => {
    setVisibleDogBreeds(4);
    setPet("dog");
  };

  return (
    <>
      <Hero onBtnClick={handleScrollToChoosePet} />

      {/* Dog or Cat ? */}
      <ChoosePet
        componentRef={choosePetRef}
        handleChooseCat={handleChooseCat}
        handleChooseDog={handleChooseDog}
      />
      {/* Сat */}
      {pet === "cat" && (
        <CardList
          componentRef={cardListRef}
          title="Looking for a Cat?"
          subtitle="Let's find out who is your future Mr. or Mrs. Meowster"
          breeds={catBreeds}
          visibleBreeds={visibleCatBreeds}
          images={catImages}
          handleLoadMorePets={handleLoadMoreCats}
        />
      )}

      {/* Dog */}
      {pet === "dog" && (
        <CardList
          componentRef={cardListRef}
          title="Looking for a Dog?"
          subtitle="Let's find out who is your future Mr. or Mrs. Woofster"
          breeds={dogBreeds}
          visibleBreeds={visibleDogBreeds}
          images={dogImages}
          handleLoadMorePets={handleLoadMoreDogs}
        />
      )}

      {/* <h2 className="text-center text-[48px] text-yellow-500 tracking-[1px]">
        Looking for a Cat?
      </h2>
      <p className="mt-[12px] text-[24px] text-center mb-[50px]">
        Let's find out who is your future Mr. or Mrs. Meowster
      </p>
      <div className="grid grid-cols-4 px-[80px] gap-[30px]">
        {catBreeds.slice(0, visibleCatBreeds).map((cat) => (
          <Card key={cat.id} name={cat.name} image={catImages[cat.id]} />
        ))}
      </div>
      {visibleCatBreeds < catBreeds.length && (
        <div className="flex justify-center mt-8 mb-[100px]">
          <button
            onClick={handleLoadMoreCats}
            className="bg-yellow-500 text-white py-[12px] px-[64px] rounded-full mt-[30px]"
          >
            Load More
          </button>
        </div>
      )} */}

      {/* <h2 className="text-center text-[48px] text-yellow-500 tracking-[1px]">
        Looking for a Dog?
      </h2>
      <p className="mt-[12px] text-[24px] text-center mb-[50px]">
        Let's find out who is your future Mr. or Mrs. Woofster
      </p>
      <div className="grid grid-cols-4 px-[80px] gap-[30px]">
        {dogBreeds.slice(0, visibleDogBreeds).map((dog) => (
          <Card key={dog.id} name={dog.name} image={dogImages[dog.id]} />
        ))}
      </div>
      {visibleDogBreeds < dogBreeds.length && (
        <div className="flex justify-center mt-8 mb-[100px]">
          <button
            onClick={handleLoadMoreDogs}
            className="bg-yellow-500 text-white py-[12px] px-[64px] rounded-full mt-[30px]"
          >
            Load More
          </button>
        </div>
      )} */}
    </>
  );
}
