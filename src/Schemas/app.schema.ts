
import { object, string } from "yup";


export const AppDetailsSchema = object({
    body: object({
        redirectUrl: string()
            .matches(
                /(http(s)?:\/\/)(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
            )
            .required('redirectUrl is required'),
        name: string().required("name is required"),
    }),
});


