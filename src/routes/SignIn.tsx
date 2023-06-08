import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
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
      "https://www.pre-onboarding-selection-task.shop/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const token = await response.json();

    if (token.access_token) {
      localStorage.setItem("accessToken", token.access_token);
      navigate("/todo");
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
        <button disabled data-testid="signin-button">
          로그인
        </button>
      ) : (
        <button data-testid="signin-button">로그인</button>
      )}
    </form>
  );
};
export default SignIn;
