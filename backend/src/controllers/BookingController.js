const Booking = require("../models/Booking");

module.exports = {
  async store(request, response) {
    const { user_id } = request.headers;
    const { spot_id } = request.params;
    const { date } = request.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking.populate("spot").populate("user").execPopulate();

    const socketOwner = request.connectedUsers[booking.spot.user];

    if (socketOwner) {
      request.io.to(socketOwner).emit("booking_request", booking);
    }

    return response.json(booking);
  },
};
