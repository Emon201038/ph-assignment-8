const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-3xl font-bold">Update Destination</h1>
      {/* Update destination form will go here for destination ID: {params.id} */}
    </div>
  );
};

export default page;
