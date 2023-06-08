import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ToDo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) navigate("/signin");
  }, []);
  return <div>todo</div>;
};

export default ToDo;
