import { useEffect, useState } from "react"
import { getUsers, exportCSV } from "../api/UserApi"
import StatusBadge from "../components/StatusBadge"
import ActionDropdown from "../components/ActionDropdown"
import { useNavigate } from "react-router-dom"


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await getUsers({ page, limit: 5, search });
    setUsers(res.data.data);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);
  
  return (
    <div className="max-w-6xl mx-auto mt-6">
      {/* Top Bar - Outside table */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="border p-2 rounded w-full md:w-1/3"
        />
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/add")}
            className="bg-red-500 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base flex-1 md:flex-none"
          >
            + Add User
          </button>
          <button onClick={exportCSV} className="bg-red-500 text-white px-3 md:px-4 py-2 rounded text-sm md:text-base flex-1 md:flex-none">
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Status</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border-t hover:bg-gray-50">
                <td className="p-4">{user.firstName} {user.lastName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.gender}</td>
                <td className="p-4"><StatusBadge status={user.status} /></td>
                <td className="p-4">
                  <img
                    src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "https://i.pravatar.cc/40"}
                    className="rounded-full mx-auto w-10 h-10"
                  />
                </td>
                <td className="p-4 relative">
                  <ActionDropdown userId={user._id} refresh={fetchUsers} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {[...Array(Math.ceil(total / 5))].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-red-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className="border rounded-lg p-4 shadow">
            <div className="flex items-start gap-4">
              <img
                src={user.profileImage ? `http://localhost:5000${user.profileImage}` : "https://i.pravatar.cc/60"}
                className="rounded-full w-16 h-16"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="flex gap-2 mt-2 items-center">
                  <span className="text-sm text-gray-500">{user.gender}</span>
                  <StatusBadge status={user.status} />
                </div>
              </div>
              <ActionDropdown userId={user._id} refresh={fetchUsers} />
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center gap-2 mt-4">
              {[...Array(Math.ceil(total / 5))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    page === i + 1 ? "bg-red-500 text-white" : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
      </div>

      </div>
    </div>
  )
}

export default UserList