import Link from "next/link"
import { Button } from "@/components/ui/button"
import TourDetailsClient from "./tour-details-client"
import { mockTours, mockReviews } from "@/lib/mock-data"

export default async function TourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const tour = mockTours.find((t) => t.id === id)
  const tourReviews = mockReviews.filter((r) => r.tourId === id)

  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Tour not found</h1>
        <Button asChild>
          <Link href="/explore">Browse Tours</Link>
        </Button>
      </div>
    )
  }

  return <TourDetailsClient tour={tour} tourReviews={tourReviews} />
}
