
import { object, string } from "yup";


export const MerchantLoginSchema = object({
    body: object({
        password: string().required("Password is required").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        email: string().email("Must be a valid email").required("Email is required"),
    }),
});


