import { Box, Button, TextField, useTheme, Alert } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { tokens } from "../theme";
import Header from "../component/Header";
import { supabase } from "../supabase/Client";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  address1: string;
  city: string;
  zipCode: string;
  country: string;
  age: string;
};

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  address1: "",
  city: "",
  zipCode: "",
  country: "",
  age: "",
};

const phoneResExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  contactNumber: Yup.string()
    .matches(phoneResExp, "Phone number is not valid")
    .required("Required"),
  address1: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  zipCode: Yup.string().required("Required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(1, "Age must be positive")
    .required("Required"),
});

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmitClick = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setSuccessMsg(null);
    setErrorMsg(null);

    const { error } = await supabase.from("contacts").insert({
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.contactNumber,
      address: `${values.address1}`,
      city: `${values.city}`,
      zip_code: values.zipCode,
      country: values.country,
      age: Number(values.age),
    });

    if (error) {
      console.log(error);
      setErrorMsg(
        "An error occurred while adding the customer: " + error.message
      );
      return;
    }

    setSuccessMsg("Customer added successfully ✅");
    resetForm();
  };

  return (
    <Box>
      <Box className="px-3">
        <Header title={"CREATE USER"} subtitle={"Create a New User Profile"} />
      </Box>

      {successMsg && (
        <Box className="px-3" sx={{ mb: 2 }}>
          <Alert severity="success">{successMsg}</Alert>
        </Box>
      )}
      {errorMsg && (
        <Box className="px-3" sx={{ mb: 2 }}>
          <Alert severity="error">{errorMsg}</Alert>
        </Box>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmitClick}
      >
        {({
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto"
            style={{ width: "98%" }}
          >
            <TextField
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="firstName"
              error={!!errors.firstName && !!touched.firstName}
              helperText={touched.firstName && errors.firstName}
              placeholder="firstName"
            />
            <TextField
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="lastName"
              error={!!errors.lastName && !!touched.lastName}
              helperText={touched.lastName && errors.lastName}
              placeholder="lastName"
            />
            <TextField
              className="md:col-span-2"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              error={!!errors.email && !!touched.email}
              helperText={touched.email && errors.email}
              placeholder="email"
            />
            <TextField
              className="md:col-span-2"
              value={values.contactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              name="contactNumber"
              error={!!errors.contactNumber && !!touched.contactNumber}
              helperText={touched.contactNumber && errors.contactNumber}
              placeholder="contactNumber"
            />
            <TextField
              className="md:col-span-2"
              value={values.address1}
              onChange={handleChange}
              onBlur={handleBlur}
              name="address1"
              error={!!errors.address1 && !!touched.address1}
              helperText={touched.address1 && errors.address1}
              placeholder="address1"
            />
            <TextField
              className="md:col-span-2"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              name="city"
              error={!!errors.city && !!touched.city}
              helperText={touched.city && errors.city}
              placeholder="city"
            />
            <TextField
              className="md:col-span-2"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              name="country"
              error={!!errors.country && !!touched.country}
              helperText={touched.country && errors.country}
              placeholder="country"
            />
            <TextField
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              name="zipCode"
              error={!!errors.zipCode && !!touched.zipCode}
              helperText={touched.zipCode && errors.zipCode}
              placeholder="zipCode"
            />
            <TextField
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              name="age"
              type="number"
              error={!!errors.age && !!touched.age}
              helperText={touched.age && errors.age}
              placeholder="age"
            />
            <Box className="md:col-span-2 flex justify-end mt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                sx={{ background: colors.greenAccent[500] }}
              >
                {isSubmitting ? "Adding..." : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
