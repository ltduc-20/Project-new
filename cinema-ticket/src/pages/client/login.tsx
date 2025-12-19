import { supabase } from "../../utils/apputils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();
  async function LoginUser() {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }
    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (response.error) {
      alert("Dang nhap that bai" + response.error.message);
      return;
    }
    alert("Login successful");
    navigate("/room");
  }
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h2>Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={LoginUser}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
