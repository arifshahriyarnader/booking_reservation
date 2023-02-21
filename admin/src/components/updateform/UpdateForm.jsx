import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const UpdateForm = ({ data, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
       const response = await axios.post(`/payments/update/${data._id}`,formData)
       console.log(response)
    } catch (error) {
        
    }
  };
  return (
    <div
      className="col-md-10 bg-light p-5 "
      style={{ width: "98%", margin: "0 auto !important" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "auto" }}>
        <div className="form-group">
          <label className="mb-2 ">
            {" "}
            <strong>First Name </strong>{" "}
          </label>
          <input
            className="form-control"
            defaultValue={data.firstName}
            {...register("firstName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <br />
        <div className="form-group">
          <label className="mb-2 ">
            {" "}
            <strong>Last Name </strong>{" "}
          </label>
          <input
            className="form-control"
            defaultValue={data.lastName}
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <br />
        <div className="form-group">
          <label className="mb-2 ">
            {" "}
            <strong> Email </strong>
          </label>
          <input
            className="form-control"
            defaultValue={data.email}
            {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
          ></input>
          {errors.email && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <br />
        <div className="form-group">
          <label className="mb-2 ">
            {" "}
            <strong> Phone </strong>
          </label>
          <input
            className="form-control"
            defaultValue={data.contact}
            {...register("contact", { required: true })}
          ></input>
          {errors.contact && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <br />
        <div className="form-group">
          <label className="mb-2 ">
            {" "}
            <strong> Adult </strong>
          </label>
          <input
            className="form-control"
            defaultValue={data.adult}
            {...register("adult", { required: true })}
          ></input>
          {errors.adult && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <br />
        <div className="form-group">
          <label className="mb-2 ">
            {" "}
            <strong>Child</strong>
          </label>
          <input
            className="form-control"
            defaultValue={data.children}
            {...register("children", { required: true})}
          ></input>
          {errors.children && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <br />
        <div className="form-group">
          <label className="mb-2 ">
            {" "}
            <strong> Address </strong>
          </label>
          <input
            className="form-control"
            defaultValue={data.billingAddress}
            {...register("billingAddress", { required: true })}
          ></input>
          {errors.billingAddress && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <br />
        <br />
        <input type="submit" className="btn btn-dark" value="Submit" />
      </form>
    </div>
  );
};

export default UpdateForm;
