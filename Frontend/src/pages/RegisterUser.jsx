import {useForm} from 'react-hook-form'
import { createUser } from '../api/UserApi'
import { useNavigate } from 'react-router-dom'

const RegisterUser = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'profileImage' && data[key][0]) {
        formData.append(key, data[key][0]);
      } else if (key !== 'profileImage') {
        formData.append(key, data[key]);
      }
    });
    await createUser(formData);
    navigate("/");
  };  
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6 p-6">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Register Your Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">

        <input {...register("firstName", { required: "First name is required" })} placeholder="Enter First Name"
          className="border p-2 rounded" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        <input {...register("lastName", { required: "Last name is required" })} placeholder="Enter Last Name"
          className="border p-2 rounded" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

        <input {...register("email", { required: "Email is required" })} placeholder="Enter Email"
          className="border p-2 rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("phone", { required: "Phone is required" })} placeholder="Enter Mobile"
          className="border p-2 rounded" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        {/* Gender */}
        <div>
          <p className="mb-1 text-sm font-medium">Select Your Gender</p>
          <div className="flex gap-4">
            <label>
              <input type="radio" value="Male" {...register("gender", { required: "Gender is required" })} /> Male
            </label>
            <label>
              <input type="radio" value="Female" {...register("gender", { required: "Gender is required" })} /> Female
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>
        {/* Age */}
        <div>
          <input {...register("age", { required: "Age is required" })} placeholder="Enter Your Age"
            className="border p-2 rounded" />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        {/* Status */}
        <div>
          <p className="mb-1 text-sm font-medium">Select Your Status</p>
          <select {...register("status", { required: "Status is required" })} className="border p-2 rounded w-full">
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        {/* Profile Upload */}
        <div>
          <p className="mb-1 text-sm font-medium">Select Your Profile</p>
          <input {...register("profileImage")} type="file" accept="image/*" className="border p-2 rounded w-full" />
        </div>

        {/* Location */}
        <div>
          <input {...register("location", { required: "Location is required" })} placeholder="Enter Your Location"
            className="border p-2 rounded" />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div className="md:col-span-2">
          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default RegisterUser