import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/todo");
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
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
    <div className="relative rounded-lg mt-[100px] mx-auto w-[50vw]   h-[40vh] bg-blue-500">
      <h1 className="hover:text-pink-400 text-white text-center font-bold text-4xl pt-5">
        <Link to="/"> TODO STORY</Link>
      </h1>
      <form
        className="mt-[50px] flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="w-[70%] flex flex-col space-y-3">
          <input
            className=" p-2 placeholder:italic border border-blue-500 rounded-md"
            name="email"
            placeholder="이메일"
            data-testid="email-input"
            onChange={handleChange}
          />
          <input
            className=" p-2 placeholder:italic border border-blue-500 rounded-md"
            name="password"
            placeholder="비밀번호"
            data-testid="password-input"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 italic text-teal-500">
          회원이 아니에요👉
          <span className="pl-2 hover:text-yellow-200">
            <Link to="/signup">회원가입 하러 가기</Link>
          </span>
        </div>
        <button
          className="text-white absolute bottom-[60px] text-xl font-bold hover:text-yellow-200"
          data-testid="signin-button"
        >
          로그인
        </button>
      </form>
    </div>
  );
};
export default SignIn;
