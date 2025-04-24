import React from 'react';

function TestApp() {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">CapCo Test Page</h1>
        <p className="text-gray-600 mb-4">
          This is a simple test page to verify that React is working properly.
        </p>
        <div className="flex justify-center">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => alert('Button clicked!')}
          >
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestApp;
