import axios from "axios";

export const fetchDogBreeds = async () => {
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds", {
      headers: {
        "x-api-key": process.env.REACT_DOG_API,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    return [];
  }
};

export const fetchDogImageById = async (imageId: string) => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/images/${imageId}`,
      {
        headers: {
          "x-api-key": process.env.REACT_DOG_API,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dog image:", error);
    return null;
  }
};
export const fetchDogImagesByBreedId = async (breedId: string) => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=10`,
      {
        headers: {
          "x-api-key": process.env.REACT_DOG_API,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dog images by breed:", error);
    return null;
  }
};

export const fetchDogBreedById = async (id: string) => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}`,
      {
        headers: {
          "x-api-key": process.env.REACT_DOG_API,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dog breed by ID:", error);
    return null;
  }
};
