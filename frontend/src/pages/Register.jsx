import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      localStorage.setItem("token", response.data.token);
      setMessage("Usuário cadastrado com sucesso!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.log(error.response?.data);

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Erro ao cadastrar usuário.");
      }

      setMessageType("error");
    }
  }

  return (
    <div className="page-container">
      <div className="auth-card">
        <h1 className="auth-title">Cadastro</h1>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <div className="form-group">
            <label>Confirmar senha</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirme sua senha"
            />
          </div>

          <button type="submit" className="btn-primary">
            Cadastrar
          </button>
        </form>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;