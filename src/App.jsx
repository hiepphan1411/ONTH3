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

  if (loading) return <div className="flex justify-center items-center min-h-screen text-lg font-medium text-blue-600">
    <div className="animate-pulse">Loading...</div>
  </div>;
  
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">
    <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>Error: {error}</span>
    </div>
  </div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5">
          <h1 className="text-2xl font-bold text-center text-white">To-Do List</h1>
        </div>
        
        <div className="p-6">
          <form className="flex mb-6 gap-2" onSubmit={handleAddTodo}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Nhập công việc mới"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Thêm</span>
            </button>
          </form>
          
          {/* Filter buttons */}
          <div className="flex justify-between mb-6 bg-gray-50 p-1 rounded-lg">
            <button 
              onClick={() => setFilter('all')} 
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Tất cả
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${filter === 'completed' ? 'bg-green-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Đã hoàn thành
            </button>
            <button 
              onClick={() => setFilter('uncompleted')} 
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${filter === 'uncompleted' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Chưa hoàn thành
            </button>
          </div>
          
          {/* Todo Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 text-center shadow-sm">
            <div className="flex justify-center gap-4">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Tổng số</span>
                <span className="text-2xl font-bold text-blue-700">{totalTodos}</span>
              </div>
              <div className="h-10 w-px bg-gray-300"></div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Hoàn thành</span>
                <span className="text-2xl font-bold text-green-600">{completedTodos}</span>
              </div>
            </div>
          </div>
          
          {filteredTodos.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredTodos.map((todo) => (
                <TodoItem 
                  key={todo.id}
                  todo={todo}
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>Không có công việc nào trong danh sách</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
