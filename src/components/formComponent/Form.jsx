import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  itemName: Yup.string().required("Item name is required"),
  description: Yup.string().required("Description is required"),
  files: Yup.array()
    .min(1, "Please upload at least one file")
    .required("Files are required"),
});

const FormComponent = () => {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFileList((prev) => [...prev, ...files]); // Append files
    setFieldValue("files", [...fileList, ...files]); // Update Formik field
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
            {/* Name Field */}
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

            {/* Phone Number Field */}
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

            {/* Item Name Field */}
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

            {/* Description Field */}
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

            {/* File Upload Field */}
            <Box marginTop={2}>
              <Typography variant="h6">Upload Files</Typography>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, setFieldValue)}
                accept="image/*, application/pdf, .docx"
              />
              {fileList.length > 0 && (
                <Box marginTop={1}>
                  <Typography variant="body2">Uploaded :</Typography>
                  <ul>
                    {fileList.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </Box>
              )}
              {touched.files && errors.files && (
                <Typography color="error">{errors.files}</Typography>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
