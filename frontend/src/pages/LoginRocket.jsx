import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./LoginRocket.css";

function LoginRocket() {
  const navigate = useNavigate();
  const leftTextRef = useRef(null);
  const formRef = useRef(null);
  const starsRef = useRef([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    gsap.fromTo(
      leftTextRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      formRef.current,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    starsRef.current.forEach((star, index) => {
      if (!star) return;

      gsap.to(star, {
        opacity: 0.2,
        scale: 0.5,
        duration: 0.5 + (index % 3) * 0.2,
        repeat: -1,
        yoyo: true,
        delay: index * 0.1,
        ease: "power1.inOut",
      });
    });
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setMessage("Login realizado com sucesso!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Erro ao fazer login.");
      }

      setMessageType("error");

      gsap.fromTo(
        formRef.current,
        { x: -8 },
        {
          x: 8,
          duration: 0.06,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        }
      );
    }
  }

  return (
    <div className="startup-login-page no-rocket-layout">
      <div className="startup-left clean-left">
        <div className="startup-stars">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className={`startup-star star-${i + 1}`}
              ref={(el) => (starsRef.current[i] = el)}
            />
          ))}
        </div>

        <div className="startup-left-content clean-text" ref={leftTextRef}>
        </div>
      </div>

      <div className="startup-right clean-right">
        <div className="startup-login-card clean-card" ref={formRef}>
          <h2>USER LOGIN</h2>
          <p className="startup-subtitle">Welcome to the website</p>

          <form onSubmit={handleLogin}>
            <div className="startup-field">
              <label>USERNAME</label>
              <div className="startup-input-wrap">
                <span className="startup-icon">👤</span>
                <input
                  type="email"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="startup-field">
              <label>PASSWORD</label>
              <div className="startup-input-wrap">
                <span className="startup-icon">🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="startup-login-options">
              <label className="startup-remember">
                <input type="checkbox" />
                <span>Remember</span>
              </label>

              <button type="button" className="startup-forgot">
                Forgot password ?
              </button>
            </div>

            <button type="submit" className="startup-login-btn">
              LOGIN
            </button>
          </form>

          {message && (
            <div className={`startup-message ${messageType}`}>{message}</div>
          )}

          <p className="startup-create">
            <Link to="/register">Create Account !</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginRocket;