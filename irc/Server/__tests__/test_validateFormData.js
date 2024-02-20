jest.mock("yup", () => ({
  object: () => ({
    shape: () => ({
      validate: jest.fn().mockResolvedValue({}),
    }),
  }),
}));

const validateFormData = require("../controllers/validateFormData");

test("valid form data", () => {
  const req = {
    body: {
      username: "username94",
      password: "password94",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };
  validateFormData(req, res);
});

test("invalid form data", () => {
  const req = {
    body: {
      username: "u",
      password: "p",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  validateFormData(req, res);
});
