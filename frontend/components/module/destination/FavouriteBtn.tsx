"use client";

import { Heart } from "lucide-react";
import React, { useEffect } from "react";

const FavouriteBtn = ({ id }: { id: string }) => {
  const [isFavourite, setIsFavourite] = React.useState(false);

  useEffect(() => {
    const favouriteList =
      JSON.parse(localStorage.getItem("favourites") || "[]") || [];

    const isFavourite = favouriteList.includes(id);

    if (isFavourite) {
      setIsFavourite(true);
    }
  }, [id]);

  const toggleFavourite = () => {
    const favouriteList =
      JSON.parse(localStorage.getItem("favourites") || "[]") || [];
    if (favouriteList.includes(id)) {
      favouriteList.splice(favouriteList.indexOf(id), 1);
    } else {
      favouriteList.push(id);
    }
    localStorage.setItem("favourites", JSON.stringify(favouriteList));
    setIsFavourite(!isFavourite);
  };
  return (
    <div
      onClick={toggleFavourite}
      className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 cursor-pointer shadow-md"
    >
      <Heart
        fill={isFavourite ? "currentColor" : "none"}
        className="text-pink-500 text-xl"
      />
    </div>
  );
};

export default FavouriteBtn;
