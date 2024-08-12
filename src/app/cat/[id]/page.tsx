"use client";
import { useEffect, useState } from "react";
import { fetchCatBreedById, fetchCatImageById } from "@/api/cats";
import Image from "next/image";
import Link from "next/link";
import { CatBreed } from "@/types";

const CatBreedPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [breed, setBreed] = useState<CatBreed | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const getBreedData = async () => {
    if (id && typeof id === "string") {
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

  useEffect(() => {
    getBreedData();
  }, [id]);

  if (!breed) {
    return <div className="text-center">Loading...</div>;
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
    <section className="px-6 py-6 sm:px-12 md:px-24 md:py-12 min-h-screen grid content-center">
      <div className="grid md:grid-cols-5 gap-4 mb-4 md:mb-8">
        <Link href="/" className="md:col-span-2 text-blue-500">
          &larr; Back to Home
        </Link>
        <h1 className="md:col-span-3 text-center text-3xl lg:text-5xl text-yellow-500 tracking-wide">
          Learn More About This Kitty
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-12">
        {image && (
          <Image
            src={image}
            alt={breed.name || "Cat Image"}
            width={1000}
            height={1000}
            className="max-w-[400px] max-h-[50vh] md:max-h-none md:max-w-none w-full h-full object-cover justify-self-center"
          />
        )}
        <div className="space-y-2 md:space-y-4">
          {breed.name && (
            <h2 className="text-2xl md:text-4xl text-green-900 tracking-wide leading-snug mb-2">
              {breed.name}
            </h2>
          )}
          {breed.origin && (
            <p className="text-sm md:text-base">
              <span className="font-bold text-green-900">Origin:</span>{" "}
              {breed.origin}
            </p>
          )}
          {breed.life_span && (
            <p className="text-sm md:text-base">
              <span className="font-bold text-green-900">Life Span:</span>{" "}
              {breed.life_span} years
            </p>
          )}
          {breed.weight && (
            <p className="text-sm md:text-base">
              <span className="font-bold text-green-900">Weight:</span> Imperial
              ({breed.weight.imperial}) / Metric ({breed.weight.metric})
            </p>
          )}
          {breed.temperament && (
            <p className="text-sm md:text-base">
              <span className="font-bold text-green-900">Temperament:</span>{" "}
              {breed.temperament}
            </p>
          )}

          <div className="grid gap-2 grid-cols-2">
            {progressBars.map((bar) =>
              bar.value != null ? (
                <div key={bar.label}>
                  <label className="font-bold text-green-900 text-sm md:text-base">
                    {bar.label}:
                  </label>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-500 h-full"
                      style={{ width: `${(bar.value / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ) : null
            )}
          </div>

          {breed.description && (
            <p className="text-sm md:text-base mt-4">{breed.description}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatBreedPage;
