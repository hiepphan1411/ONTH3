import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); 

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
      
      <div className="space-y-3">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md shadow-sm">
            <div className="flex items-center flex-1">
              <input 
                type="checkbox" 
                checked={todo.status}
                onChange={() => handleToggleStatus(todo.id)}
                className="w-5 h-5 mr-3 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <p className={`font-medium text-gray-800 ${todo.status ? 'line-through' : ''}`}>{todo.name}</p>
                <span className={`text-sm ${todo.status ? 'text-green-500' : 'text-yellow-500'}`}>
                  {todo.status ? 'Hoàn thành' : 'Chưa hoàn thành'}
                </span>
              </div>
            </div>
            <button 
              className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-300" 
              onClick={() => handleDelete(todo.id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
