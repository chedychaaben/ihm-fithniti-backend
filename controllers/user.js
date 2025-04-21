import User from  "../models/User.js"

// Get user details
export const getUser = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id).populate('ridesCreated ridesJoined').lean();
    const {email, password, updatedAt, ...detail} = user
    res.status(200).json(detail); 
  }catch(err){
    next(err);
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false });

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, phoneNumber, profilePicture, age, profile, cinPicture, permisPicture } = req.body;

    // Create an update object to conditionally add the fields if they have values
    const updateFields = {
      name,
      phoneNumber,
      profilePicture,
      age,
      profile
    };

    // Only update the cinPicture if it has a value
    if (cinPicture) {
      updateFields.cinPicture = cinPicture;
    }

    // Only update the permisPicture if it has a value
    if (permisPicture) {
      updateFields.permisPicture = permisPicture;
    }

    // Perform the update with the conditional fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, select: '-password' }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

// export const deleteUser = async (req, res, next) => {
//   try{
//     await User.findByIdAndDelete(req.params.id)
//     res.status(200).json("User has been deleted.")
//   }catch{
//     next(err)
//   }
// }


// controllers/userController.js

export const updateProfileImage = async (req, res, next) => {
  const userId = req.user.id;
  const fileNameInUploadsFolder = req.body.fileNameInUploadsFolder;

  try {
    if (!fileNameInUploadsFolder) {
      return res.status(400).json({ error: 'No file url provided to update' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: fileNameInUploadsFolder },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


export const getProfileImage = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('profilePicture'); // Only select profilePicture field

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.profilePicture) {
      return res.status(404).json({ error: 'Profile picture not found' });
    }

    res.status(200).json({
      message: 'Profile picture retrieved successfully',
      profilePicture: user.profilePicture
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};