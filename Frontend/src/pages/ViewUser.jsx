import { useEffect, useState } from "react"
import { getUser } from "../api/UserApi"
import { useNavigate, useParams } from "react-router-dom"
import StatusBadge from "../components/StatusBadge"

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(id).then((res) => setUser(res.data.data));
  }, [id]);
  
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">User Details</h2>
        <button 
          onClick={() => navigate("/")} 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to List
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "https://i.pravatar.cc/150"}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-gray-200 shadow-lg"
          />
          <div className="mt-4">
            <StatusBadge status={user.status} />
          </div>
        </div>

        {/* User Information */}
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Full Name</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </p>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Email Address</p>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>

          {/* Phone */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
            <p className="text-lg font-semibold text-gray-800">{user.phone}</p>
          </div>

          {/* Age */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Age</p>
            <p className="text-lg font-semibold text-gray-800">{user.age} years</p>
          </div>

          {/* Gender */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Gender</p>
            <p className="text-lg font-semibold text-gray-800">{user.gender}</p>
          </div>

          {/* Location */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Location</p>
            <p className="text-lg font-semibold text-gray-800">{user.location}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 justify-end">
        <button 
          onClick={() => navigate(`/edit/${id}`)} 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Edit User
        </button>
      </div>
    </div>
  )
}

export default ViewUser