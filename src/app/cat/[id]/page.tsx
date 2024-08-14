import {
  fetchCatBreedById,
  fetchCatImageById,
  fetchCatImagesByBreedId,
} from "@/app/api/cats";
import CatBreedContent from "@/components/cat-breed.page";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CatBreedPageProps {
  params: {
    id: string;
  };
}

export default async function CatBreedPage({ params }: CatBreedPageProps) {
  const { id } = params;

  try {
    const breedData = await fetchCatBreedById(id);
    if (!breedData) {
      return notFound();
    }

    const imagesData = breedData.id
      ? await fetchCatImagesByBreedId(breedData.id)
      : [];

    const imageData = breedData.reference_image_id
      ? await fetchCatImageById(breedData.reference_image_id)
      : null;

    return (
      <CatBreedContent
        breed={breedData}
        image={imageData?.url || null}
        gallery={imagesData}
      />
    );
  } catch (error) {
    console.error("Error fetching cat breed data:", error);
    return (
      <div className="text-center">
        Error fetching data. <Link href="/">Back to Home page</Link>
      </div>
    );
  }
}
