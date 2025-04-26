import React from 'react';

const TodoItem = ({ todo, onToggleStatus, onDelete }) => {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md shadow-sm">
      <div className="flex items-center flex-1">
        <input 
          type="checkbox" 
          checked={todo.status}
          onChange={() => onToggleStatus(todo.id)}
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
        onClick={() => onDelete(todo.id)}
      >
        Xóa
      </button>
    </div>
  );
};

export default TodoItem;
