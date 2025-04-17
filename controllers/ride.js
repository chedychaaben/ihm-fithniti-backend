import Ride from "../models/Ride.js"
import User from "../models/User.js"; 

export const getRide = async (req, res, next) => {
  try{
    const ride = await Ride.findById(req.params.id).populate('creator', 'name age stars rating profile ridesCreated createdAt').lean(); 
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.status(200).json(ride); 
  }catch(err){
    next(err);
  }
}

export const getAllRides = async (req, res, next) => {
  try{
    const rides = await Ride.find().populate('creator', 'name stars').lean(); 
    res.status(200).json(rides); 
  }catch(err){
    next(err);
  }
}

export const findRides = async (req, res, next) => {
  try {
    const { from, to, seat, date } = req.query;

    if (!from?.trim() || !to?.trim()) {
      return res.status(400).json({ message: 'Please provide both "from" and "to" locations.' });
    }

    const query = {
      'origin.place': new RegExp(from, 'i'),
      'destination.place': new RegExp(to, 'i'),
    };

    // Seat validation
    if (seat?.trim()) {
      const seatNumber = parseInt(seat.trim());
      if (!isNaN(seatNumber) && seatNumber > 0) {
        query.availableSeats = { $gte: seatNumber };
      }
    }
    
    // Date validation
    if (date?.trim()) {
      const searchDate = new Date(date.trim());
      if (!isNaN(searchDate.getTime())) {
        const startOfDay = new Date(searchDate);
        startOfDay.setUTCHours(0, 0, 0, 0);
        
        const endOfDay = new Date(searchDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
        
        query.startTime = {
          $gte: startOfDay,
          $lt: endOfDay
        };
      }
    }
    
    const rides = await Ride.find(query)
      .lean().populate('creator');

    res.status(200).json({ success: true, rides });

  } catch (err) {
    next(err);
  }
};

export const joinRide = async (req, res, next) =>{
  try{
    const ride = await Ride.findById(req.params.id);

    if (ride.passengers.includes(req.user.id)) {
      res.status(400).json('You already joined this ride!');
    }
    if (ride.passengers.length >= ride.availableSeats) {
      res.status(400).json('Ride is full!');
    }

    await Ride.updateOne(
      { _id: ride._id },
      { $push: { passengers: req.user.id }, $inc: { availableSeats: -1 } }
    ),
    await User.updateOne(
      { _id: req.user.id },
      { $push: { ridesJoined: ride._id } }
    ),

    res.status(200).json({ message: 'Successfully joined the ride!' });
  }catch(err){
    next(err);
  }
}

export const createRide = async (req, res, next) =>{
  try{
    const newRide = new Ride({...req.body, creator: req.user.id});
    await newRide.save()
    await User.findByIdAndUpdate(req.user.id, { $push: { ridesCreated: newRide._id } });
    res.status(201).json(newRide)
  }catch(err){
    next(err);
  }
}

export const updateRide = async(req, res, next) => {
  try{
    const { ...details } = req.body;
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      {
        $set: details,
      },
      {new:true}    
    )
    res.status(200).json({success: true, ride})
  }catch(err){
    next(err)
  }
}

export const deleteRide = async(req, res, next) => {
  try{
    await Ride.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate( req.user.id, { $pull: { ridesCreated: req.params.id } })
    res.status(200).send("ride has been deleted");
  }catch(err){
    next(err)
  }
}

export const getPopularRides = async (req, res, next) => {
  try {
    const popularRoutes = await Ride.aggregate([
      {
        $group: {
          _id: {
            origin: "$origin.place",
            destination: "$destination.place",
          },
          totalRides: { $sum: 1 },
          startingPrice: { $min: "$price" }, // lowest price for this route
        },
      },
      { $sort: { totalRides: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          origin: "$_id.origin",
          destination: "$_id.destination",
          totalRides: 1,
          startingPrice: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, routes: popularRoutes });
  } catch (err) {
    next(err);
  }
};