import * as yup from "yup";

const validations = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address.")
        .required(),
    password: yup
        .string()
        .min(6, 'Your password must be at least 6 characters.')
        .required(),
});

export default validations;
