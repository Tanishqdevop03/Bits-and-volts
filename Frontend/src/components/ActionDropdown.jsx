import {useNavigate} from 'react-router-dom'
import { deleteUser } from '../api/UserApi'
import { useState, useEffect, useRef } from 'react'

const ActionDropdown = ({userId, refresh}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    await deleteUser(userId);
    refresh();
    setIsOpen(false);
  };  
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="text-xl px-2">⋮</button>

      {isOpen && (
        <div className="absolute bg-white shadow-lg border rounded right-0 w-32 z-50 mt-1">
          <button onClick={() => navigate(`/view/${userId}`)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t">
            View
          </button>
          <button onClick={() => navigate(`/edit/${userId}`)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Edit
          </button>
          <button onClick={handleDelete}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-b">
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default ActionDropdown