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
    const data = await response.json();
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
    console.log(data);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={handleChange}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      {todos.map((todo: Itodo, index) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCheckboxChange(todo)}
            />
            {editingIndex === index ? (
              <>
                <input
                  data-testid="modify-input"
                  value={editTodo}
                  onChange={onEditChange}
                />
                <button
                  data-testid="submit-button"
                  onClick={() => handleInputChange(todo)}
                >
                  제출
                </button>
                <button data-testid="cancel-button" onClick={handleCancle}>
                  취소
                </button>
              </>
            ) : (
              <>
                <span>{todo.todo}</span>

                <button
                  data-testid="modify-button"
                  onClick={() => handleEdit(index, todo)}
                >
                  수정
                </button>
                <button
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
  );
};

export default ToDo;
