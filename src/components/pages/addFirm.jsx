/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Camera } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { RiImage2Line } from "react-icons/ri";

import {
  Button,
  Card,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";

// Define the Yup validation schema
// Update the Yup schema with a file validation (optional)
const firmSchema = Yup.object().shape({
  name: Yup.string().required("Firm Name is required"),
  phone: Yup.string().required("Firm Phone Number is required"),
  address: Yup.string().required("Firm Address is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  registration: Yup.string().required("Firm Registration is required"),
});

const adminSchema = Yup.object().shape({
  firstname: Yup.string().required("Admin Firstname is required"),
  lastname: Yup.string().required("Admin Last Name is required"),
  address: Yup.string().required("Firm Address is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  contact: Yup.string().required("Contact is required"),
});

const combinedSchema = Yup.object().shape({
  firm: firmSchema,
  admin: adminSchema,
})

const AddFirm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminSchema),
  });


  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      setFileLoading(true);
      setImageUrl(URL.createObjectURL(selectedFile));
      setFileLoading(false);
      setFileLoading(false);
    }
  };

  // useEffect(() => {
  //   if (rowData) {
  //     setValue("name", rowData?.name || "");
  //     setValue("phone", rowData?.phone || "");
  //     setValue("address", rowData?.address || "");
  //     setValue("registration", rowData?.registration || "");
  //     setValue("email", rowData?.email || "");
  //   }
  // }, [rowData]);

  const onSubmit = (data) => {
    // Assuming data has both firm and admin
    console.log(data)
    reset()
    reset()
  };


  // const onSubmit = async (data) => {
  //   // setIsLoading(true);
  //   console.log(data);
  //   if (data) {
  //     //   await axiosInstance
  //     //     .put(`vet/edit/${rowData?._id}`, data)
  //     //     .then((result) => {
  //     //       if (result.data.success) {
  //     //         reset();
  //     //         getVet();
  //     //         setOpen(false);
  //     //         toast.success(result.data.message);
  //     //       }
  //     //     })
  //     //     .catch((err) => {
  //     //       handleError(err);
  //     //     })
  //     //     .finally(() => {
  //     //       setIsLoading(false);
  //     //     });
  //     console.log(data);
  //   } else {
  //     // await axiosInstance.post('vet/create', data)
  //     //     .then((result) => {
  //     //         if (result.data.success) {
  //     //             reset()
  //     //             toast.success(result.data.message)
  //     //         }
  //     //     }).catch((err) => {
  //     //         handleError(err)
  //     //     }).finally(() => {
  //     //         setIsLoading(false)
  //     //     })
  //     console.error("error");
  //   }
  // };
  return (
    <>
      <main className="min-h-screen poppins_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container className="px-2 px-md-5 py-4 bg_white my-3 border rounded-lg border-white w-full">
          <h4 className="poppins_medium mb-4" style={{ color: "#151D48" }}>
            Add Firm
          </h4>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-2 w-100"
          >
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap md:items-center justify-between">
              <button type="button" className="w-full mb-3">
                <label
                  htmlFor={`fileInput1`}
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer w-full"
                >
                  {fileLoading ? (
                    <div
                      style={{ height: "100px" }}
                      className="w-full border rounded-4 bg_light text_primary d-flex justify-content-center align-items-center"
                    >
                      <CircularProgress size={16} />
                    </div>
                  ) : (
                    <div className="rounded-4 w-full text_black relative sm:flex gap-3 justify-start items-center">
                      <span className="poppins_regular">Logo Of Firm</span>
                      <div className="img-area  border border-dashed">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Preview"
                            style={{
                              height: "100px",
                              minWidth: "250px",
                              objectFit: "cover",
                            }}
                            className="rounded-4 sm:w-full w-[100%] bg_light object-cover"
                          />
                        ) : (
                          <>
                            <span>
                              <RiImage2Line size={"18px"} />
                            </span>
                            <span>Click to replace or drag and drop</span>
                            <span>SVG, PNG, JPG or GIF (max. 400 x 400px)</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </label>
                <Input
                  type="file"
                  id={`fileInput1`}
                  accept="image/*"
                  className="visually-hidden"
                  onChange={handleFileChange}
                />
              </button>
              <div className="w-100 mb-3">
                <Label className="form-label" for="firmName">
                  Name of Firm
                </Label>
                <Controller
                  id="firmName"
                  name="firmName"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Name"
                      invalid={errors.firmName && true}
                    />
                  )}
                />
                {errors.firmName && (
                  <FormFeedback>{errors.firmName.message}</FormFeedback>
                )}
              </div>
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
              <div className="w-100 mb-3">
                <Label className="form-label" for="firmEmail">
                  Email
                </Label>
                <Controller
                  id="firmEmail"
                  name="firmEmail"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Email"
                      invalid={errors.firmEmail && true}
                    />
                  )}
                />
                {errors.firmEmail && (
                  <FormFeedback>{errors.firmEmail.message}</FormFeedback>
                )}
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="firmPhone">
                  Phone Number
                </Label>
                <Controller
                  id="firmPhone"
                  name="firmPhone"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Phone Number"
                      invalid={errors.firmPhone && true}
                    />
                  )}
                />
                {errors.firmPhone && (
                  <FormFeedback>{errors.firmPhone.message}</FormFeedback>
                )}
              </div>
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
              <div className="w-100 mb-3">
                <Label className="form-label" for="firmAddress">
                  Address
                </Label>
                <Controller
                  id="firmAddress"
                  name="firmAddress"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Address"
                      invalid={errors.firmAddress && true}
                    />
                  )}
                />
                {errors.firmAddress && (
                  <FormFeedback>{errors.firmAddress.message}</FormFeedback>
                )}
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="firmRegistration">
                  Form Registration
                </Label>
                <Controller
                  id="firmRegistration"
                  name="firmRegistration"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Registration"
                      invalid={errors.firmRegistration && true}
                    />
                  )}
                />
                {errors.firmRegistration && (
                  <FormFeedback>{errors.firmRegistration.message}</FormFeedback>
                )}
              </div>
            </div>

            <div className="d-flex col-12 col-md-6 text-sm gap-5 flex-wrap flex-md-nowrap align-items-center justify-content-between">
              <div className="w-100">
                <Label className="form-label" for="firmCategory">
                  Category
                </Label>
                <Controller
                  id="firmCategory"
                  name="firmCategory"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="text-sm"
                      type="select"
                      {...field}
                      invalid={errors.firmCategory && true}
                    >
                      <option className="text-sm" value="">
                        Select Category
                      </option>
                      <option className="text-sm" value="Retail">
                        Retail
                      </option>
                      <option className="text-sm" value="Finance">
                        Finance
                      </option>
                      <option className="text-sm" value="Healthcare">
                        Healthcare
                      </option>
                      <option className="text-sm" value="Technology">
                        Technology
                      </option>
                    </Input>
                  )}
                />
                {errors.firmCategory && (
                  <FormFeedback>{errors.firmCategory.message}</FormFeedback>
                )}
              </div>
            </div>

            <div>
              
            </div>
          </Form>
        </Container>
        <Container className="px-2 px-md-5 py-4 bg_white my-3 border rounded-lg border-white w-full">
          <h4 className="poppins_medium mb-4" style={{ color: "#151D48" }}>
            Add Admin
          </h4>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-2 w-100"
          >
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap md:items-center justify-between">
              <button type="button" className="w-full mb-3">
                <label
                  htmlFor={`fileInput1`}
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer w-full"
                >
                  {fileLoading ? (
                    <div
                      style={{ height: "100px" }}
                      className="w-full border rounded-4 bg_light text_primary d-flex justify-content-center align-items-center"
                    >
                      <CircularProgress size={16} />
                    </div>
                  ) : (
                    <div className="rounded-4 w-full text_black relative sm:flex gap-3 justify-start items-center">
                      <span className="poppins_regular">Profile Image</span>
                      <div className="img-area  border border-dashed">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Preview"
                            style={{
                              height: "100px",
                              minWidth: "250px",
                              objectFit: "cover",
                            }}
                            className="rounded-4 sm:w-full w-[100%] bg_light object-cover"
                          />
                        ) : (
                          <>
                            <span>
                              <RiImage2Line size={"18px"} />
                            </span>
                            <span>Click to replace or drag and drop</span>
                            <span>SVG, PNG, JPG or GIF (max. 400 x 400px)</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </label>
                <Input
                  type="file"
                  id={`fileInput1`}
                  accept="image/*"
                  className="visually-hidden"
                  onChange={handleFileChange}
                />
              </button>
              <div className="w-100 mb-3">
                <Label className="form-label" for="firstname">
                  First Name
                </Label>
                <Controller
                  id="firstname"
                  name="firstname"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter First Name"
                      invalid={errors.firstname && true}
                    />
                  )}
                />
                {errors.firstname && (
                  <FormFeedback>{errors.firstname.message}</FormFeedback>
                )}
              </div>
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
              <div className="w-100 mb-3">
                <Label className="form-label" for="contact">
                  Contact
                </Label>
                <Controller
                  id="contact"
                  name="contact"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Contact"
                      invalid={errors.contact && true}
                    />
                  )}
                />
                {errors.contact && (
                  <FormFeedback>{errors.contact.message}</FormFeedback>
                )}
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="lastname">
                  Last Name
                </Label>
                <Controller
                  id="lastname"
                  name="lastname"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Last Name"
                      invalid={errors.lastname && true}
                    />
                  )}
                />
                {errors.lastname && (
                  <FormFeedback>{errors.lastname.message}</FormFeedback>
                )}
              </div>
            </div>
            <div className="d-flex w-100 gap-x-5 flex-wrap flex-md-nowrap align-items-center justify-between">
              <div className="w-100 mb-3">
                <Label className="form-label" for="address">
                  Address
                </Label>
                <Controller
                  id="address"
                  name="address"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Address"
                      invalid={errors.address && true}
                    />
                  )}
                />
                {errors.address && (
                  <FormFeedback>{errors.address.message}</FormFeedback>
                )}
              </div>
              <div className="w-100 mb-3">
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  id="email"
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Email"
                      invalid={errors.email && true}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 text-center"
                color="primary"
              >
                {/* {isLoading ? (
                  <Spinner size={"sm"} />
                ) : rowData ? (
                  "Update"
                ) : ( */}
                Submit
                {/* )} */}
              </Button>
            </div>
          </Form>
        </Container>
      </main>
    </>
  );
};
export default AddFirm;
