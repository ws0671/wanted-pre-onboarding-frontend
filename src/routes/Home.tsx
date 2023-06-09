import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="relative bg-blue-500 mx-auto w-[500px] mt-[100px] rounded-lg h-[350px]">
        <h1 className="hover:text-pink-400 text-white text-center font-bold text-4xl pt-5">
          TODO STORY
        </h1>
        <Link
          className="absolute left-3 bottom-3 hover:text-yellow-200 text-white"
          to="/signup"
        >
          회원가입 하러 가기
        </Link>
        <Link
          className="absolute right-3 bottom-3 hover:text-yellow-200 text-white"
          to="/signin"
        >
          로그인 하러 가기
        </Link>
      </div>
    </>
  );
};

export default Home;
