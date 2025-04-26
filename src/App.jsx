import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://67cd347add7651e464eda05a.mockapi.io/Products');
        if (!response.ok) {
          throw new Error('Lỗi khi tải dữ liệu');
        }
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    console.log(`Xóa công việc với id: ${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-content">
              <span className="todo-name">{todo.name}</span>
              <span className={`todo-status ${todo.status ? 'completed' : 'pending'}`}>
                {todo.status ? 'Hoàn thành' : 'Chưa hoàn thành'}
              </span>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
