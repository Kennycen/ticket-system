import React from 'react'

export default function StatusBadge({ status }) {
  const getStatusColor = () => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "in progress":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
