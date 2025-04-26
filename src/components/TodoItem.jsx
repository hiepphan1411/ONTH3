import React from 'react';

function TodoItem({ todo, onToggleStatus, onDelete }) {
  return (
    <div className={`flex items-center p-3 rounded-lg shadow-sm border-l-4 transition-all ${
      todo.status 
        ? 'bg-green-50 border-green-500' 
        : 'bg-white border-amber-400 hover:border-amber-500'
    }`}>
      <button 
        onClick={() => onToggleStatus(todo.id)}
        className={`h-6 w-6 flex-shrink-0 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          todo.status 
            ? 'bg-green-500 border-green-600 focus:ring-green-500' 
            : 'bg-white border-gray-300 focus:ring-blue-500'
        }`}
      >
        {todo.status && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-white p-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      <span className={`ml-3 flex-1 text-gray-700 ${
        todo.status ? 'line-through text-gray-500' : ''
      }`}>
        {todo.name}
      </span>
      
      <button 
        onClick={() => onDelete(todo.id)} 
        className="ml-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
        aria-label="Delete todo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export default TodoItem;
