import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContexts";
import { loginUser, getDashboard } from "../../services/api";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      localStorage.setItem("token", response.data.token);

      const userResponse = await getDashboard();
      setUser(userResponse.data.user);

      toast.success("Login successful! Redirecting...");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Login failed! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full my-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full my-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-between items-center text-sm text-blue-500 mb-2">
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className={`p-2 w-full text-white rounded ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
