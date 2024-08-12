import Card from "./card.component";

interface Weight {
  imperial: string;
  metric: string;
}

interface CatBreed {
  id: string;
  name: string;
  weight: Weight;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  temperament?: string;
  origin?: string;
  country_codes?: string;
  country_code?: string;
  description?: string;
  life_span?: string;
  indoor?: number;
  lap?: number;
  alt_names?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  wikipedia_url?: string;
  hypoallergenic?: number;
  reference_image_id?: string;
}

interface DogBreed {
  id: number;
  name: string;
  weight: Weight;
  height: Weight;
  country_code?: string;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  reference_image_id?: string;
}

type Breed = CatBreed | DogBreed;

interface CardListProps {
  title: string;
  subtitle: string;
  breeds: Breed[];
  visibleBreeds: number;
  images: { [key: string]: string };
  handleLoadMorePets: () => void;
  componentRef: React.RefObject<HTMLDivElement>;
  petType: string;
}

const CardList: React.FC<CardListProps> = ({
  title,
  subtitle,
  breeds,
  visibleBreeds,
  images,
  handleLoadMorePets,
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
      {visibleBreeds < breeds.length && (
        <div className="flex justify-center mt-4 md:mt-8">
          <button
            onClick={handleLoadMorePets}
            className="px-8 py-1.5 mt-4 text-white bg-yellow-500 rounded-full md:px-16 md:py-3 md:mt-8"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CardList;
