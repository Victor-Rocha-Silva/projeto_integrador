import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/me");
        setUser(response.data.user);
      } catch (error) {
        console.log(error.response?.data);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }

    loadUser();
  }, [navigate]);

  async function handleLogout() {
    try {
      await api.post("/logout");
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  return (
    <div className="page-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Dashboard</h1>

        {user ? (
          <div className="user-info">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Carregando usuário...</p>
        )}

        <div className="dashboard-actions">
          <button onClick={handleLogout} className="btn-danger">
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;