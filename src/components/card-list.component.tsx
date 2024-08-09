import Card from "./card.component";

const CardList = ({
  title,
  subtitle,
  breeds,
  visibleBreeds,
  images,
  handleLoadMorePets,
  componentRef,
}) => {
  return (
    <div ref={componentRef} className="px-[80px] my-[100px]">
      <h2 className="text-center text-[48px] text-yellow-500 tracking-[1px]">
        {title}
      </h2>
      <p className="mt-[12px] text-[24px] text-center mb-[50px]">{subtitle}</p>
      <div className="grid grid-cols-4 gap-[30px]">
        {breeds.slice(0, visibleBreeds).map((pet) => (
          <Card key={pet.id} name={pet.name} image={images[pet.id]} />
        ))}
      </div>
      {visibleBreeds < breeds.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMorePets}
            className="bg-yellow-500 text-white py-[12px] px-[64px] rounded-full mt-[30px]"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CardList;
