import User from "../models/User.js";

export const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.profilePicture = req.file.path;

    await user.save();

    res.json({
      message: "Profile picture uploaded",
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const uploadIDPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.idPhoto = req.file.path;

    await user.save();

    res.json({
      message: "ID photo uploaded",
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadCV = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.cvFile = req.file.path;

    await user.save();

    res.json({
      message: "CV uploaded",
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadCertificate = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.certifications.push(req.file.path);

    await user.save();

    res.json({
      message: "Certificate uploaded",
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.portfolioFiles.push(req.file.path);

    await user.save();

    res.json({
      message: "Portfolio uploaded",
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
