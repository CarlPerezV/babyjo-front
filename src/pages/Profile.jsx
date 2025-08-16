import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Perfil del Usuario
        </h2>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Nombre:</span> {user.firstName}{" "}
            {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Correo:</span> {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-6 w-full rounded-md bg-purple-700 py-2 text-white transition hover:bg-purple-400 hover:text-pink-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
