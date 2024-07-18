const yup = require("yup");

const userValidationSchema = yup.object().shape({
    firstName: yup
        .string("First name must be a string")
        .min(2, "First name must have at least 2 characters")
        .max(100, "First name must have at most 100 characters")
        .required("First name is required")
        .matches(/^[a-zA-Z]+$/, "First name must contain alphabets only"),

    lastName : yup
        .string("Last name must be a string")
        .min(2, "Last name must have at least 2 characters")
        .max(100, "Last name must have at most 100 characters")
        .required("Last name is required")
        .matches(/^[a-zA-Z]+$/, "Last name must contain alphabets only"),

    Email: yup
        .string("Email must be a string")
        .email("Email address must be valid")
        .required("Email is required"),

    Password: yup
        .string("Password must be a string")
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric")
});

module.exports = userValidationSchema;