import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edisabled, setEdisabled] = useState(true);
  const [pdisabled, setPdisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/todo");
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      if (value.includes("@")) {
        setEmail(value);
        setEdisabled(false);
      } else {
        setEdisabled(true);
      }
    } else if (name === "password") {
      if (value.length >= 8) {
        setPassword(value);
        setPdisabled(false);
      } else {
        setPdisabled(true);
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      "https://www.pre-onboarding-selection-task.shop/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    // 회원가입시 로그인 페이지로 이동
    if (response.status === 201) {
      navigate("/signin");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" data-testid="email-input" onChange={handleChange} />
      <input
        name="password"
        data-testid="password-input"
        onChange={handleChange}
      />
      {edisabled || pdisabled ? (
        <button disabled data-testid="signup-button">
          회원가입
        </button>
      ) : (
        <button data-testid="signup-button">회원가입</button>
      )}
    </form>
  );
};
export default SignUp;
