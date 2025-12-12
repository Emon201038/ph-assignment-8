"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, MapPin, DollarSign, TrendingUp, MoreVertical } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  if (!isAuthenticated || user?.role !== "admin") {
    router.push("/login")
    return null
  }

  const stats = [
    { label: "Total Users", value: "12,543", icon: Users, change: "+523 this month" },
    { label: "Active Guides", value: "1,247", icon: MapPin, change: "+89 this month" },
    { label: "Total Revenue", value: "$127,450", icon: DollarSign, change: "+12.5%" },
    { label: "Growth Rate", value: "+24%", icon: TrendingUp, change: "vs last month" },
  ]

  const recentUsers = [
    { id: "1", name: "Sarah Johnson", email: "sarah@example.com", role: "tourist", joinDate: "2024-12-01" },
    { id: "2", name: "Mike Chen", email: "mike@example.com", role: "guide", joinDate: "2024-12-02" },
    { id: "3", name: "Emma Wilson", email: "emma@example.com", role: "tourist", joinDate: "2024-12-02" },
  ]

  const recentTours = [
    { id: "1", title: "Hidden Jazz Bars", guide: "Marcus Johnson", status: "active", bookings: 24 },
    { id: "2", title: "Tokyo Food Tour", guide: "Takeshi Yamamoto", status: "active", bookings: 31 },
    { id: "3", title: "Paris Gardens", guide: "Sophie Laurent", status: "active", bookings: 18 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your LocalGuide platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={user.role === "guide" ? "default" : "secondary"}>{user.role}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tours">
            <Card>
              <CardHeader>
                <CardTitle>Recent Tours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTours.map((tour) => (
                    <div key={tour.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{tour.title}</p>
                        <p className="text-sm text-muted-foreground">by {tour.guide}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="font-semibold">{tour.bookings}</span> bookings
                        </div>
                        <Badge variant="default">{tour.status}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Booking management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
