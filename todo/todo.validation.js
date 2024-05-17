import * as Yup from "yup"
import dayjs from "dayjs";

const currentDate= dayjs();
export const todoValidationSchema=Yup.object({
    title:Yup.string().max(20,"Title must be at max 20 characters").trim().required("Title is required"),
    // description:Yup.string().required("Description is required.".trim().max(57,"Description must be at most 57 characters")),
    description:Yup.string().max(57,"Description must be at most 57 characters").trim().required("Description is required."),
    date:Yup.date().min(currentDate,"Date cannot be past").required("Date is Required"),
})
export const getTodoListValidation=Yup.object({
    page:Yup.number().min(1,"page must be at least 1").integer("page must be integer").default(1),
    limit:Yup.number().min(1,"Limit must be at least 1").integer("Limit must be integer").default(1)
})