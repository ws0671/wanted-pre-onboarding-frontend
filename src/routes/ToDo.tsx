import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface Itodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
const ToDo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [todos, setTodos] = useState<Itodo[]>([]);
  const [editingIndex, setEditingIndex] = useState(-1);
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

  const updateTodo = async (currentTodo: Itodo) => {
    const response = await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${currentTodo.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: currentTodo.todo,
          isCompleted: !currentTodo.isCompleted,
        }),
      }
    );
  };

  const deleteTodo = async (currentTodo: Itodo) => {
    const response = await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${currentTodo.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    renderTodos();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewTodo(value);
  };
  const handleCheckboxChange = (currentTodo: Itodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === currentTodo.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
    updateTodo(currentTodo);
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
    setNewTodo("");
    renderTodos();
  };
  const handleDelete = (currentTodo: Itodo) => {
    deleteTodo(currentTodo);
  };
  const handleEdit = (index: number, currentTodo: Itodo) => {
    setEditingIndex(index);
    setEditTodo(currentTodo.todo);
  };
  const handleCancle = () => {
    setEditingIndex(-1);
  };
  const handleInputChange = async (currentTodo: Itodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, todo: editTodo } : todo
      )
    );
    const response = await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${currentTodo.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: editTodo,
          isCompleted: currentTodo.isCompleted,
        }),
      }
    );
    setEditingIndex(-1);
  };
  const onEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(event.target.value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todo: Itodo
  ) => {
    // event.preventDefault();
    if (event.key === "Enter") {
      handleInputChange(todo);
    }
  };

  return (
    <div className="relative bg-blue-500 mx-auto w-[500px] mt-[100px] rounded-lg pb-5">
      <h1 className="hover:text-pink-400 text-white text-center font-bold text-4xl pt-5">
        <Link to="/"> TODO STORY</Link>
      </h1>
      <div className="mx-auto mt-[30px] w-[70%]">
        <form className="mb-5" onSubmit={handleSubmit}>
          <input
            data-testid="new-todo-input"
            value={newTodo}
            className=" p-2 w-[80%] border border-blue-500 rounded-md"
            onChange={handleChange}
          />
          <button
            className="rounded-md ml-5 p-2 text-white hover:text-black hover:bg-yellow-200 bg-sky-500"
            data-testid="new-todo-add-button"
          >
            추가
          </button>
        </form>

        {todos.map((todo: Itodo, index) => (
          <li key={todo.id} className="relative mb-2 text-white">
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleCheckboxChange(todo)}
              />
              {editingIndex === index ? (
                <>
                  <input
                    className="rounded-md"
                    data-testid="modify-input"
                    value={editTodo}
                    onChange={onEditChange}
                    onKeyDown={(event) => handleKeyDown(event, todo)}
                  />
                  <button
                    className="absolute right-10 text-white p-0.5 bg-sky-500 rounded-md hover:text-black hover:bg-yellow-200"
                    data-testid="submit-button"
                    onClick={() => handleInputChange(todo)}
                  >
                    제출
                  </button>
                  <button
                    className="absolute right-0 text-white p-0.5 bg-sky-500 rounded-md hover:text-black hover:bg-yellow-200"
                    data-testid="cancel-button"
                    onClick={handleCancle}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <span className="pl-2">{todo.todo}</span>

                  <button
                    className="absolute right-10 text-white p-0.5 bg-sky-500 rounded-md hover:text-black hover:bg-yellow-200"
                    data-testid="modify-button"
                    onClick={() => handleEdit(index, todo)}
                  >
                    수정
                  </button>
                  <button
                    className="absolute right-0 text-white p-0.5 bg-sky-500 rounded-md hover:text-black hover:bg-yellow-200"
                    data-testid="delete-button"
                    onClick={() => handleDelete(todo)}
                  >
                    삭제
                  </button>
                </>
              )}
            </label>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
