import * as yup from "yup";

const editValidations = yup.object().shape({
    title: yup
        .string()
        .required(),
    description: yup
        .string()
        .min(5)
        .required(),
    price: yup
        .number()
        .required()
        .positive(),
    // photos: yup.array(
    //     yup.string()
    //         .url()
    //         .nullable(),
    // )
});

export default editValidations;
