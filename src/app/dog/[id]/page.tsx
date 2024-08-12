"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  fetchDogBreedById,
  fetchDogImageById,
  fetchDogImagesByBreedId,
} from "@/api/dogs";
import { CatImage, DogBreed } from "@/types";
import Modal from "@/components/modal.component";

interface DogBreedPageProps {
  params: {
    id: string;
  };
}

const DogBreedPage = ({ params }: DogBreedPageProps) => {
  const { id } = params;
  const [breed, setBreed] = useState<DogBreed | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<CatImage[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getBreedData = async () => {
    if (id && typeof id === "string") {
      try {
        const breedData = await fetchDogBreedById(id);
        setBreed(breedData);

        if (breedData?.id) {
          const imagesData = await fetchDogImagesByBreedId(breedData.id);
          setGallery(imagesData);
        }

        if (breedData?.reference_image_id) {
          const imageData = await fetchDogImageById(
            breedData.reference_image_id
          );
          setImage(imageData?.url || null);
        }
      } catch (error) {
        console.error("Error fetching dog breed data:", error);
      }
    }
  };

  useEffect(() => {
    getBreedData();
  }, [id]);

  if (!breed) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <section className="px-6 py-6 sm:px-12 md:px-24 md:py-12 min-h-screen grid content-center">
      <div className="grid md:grid-cols-5 gap-4 mb-4 md:mb-8">
        <Link href="/" className="md:col-span-2 text-blue-500">
          &larr; Back to Home
        </Link>
        <h1 className="md:col-span-3 text-center text-3xl lg:text-5xl text-yellow-500 tracking-wide">
          Learn More About This Dog
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-12">
        {image && (
          <Image
            src={image}
            alt={breed.name || "Dog Image"}
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
          {breed.bred_for && (
            <p className="text-sm md:text-base">
              <span className="font-bold text-green-900">Bred For:</span>{" "}
              {breed.bred_for}
            </p>
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
          {breed.height && breed.weight && (
            <>
              <p className="text-sm md:text-base">
                <span className="font-bold text-green-900">Height:</span>{" "}
                Imperial ({breed.height.imperial}) / Metric (
                {breed.height.metric})
              </p>
              <p className="text-sm md:text-base">
                <span className="font-bold text-green-900">Weight:</span>{" "}
                Imperial ({breed.weight.imperial}) / Metric (
                {breed.weight.metric})
              </p>
            </>
          )}
          {breed.temperament && (
            <p className="text-sm md:text-base">
              <span className="font-bold text-green-900">Temperament:</span>{" "}
              {breed.temperament}
            </p>
          )}

          {gallery && (
            <>
              <p className="text-sm md:text-base mt-4 font-bold text-green-900">
                Gallery:{" "}
              </p>
              <div className="flex flex-wrap mt-2 overflow-x-auto">
                {gallery.map((picture) => (
                  <button
                    key={picture.id}
                    onClick={() => setSelectedImage(picture.url)}
                    className="mr-2 mb-2"
                  >
                    <Image
                      src={picture.url}
                      alt={"Cat Image"}
                      width={picture.width}
                      height={picture.height}
                      className="w-[100px] h-[100px] object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {selectedImage && (
        <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </section>
  );
};

export default DogBreedPage;
