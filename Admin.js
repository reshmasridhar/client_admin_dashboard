import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [loginCounts, setLoginCounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    const fetchLoginCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/loginCounts');
        setLoginCounts(response.data);
      } catch (error) {
        console.error('Error fetching login counts', error);
      }
    };

    fetchUsers();
    fetchLoginCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const chartData = {
    labels: loginCounts.map(item => item.date),
    datasets: [
      {
        label: 'Login Count',
        data: loginCounts.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Login Counts by Date',
      },
    },
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => setShowTable(true)}>Show Users</button>
      <button onClick={() => setShowTable(false)}>Show Graph</button>
      <button onClick={handleLogout}>Logout</button>
      
      {showTable ? (
        <div>
          <h3>Users List</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Login Count</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.loginCount}</td>
                  <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3>Login Counts by Date</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default Admin;
