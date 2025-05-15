import { useState } from "react";

const RegisterForm = ({ onRegister, cambiarAVistaLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onRegister(email, password);

      // limpiar campos
      setEmail("");
      setPassword("");

      // volver a login después del registro exitoso
      cambiarAVistaLogin();
    } catch (err) {
      setError("Error al registrarse");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 max-w-md mx-auto p-6 rounded shadow space-y-4 mt-24"
    >
      <h2 className="text-xl font-bold text-cyan-400 text-center">Registro de usuario</h2>

      <div>
        <label className="block text-white mb-1">Email:</label>
        <input
          type="email"
          className="w-full p-2 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-white mb-1">Contraseña:</label>
        <input
          type="password"
          className="w-full p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded"
      >
        Registrarse
      </button>

      <p className="text-center text-sm text-white">
        ¿Ya tienes cuenta?{" "}
        <button type="button" onClick={cambiarAVistaLogin} className="text-cyan-400 underline">
          Iniciar sesión
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
