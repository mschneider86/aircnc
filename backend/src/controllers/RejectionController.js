const { store } = require("./SessionController");

const Booking = require("../models/Booking");

module.exports = {
  async store(request, response) {
    const { booking_id } = request.params;

    const booking = await Booking.findById(booking_id).populate("spot");

    booking.approved = false;

    await booking.save();

    const socketBookingUser = request.connectedUsers[booking.user];

    if (socketBookingUser) {
      request.io.to(socketBookingUser).emit("booking_response", booking);
    }

    return response.json(booking);
  },
};
