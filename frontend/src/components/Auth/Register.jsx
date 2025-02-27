import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(formData);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="border p-2 w-full rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="border p-2 w-full rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            className="border p-2 w-full rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Referral Code (Optional)</label>
          <input
            type="text"
            name="referralCode"
            placeholder="Enter referral code (if any)"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className={`p-2 w-full text-white font-semibold rounded ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
