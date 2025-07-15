const axios = require("axios");
const crypto = require("crypto");
const User = require("../models/User.Model");
const sendEmail = require("../middleware/EmailVerify");

// This comes from a form data
const registerUser = async (req, res) => {
  try {
    const { name, contact, budget } = req.body;
    if (!name || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = new User({ name, contact });
    await sendEmail(
  process.env.EMAIL_USER,
  "📥 New Property Lead Received",
  `You have a new potential customer inquiry:\n\n👤 Name: ${name}\n📞 Contact: ${contact}\n💰 Budget: ₹${budget || "Not provided"}\n\nPlease reach out to assist them with available plots.`
);
    await user.save();

    // Send Lead event to Meta Conversions API
    try {
      const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
      const PIXEL_ID = process.env.META_PIXEL_ID;
      const META_API_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

      const hash = (value) =>
        crypto.createHash("sha256").update(value).digest("hex");

      const eventData = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: req.headers.referer || "https://your-site.com",
            user_data: {
              em: [hash(`${contact}@placeholder.com`)],
              ph: [hash(contact)],
              fn: [hash(name.split(" ")[0])],
              ln: [hash(name.split(" ")[1] || "")],
              client_user_agent: req.headers["user-agent"]
            },
            custom_data: {
              content_name: "Property Lead",
              content_category: "Real Estate"
            }
          }
        ],
        
        
      };

      await axios.post(
        `${META_API_URL}?access_token=${ACCESS_TOKEN}`,
        eventData
      );
    } catch (metaErr) {
      console.error("Meta CAPI Lead event failed:", metaErr.response?.data || metaErr.message);
    }

    res.json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const markPreferredPlot = async (req, res) => {
  try {
    const { userId, plotId } = req.body;

    if (!userId || !plotId) {
      return res.status(400).json({ message: "userId and plotId are required" });
    }

    const updated = await User.findByIdAndUpdate(userId, {
      $addToSet: { preferredPlots: plotId }
    }, { new: true });

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Plot added to user preferences", user: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update preference." });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user." });
  }
};

module.exports = {
  registerUser,
    markPreferredPlot,
    getUser
};
