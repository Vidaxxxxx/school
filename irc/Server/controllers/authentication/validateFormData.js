const Yup = require("yup");

const formSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username required.")
    .min("4", "Username must be at least 4 characters.")
    .max("32", "Username must be less than 32 characters."),
  password: Yup.string()
    .required("Password required.")
    .min("8", "Password must be at least 8 characters")
    .max("32", "Password must be less than 32 characters"),
});

async function validateFormData(req, res, next) {
  const formData = req.body;

  try {
    await formSchema.validate(formData);
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: "Invalid form data." });
    return;
  }

  next();
}

module.exports = validateFormData;
