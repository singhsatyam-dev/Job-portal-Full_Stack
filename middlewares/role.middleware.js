export const isRecruiter = (req, res, next) => {

  try {

    if (req.user.role !== "recruiter") {

      return res.status(403).json({
        success: false,
        message: "Access denied. Recruiter only.",
      });

    }

    next();

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Authorization failed",
    });

  }

};