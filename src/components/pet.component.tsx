"use client";
import { PetType } from "@/types";
import CardList from "./card-list.component";
import ChoosePet from "./choose-pet.component";
import { useState } from "react";

const Pet = () => {
  const [pet, setPet] = useState<PetType | "">("");

  const handleChoosePet = (type: PetType) => {
    setPet(type);
  };
  return (
    <>
      <ChoosePet
        handleChooseCat={() => handleChoosePet("cat")}
        handleChooseDog={() => handleChoosePet("dog")}
      />
      {pet && (
        <CardList
          title={`Looking for a ${pet === "cat" ? "Cat" : "Dog"}?`}
          subtitle={`Let's find out who is your future Mr. or Mrs. ${
            pet === "cat" ? "Meowster" : "Woofster"
          }`}
          petType={pet}
          handleChangePet={(type: PetType) => handleChoosePet(type)}
        />
      )}
    </>
  );
};

export default Pet;
