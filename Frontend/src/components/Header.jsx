import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate();
  return (
    <div 
     onClick={() => navigate("/")} 
     className="bg-gray-900 text-white text-center py-3 text-sm font-semibold cursor-pointer
    ">MERN stack developer practical task</div>
  )
}

export default Header