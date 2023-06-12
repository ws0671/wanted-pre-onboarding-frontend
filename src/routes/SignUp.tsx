import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edisabled, setEdisabled] = useState(true);
  const [pdisabled, setPdisabled] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
        setEmailError("");
      } else {
        setEmailError("@를 포함하세요");
        setEdisabled(true);
      }
    } else if (name === "password") {
      if (value.length >= 8) {
        setPassword(value);
        setPdisabled(false);
        setPasswordError("");
      } else {
        setPdisabled(true);
        setPasswordError("8자리이상 입력하세요");
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
    <div className="relative rounded-lg mt-[100px] mx-auto w-[500px]   h-[350px] bg-blue-500">
      <h1 className="hover:text-pink-400 text-white text-center font-bold text-4xl pt-5">
        <Link to="/"> TODO STORY</Link>
      </h1>
      <form
        className=" mt-[50px] flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="w-[70%] flex flex-col">
          <input
            className=" p-2 placeholder:italic border border-blue-500 rounded-md"
            placeholder="이메일을 입력하세요(@포함)"
            name="email"
            data-testid="email-input"
            onChange={handleChange}
          />
          <span className=" text-red-500 mb-3">{emailError}</span>
          <input
            className=" p-2 placeholder:italic border border-blue-500 rounded-md"
            placeholder="비밀번호를 입력하세요(8자리 이상)"
            name="password"
            data-testid="password-input"
            onChange={handleChange}
          />
          <span className="text-red-500">{passwordError}</span>
        </div>
        <div className="mt-3 italic text-teal-500">
          아이디가 이미 있어요👉
          <span className="pl-2 hover:text-yellow-200">
            <Link to="/signin">로그인 하러 가기</Link>
          </span>
        </div>
        <button
          className={
            edisabled || pdisabled
              ? "text-teal-500 absolute bottom-[30px] text-xl font-bold "
              : "text-white absolute bottom-[30px] text-xl font-bold hover:text-yellow-200"
          }
          disabled={edisabled || pdisabled}
          data-testid="signup-button"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};
export default SignUp;
