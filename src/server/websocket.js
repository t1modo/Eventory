import { Server } from "socket.io"

export function initWebSocket(server) {
  const io = new Server(server)

  io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on("rsvp", (data) => {
      // Broadcast the RSVP to all connected clients
      io.emit("newRSVP", data)
    })

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  })

  return io
}