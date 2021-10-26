import { object, string } from "yup";

export const createMerchantSchema = object({
  body: object({
    Account_Number: string().required('Account_Number is required'),
    IBAN: string().required('IBAN is required'),
    Bank_Name: string().required('Bank_Name is required'),
    passwordConfirmation: string().required("passwordConfirmation is required").test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    }),
    password: string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    email: string()
      .email("Must be a valid email")
      .required("email is required"),
    name: string().required("name is required"),
  }),
});
