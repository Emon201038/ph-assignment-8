import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const TripUpdatePage = () => {
  return (
    <div className="flex-1 w-full h-[calc(100vh-81px)]  flex justify-center items-center">
      <Card className="w-full max-w-md p-6 text-center">
        <CardHeader>
          <CardTitle>Update Trip</CardTitle>
          <CardDescription className="text-gray-600">
            To update a trip, please go to trips list and click on the edit icon
            of the trip you want to update.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/admin/dashboard/trips-management"
            className="text-primary hover:underline"
          >
            Go to trips list
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripUpdatePage;
