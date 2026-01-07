import React from "react";

const SingleTourLayout = ({
  children,
  reviews,
  availableTrips,
}: {
  children: React.ReactNode;
  reviews: React.ReactNode;
  availableTrips: React.ReactNode;
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {children} {availableTrips} {reviews}
    </div>
  );
};

export default SingleTourLayout;
