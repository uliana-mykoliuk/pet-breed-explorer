import axios from "axios";

export const fetchDogBreeds = async () => {
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds", {
      headers: {
        "x-api-key": process.env.REACT_DOG_API, // Make sure to prefix with NEXT_PUBLIC_
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    return [];
  }
};

export const fetchDogImageById = async (imageId) => {
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
    console.error("Error fetching cat image:", error);
    return null;
  }
};
