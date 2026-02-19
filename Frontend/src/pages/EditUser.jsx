import {useForm} from 'react-hook-form'
import { getUser, updateUser } from '../api/UserApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(id);
      reset(res.data.data);
    };
    fetchUser();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'profileImage' && data[key][0]) {
        formData.append(key, data[key][0]);
      } else if (key !== 'profileImage') {
        formData.append(key, data[key]);
      }
    });
    await updateUser(id, formData);
    navigate("/");
  };  
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6 p-6">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Edit User Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">

        <input {...register("firstName")} placeholder="Enter First Name"
          className="border p-2 rounded" />

        <input {...register("lastName")} placeholder="Enter Last Name"
          className="border p-2 rounded" />

        <input {...register("email")} placeholder="Enter Email"
          className="border p-2 rounded" />

        <input {...register("phone")} placeholder="Enter Mobile"
          className="border p-2 rounded" />

        {/* Gender */}
        <div>
          <p className="mb-1 text-sm font-medium">Select Your Gender</p>
          <div className="flex gap-4">
            <label>
              <input type="radio" value="Male" {...register("gender")} /> Male
            </label>
            <label>
              <input type="radio" value="Female" {...register("gender")} /> Female
            </label>
          </div>
        </div>
        {/* Age */}
        <input {...register("age")} placeholder="Enter Your Age"
          className="border p-2 rounded" />

        {/* Status */}
        <div>
          <p className="mb-1 text-sm font-medium">Select Your Status</p>
          <select {...register("status")} className="border p-2 rounded w-full">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Profile Upload */}
        <div>
          <p className="mb-1 text-sm font-medium">Select Your Profile</p>
          <input {...register("profileImage")} type="file" accept="image/*" className="border p-2 rounded w-full" />
        </div>

        {/* Location */}
        <input {...register("location")} placeholder="Enter Your Location"
          className="border p-2 rounded" />

        <div className="md:col-span-2">
          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Update
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditUser
