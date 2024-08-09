import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchDogBreedById, fetchDogImageById } from "../api/dogs";
import Link from "next/link";

const DogBreedPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [breed, setBreed] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getBreedData = async () => {
      if (id) {
        try {
          const breedData = await fetchDogBreedById(id);
          setBreed(breedData);

          if (breedData?.reference_image_id) {
            const imageData = await fetchDogImageById(
              breedData.reference_image_id
            );
            setImage(imageData?.url || null);
          }
        } catch (error) {
          console.error("Error fetching cat breed data:", error);
        }
      }
    };

    getBreedData();
  }, [id]);

  if (!breed) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-[50px] px-[80px] min-h-screen grid content-center">
      <Link href="/" className="absolute top-[50px] left-[80px]">
        &larr; &nbsp;Back to Home
      </Link>
      <h1 className="text-center text-[48px] text-yellow-500 tracking-[1px] mb-[30px]">
        Learn more about this dog
      </h1>
      <div className="grid grid-cols-2 gap-[50px]">
        {image && (
          <Image
            src={image}
            alt={breed.name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        )}
        <div className="grid gap-[5px] content-start">
          <h2 className="text-[36px] text-green-900 tracking-[1px] leading-[40px] mb-[10px]">
            {breed.name}
          </h2>
          <p className="tracking-[1px]">
            <span className="text-green-900 font-bold">Bred for: &nbsp;</span>
            {breed.bred_for}
          </p>
          <p className="tracking-[1px]">
            <span className="text-green-900 font-bold">Origin: &nbsp;</span>
            {breed.origin}
          </p>
          <p className="tracking-[1px]">
            <span className="text-green-900 font-bold">Life span: &nbsp;</span>
            {breed.life_span} years
          </p>
          <p className="tracking-[1px]">
            <span className="text-green-900 font-bold">Height: &nbsp;</span>
            imperial ({breed.height.imperial})/ metric ({breed.height.metric})
          </p>
          <p className="tracking-[1px]">
            <span className="text-green-900 font-bold">Weight: &nbsp;</span>
            imperial ({breed.weight.imperial})/ metric ({breed.weight.metric})
          </p>
          <p className="tracking-[1px]">
            <span className="text-green-900 font-bold">
              Temperament: &nbsp;
            </span>
            {breed.temperament}
          </p>

          <p className="tracking-[1px] mt-[20px]">{breed.description}</p>
        </div>
      </div>
    </section>
  );
};

export default DogBreedPage;
