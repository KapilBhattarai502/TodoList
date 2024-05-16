import * as Yup from "yup"

export const registerUserValidationSchema=Yup.object({
    firstName:Yup.string().max(55,"first name must be at max 55 characters").trim().required("first name is required"),
    lastName:Yup.string().max(20,"last name must be at max 55 characters").trim().required("last name is required"),
    email:Yup.string().trim().required("Email is required").max(60,"Email must be at most 60 characters").lowercase().email(),
    password:Yup.string().min(4,"Password must be at max 4 characters ").max(16,"Password must be at max 16 characters").required(),
    gender:Yup.string().oneOf(["male","female","preferNotToSay"]).nullable().trim().lowercase(),
    // description:Yup.string().required("Description is required.".trim().max(57,"Description must be at most 57 characters")),
  


})
export const emailValidationSchema=Yup.string().email("Must be a valid email").trim().lowercase();