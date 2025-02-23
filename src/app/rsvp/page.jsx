"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users } from "lucide-react"

export default function RSVPPage() {
  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5) // Format HH:MM
  }

  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: getCurrentTime(),
    location: "",
    attendees: "",
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      time: getCurrentTime(),
    }))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-900 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800 dark:text-purple-300">RSVP to Event</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="space-y-6">
          {/* Event Name */}
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Name
            </label>
            <div className="mt-1 relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="eventName"
                id="eventName"
                className="pl-12 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>
              <div className="mt-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="pl-12 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Time (Fixed layout issue) */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Time
              </label>
              <div className="mt-1 relative">
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="pl-6 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <div className="mt-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="location"
                id="location"
                className="pl-12 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter event location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Attendees */}
          <div>
            <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of Attendees
            </label>
            <div className="mt-1 relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="attendees"
                id="attendees"
                className="pl-12 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter number of attendees"
                value={formData.attendees}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="pl-6 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="pl-6 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Submit RSVP
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}