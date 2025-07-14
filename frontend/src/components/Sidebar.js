import React from 'react';

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen p-4 border-r border-gray-200">
      <ul className="space-y-4">
        <li><a href="/dashboard" className="text-primary hover:underline">Dashboard</a></li>
        <li><a href="/" className="text-primary hover:underline">Home</a></li>
        <li><a href="/login" className="text-primary hover:underline">Login</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;