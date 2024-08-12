import axios from "axios";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": process.env.REACT_CAT_API,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    return [];
  }
};

export const fetchCatImageById = async (imageId) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/${imageId}`,
      {
        headers: {
          "x-api-key": process.env.REACT_CAT_API,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cat image:", error);
    return null;
  }
};

export const fetchCatBreedById = async (id) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/breeds/${id}`,
      {
        headers: {
          "x-api-key": process.env.REACT_CAT_API,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cat image:", error);
    return null;
  }
};
