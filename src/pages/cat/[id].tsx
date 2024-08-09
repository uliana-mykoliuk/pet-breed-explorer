import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchCatBreedById, fetchCatImageById } from "../api/cats";
import Image from "next/image";
import Link from "next/link";

const CatBreedPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [breed, setBreed] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getBreedData = async () => {
      if (id) {
        try {
          const breedData = await fetchCatBreedById(id);
          setBreed(breedData);

          if (breedData?.reference_image_id) {
            const imageData = await fetchCatImageById(
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

  const progressBars = [
    { label: "Adaptability", value: breed.adaptability },
    { label: "Affection Level", value: breed.affection_level },
    { label: "Child Friendly", value: breed.child_friendly },
    { label: "Dog Friendly", value: breed.dog_friendly },
    { label: "Energy Level", value: breed.energy_level },
    { label: "Grooming", value: breed.grooming },
    { label: "Health Issues", value: breed.health_issues },
    { label: "Intelligence", value: breed.intelligence },
    { label: "Shedding Level", value: breed.shedding_level },
    { label: "Social Needs", value: breed.social_needs },
    { label: "Stranger Friendly", value: breed.stranger_friendly },
    { label: "Vocalisation", value: breed.vocalisation },
  ];

  return (
    <section className="py-[50px] px-[80px] min-h-screen grid content-center">
      <Link href="/" className="absolute top-[50px] left-[80px]">
        &larr; &nbsp;Back to Home
      </Link>
      <h1 className="text-center text-[48px] text-yellow-500 tracking-[1px] mb-[30px]">
        Learn more about this kitty
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
            <span className="text-green-900 font-bold">Origin: &nbsp;</span>
            {breed.origin}
          </p>
          <p className="tracking-[1px]">
            <span className="text-green-900 font-bold">Life span: &nbsp;</span>
            {breed.life_span} years
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

          {/* Progress Bars */}
          <div className="grid gap-y-[8px] gap-x-[20px] grid-cols-2">
            {progressBars.map((bar, index) => (
              <div key={index}>
                <label className="text-green-900 font-bold tracking-[1px]">
                  {bar.label}:
                </label>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-yellow-500 h-full"
                    style={{ width: `${(bar.value / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="tracking-[1px] mt-[20px]">{breed.description}</p>
        </div>
      </div>
    </section>
  );
};

export default CatBreedPage;
