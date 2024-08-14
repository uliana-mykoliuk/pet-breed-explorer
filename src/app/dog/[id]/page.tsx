import {
  fetchDogBreedById,
  fetchDogImageById,
  fetchDogImagesByBreedId,
} from "@/app/api/dogs";
import DogBreedContent from "@/components/dog-breed.page";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DogBreedPageProps {
  params: {
    id: string;
  };
}

export default async function DogBreedPage({ params }: DogBreedPageProps) {
  const { id } = params;

  try {
    const breedData = await fetchDogBreedById(id);
    if (!breedData) {
      return notFound();
    }

    const imagesData = breedData.id
      ? await fetchDogImagesByBreedId(breedData.id)
      : [];

    const imageData = breedData.reference_image_id
      ? await fetchDogImageById(breedData.reference_image_id)
      : null;

    return (
      <DogBreedContent
        breed={breedData}
        image={imageData?.url || null}
        gallery={imagesData}
      />
    );
  } catch (error) {
    console.error("Error fetching dog breed data:", error);
    return (
      <div className="text-center">
        Error fetching data <Link href="/">Back to Home page</Link>
      </div>
    );
  }
}
