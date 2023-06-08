import { type } from "os";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Itodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
const ToDo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) navigate("/signin");
    const getTodos = async () => {
      const response = await fetch(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTodos(data);
      console.log(data);
    };
    getTodos();
  }, []);

  // useEffect 내부에서 의존성을 todos 변수로 주었을때, 무한 로드가 발생하였다.
  // 따라서 렌더 함수를 따로 만들어 필요할때만 로드가 되도록하였다.
  const renderTodos = async () => {
    const response = await fetch(
      "https://www.pre-onboarding-selection-task.shop/todos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setTodos(data);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewTodo(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(
      "https://www.pre-onboarding-selection-task.shop/todos",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: newTodo }),
      }
    );
    const data = await response.json();
    console.log(data);
    renderTodos();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input data-testid="new-todo-input" onChange={handleChange} />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      {todos.map((todo: Itodo) => (
        <li key={todo.id}>
          <label>
            <input type="checkbox" />
            <span>{todo.todo}</span>
          </label>
        </li>
      ))}
    </div>
  );
};

export default ToDo;
