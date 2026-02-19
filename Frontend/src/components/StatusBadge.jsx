import React from 'react'

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 text-white rounded text-sm ${
        status === "Active" ? "bg-red-500" : "bg-gray-500"
      }`}
    >
      {status}
    </span>
  )
}

export default StatusBadge