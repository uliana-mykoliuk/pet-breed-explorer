export const fetchBreeds = async () => {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": process.env.REACT_CAT_API as string,
      },
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error("Error fetching cat breeds");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    return [];
  }
};

export const fetchCatImageById = async (imageId: string) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/${imageId}`,
      {
        headers: {
          "x-api-key": process.env.REACT_CAT_API as string,
        },
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching cat image");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cat image:", error);
    return null;
  }
};

export const fetchCatImagesByBreedId = async (breedId: string) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`,
      {
        headers: {
          "x-api-key": process.env.REACT_CAT_API as string,
        },
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching cat images");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cat images:", error);
    return null;
  }
};

export const fetchCatBreedById = async (id: string) => {
  try {
    const response = await fetch(`https://api.thecatapi.com/v1/breeds/${id}`, {
      headers: {
        "x-api-key": process.env.REACT_CAT_API as string,
      },
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error("Error fetching cat breed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cat breed:", error);
    return null;
  }
};
