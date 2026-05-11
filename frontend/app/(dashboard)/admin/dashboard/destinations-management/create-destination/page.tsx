import DestinationForm from "@/components/module/destination/DestinationForm";

const page = () => {
  return (
    <div className="space-y-4 p-6 max-w-2xl w-full mx-auto">
      <h1 className="text-3xl font-bold">Create New Destination</h1>
      {/* Create destination form will go here */}
      <DestinationForm />
    </div>
  );
};

export default page;
