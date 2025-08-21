import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SpaceCard from "@/components/SpaceCard"

// Import images
import privateOfficeImage from "@/assets/private-office.jpg"
import coworkingImage from "@/assets/coworking-space.jpg"
import meetingRoomImage from "@/assets/meeting-room.jpg"

export default function BookSpace() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Book a Space</h1>
          <p className="text-gray-600">Find and book the perfect workspace for your needs</p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <Input type="date" className="w-full border-gray-200" placeholder="Select date" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
              <Select>
                <SelectTrigger className="w-full border-gray-200">
                  <SelectValue placeholder="All Space Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Space</SelectItem>
                  <SelectItem value="meeting">Meeting Room</SelectItem>
                  <SelectItem value="coworking">Coworking Space</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
              <Select>
                <SelectTrigger className="w-full border-gray-200">
                  <SelectValue placeholder="Any Capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-4">1-4 People</SelectItem>
                  <SelectItem value="5-10">5-10 People</SelectItem>
                  <SelectItem value="10+">10+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <Select>
                <SelectTrigger className="w-full border-gray-200">
                  <SelectValue placeholder="Select Amenities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wifi">WiFi</SelectItem>
                  <SelectItem value="projector">Projector</SelectItem>
                  <SelectItem value="whiteboard">Whiteboard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button className="w-full md:w-auto px-12 py-6 bg-blue-500 hover:bg-blue-600 text-white text-lg">
              Search Spaces
            </Button>
          </div>
        </div>

        {/* Available Spaces */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Available Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpaceCard
              id="1"
              name="Executive Office Suite"
              type="Private Office"
              image={privateOfficeImage}
              location="Downtown"
              price={75}
              description="Premium private office space perfect for executives and small teams seeking a professional environment."
              amenities={["High-speed WiFi", "Coffee & Refreshments"]}
            />
            <SpaceCard
              id="2"
              name="Conference Room"
              type="Meeting Room"
              image={meetingRoomImage}
              location="Downtown"
              price={120}
              description="Fully equipped meeting space designed for presentations, client meetings, and team collaborations."
              amenities={["Video Conferencing", "Whiteboard"]}
            />
            <SpaceCard
              id="3"
              name="Coworking Hotdesk"
              type="Coworking"
              image={coworkingImage}
              location="Tech Hub"
              price={25}
              description="Flexible workspace in our vibrant coworking area. Perfect for freelancers and remote workers."
              amenities={["High-speed WiFi", "Coffee & Refreshments"]}
            />
            <SpaceCard
              id="4"
              name="Creative Studio"
              type="Studio"
              image={privateOfficeImage}
              location="Arts District"
              price={95}
              description="Inspiring space designed for creative teams, photoshoots, workshops, and collaborative projects."
              amenities={["High-speed WiFi", "Video Conferencing"]}
            />
            <SpaceCard
              id="5"
              name="Private Office"
              type="Office"
              image={privateOfficeImage}
              location="Business District"
              price={85}
              description="Quiet, dedicated office space for focused work and private meetings. Includes desk and ergonomic chair."
              amenities={["High-speed WiFi", "Printer Access"]}
            />
            <SpaceCard
              id="6"
              name="Casual Meeting Pod"
              type="Meeting Pod"
              image={meetingRoomImage}
              location="Innovation Hub"
              price={45}
              description="Comfortable, informal meeting space ideal for brainstorming sessions and team catchups."
              amenities={["Video Conferencing", "Whiteboard"]}
            />
          </div>
        </section>

        {/* How Booking Works */}
        <section className="mt-16 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">How Booking Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">1. Find a Space</h3>
              <p className="text-gray-600 text-sm">Browse our collection of workspaces and filter by type, capacity, and amenities.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">2. Select Date & Time</h3>
              <p className="text-gray-600 text-sm">Choose your preferred date and time slot for your booking.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">3. Confirm & Pay</h3>
              <p className="text-gray-600 text-sm">Review your booking details and complete the secure payment process.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">4. Enjoy Your Space</h3>
              <p className="text-gray-600 text-sm">Receive instant confirmation and access instructions for your booked space.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
