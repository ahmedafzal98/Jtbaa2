import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";
import { MyContext } from "../../context/Context";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  itemName: Yup.string().required("Item name is required"),
});

const FormComponent = ({ data, onChange, errors }) => {
  const { summaryData, setSummaryData } = useContext(MyContext);

  console.log(summaryData);

  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Formik
      initialValues={{
        name: data.name,
        phoneNumber: data.phoneNumber,
        itemName: "",
        description: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
      })}
    >
      {({ values, errors, touched, handleChange }) => {
        // Log values whenever they change
        useEffect(() => {
          setSummaryData(values);
        }, [values, setSummaryData]);

        return (
          <Form style={{ width: "90%" }}>
            <Box>
              <Field
                name="name"
                as={TextField}
                label="Name *"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                  onChange("name", e.target.value); // Call custom handler if needed
                }}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                name="phoneNumber"
                as={TextField}
                label="Phone Number *"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                  onChange("phoneNumber", e.target.value); // Call custom handler if needed
                }}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <Field
                name="itemName"
                as={TextField}
                label="Item Name"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                  console.log("Updated Item Name:", e.target.value); // Log the field's value directly if needed
                }}
              />
              <Field
                name="description"
                as={TextField}
                label="Description"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                onChange={(e) => {
                  handleChange(e);
                  console.log("Updated Description:", e.target.value); // Log the field's value directly if needed
                }}
              />

              <Box mt={2}>
                <Button variant="contained" component="label">
                  Upload Images
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
                {images.length > 0 && (
                  <Grid container spacing={2} mt={2}>
                    {images.map((image, index) => (
                      <Grid item xs={4} key={index}>
                        <Box position="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: 8,
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => handleRemoveImage(index)}
                            style={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              color: "white",
                            }}
                          >
                            <DeleteOutlineRounded />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormComponent;
