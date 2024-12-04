import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid2,
} from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  itemName: Yup.string().required("Item name is required"),
  description: Yup.string().required("Description is required"),
  files: Yup.array().min(1, "Please upload at least one file"),
});

const FormComponent = () => {
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
        name: "",
        phoneNumber: "",
        itemName: "",
        description: "",
        files: [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form submitted", values);
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form>
          <Box>
            <Field
              name="name"
              label="Name"
              component={TextField}
              fullWidth
              margin="normal"
              variant="outlined"
              helperText={touched.name && errors.name}
              error={touched.name && Boolean(errors.name)}
            />
            <Field
              name="phoneNumber"
              label="Phone Number"
              component={TextField}
              fullWidth
              margin="normal"
              variant="outlined"
              helperText={touched.phoneNumber && errors.phoneNumber}
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            />
            <Field
              name="itemName"
              label="Item Name"
              component={TextField}
              fullWidth
              margin="normal"
              variant="outlined"
              helperText={touched.itemName && errors.itemName}
              error={touched.itemName && Boolean(errors.itemName)}
            />
            <Field
              name="description"
              label="Description"
              component={TextField}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              helperText={touched.description && errors.description}
              error={touched.description && Boolean(errors.description)}
            />

            <Box>
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
                <Grid2 container spacing={2} mt={2}>
                  {images.map((image, index) => (
                    <Grid2 item xs={4} key={index} position="relative">
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
                    </Grid2>
                  ))}
                </Grid2>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
