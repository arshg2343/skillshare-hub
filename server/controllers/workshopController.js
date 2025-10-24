// Workshop controller for CRUD operations
import Workshop from "../models/Workshop.js"
import User from "../models/User.js"

// Get all workshops
export const getAllWorkshops = async (req, res) => {
  try {
    const { category, search } = req.query
    const query = { status: "approved" }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    const workshops = await Workshop.find(query)
      .populate("creator", "name email")
      .populate("participants", "name email")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: workshops.length,
      workshops,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get single workshop
export const getWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id)
      .populate("creator", "name email")
      .populate("participants", "name email")

    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found" })
    }

    res.status(200).json({
      success: true,
      workshop,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Create workshop
export const createWorkshop = async (req, res) => {
  try {
    const { title, description, category, date, capacity, imageURL } = req.body

    if (!title || !description || !category || !date || !capacity) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" })
    }

    const workshop = await Workshop.create({
      title,
      description,
      category,
      date,
      capacity,
      imageURL: imageURL || "/workshop.png",
      creator: req.user.id,
    })

    // Add workshop to user's created workshops
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdWorkshops: workshop._id },
    })

    res.status(201).json({
      success: true,
      workshop,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update workshop
export const updateWorkshop = async (req, res) => {
  try {
    let workshop = await Workshop.findById(req.params.id)

    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found" })
    }

    // Check if user is the creator
    if (workshop.creator.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to update this workshop" })
    }

    workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      workshop,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Delete workshop
export const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id)

    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found" })
    }

    // Check if user is the creator
    if (workshop.creator.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this workshop" })
    }

    await Workshop.findByIdAndDelete(req.params.id)

    // Remove workshop from user's created workshops
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { createdWorkshops: req.params.id },
    })

    res.status(200).json({
      success: true,
      message: "Workshop deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Join workshop
export const joinWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id)

    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found" })
    }

    // Check if user is already a participant
    if (workshop.participants.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: "You are already a participant" })
    }

    // Check capacity
    if (workshop.participants.length >= workshop.capacity) {
      return res.status(400).json({ success: false, message: "Workshop is at full capacity" })
    }

    workshop.participants.push(req.user.id)
    await workshop.save()

    // Add workshop to user's joined workshops
    await User.findByIdAndUpdate(req.user.id, {
      $push: { joinedWorkshops: workshop._id },
    })

    res.status(200).json({
      success: true,
      message: "Successfully joined workshop",
      workshop,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Leave workshop
export const leaveWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id)

    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found" })
    }

    // Check if user is a participant
    if (!workshop.participants.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: "You are not a participant" })
    }

    workshop.participants = workshop.participants.filter((participant) => participant.toString() !== req.user.id)
    await workshop.save()

    // Remove workshop from user's joined workshops
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { joinedWorkshops: workshop._id },
    })

    res.status(200).json({
      success: true,
      message: "Successfully left workshop",
      workshop,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
