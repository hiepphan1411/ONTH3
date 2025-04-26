import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (todos.length > 0) {
          setLoading(false);
          return;
        }
        
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
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleStatus = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updatedTodos);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const newTodoItem = {
      id: Date.now().toString(),
      name: newTodo,
      status: false
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo(''); 
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.status;
    if (filter === 'uncompleted') return !todo.status;
    return true;
  });


  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.status).length;

  if (loading) return <div className="flex justify-center items-center min-h-screen text-lg">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">To-Do List</h1>
      
      <form className="flex mb-4 gap-2" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nhập công việc mới"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Thêm
        </button>
      </form>
      
      {/* Filter buttons */}
      <div className="flex justify-between mb-4">
        <button 
          onClick={() => setFilter('all')} 
          className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Tất cả
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Đã hoàn thành
        </button>
        <button 
          onClick={() => setFilter('uncompleted')} 
          className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${filter === 'uncompleted' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Chưa hoàn thành
        </button>
      </div>
      
      {/* Todo Summary */}
      <div className="bg-gray-100 p-3 rounded-md mb-4 text-center text-gray-700 font-medium">
        Tổng: {totalTodos} | Hoàn thành: {completedTodos}
      </div>
      
      <div className="space-y-3">
        {filteredTodos.map((todo) => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default App
