import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("Nombre obligatorio"),
  lastName: yup.string().required("Apellido obligatorio"),
  email: yup.string().email("Email inválido").required("Email obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { ...userData } = data;
    registerUser(userData);
    navigate("/profile");
  };

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden bg-fuchsia-100">
      {/* imagen */}
      <div className="order-2 flex items-center justify-center p-8 md:w-1/3">
        <div className="mx-auto w-full max-w-xs">
          <img
            className="h-auto w-full hover:scale-105"
            src="/logo.png"
            alt="Logo"
          />
          <div>
            <p>
              <Link
                to="/login"
                className="scale-50 text-purple-900 hover:font-semibold hover:text-purple-500 hover:underline"
              >
                ¿Ya tienes una cuenta?
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="order-1 m-5 space-y-6 md:w-1/3">
        <div className="w-auto sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-2xl font-bold text-purple-900">
            Registrarse
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 rounded-4xl bg-fuchsia-200 p-4 shadow-sm"
        >
          <div className="gap-y-4 rounded-xl">
            <div>
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block font-medium text-purple-700"
                  >
                    Nombre
                  </label>
                  <div>
                    <input
                      type="text"
                      {...register("firstName")}
                      className="mt-1 block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-2 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 focus:outline-none"
                    />
                    <p className="flex justify-center text-sm font-bold text-violet-600">
                      {errors.firstName?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block font-medium text-purple-700"
                  >
                    Apellido
                  </label>
                  <div>
                    <input
                      type="text"
                      {...register("lastName")}
                      className="mt-1 block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-2 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 focus:outline-none"
                    />
                    <p className="flex justify-center text-sm font-bold text-violet-600">
                      {errors.lastName?.message}
                    </p>
                  </div>
                </div>
              </div>
              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-purple-700"
                >
                  Email
                </label>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    className="mt-1 block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-2 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 focus:outline-none"
                  />
                  <p className="flex justify-center text-sm font-bold text-violet-600">
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              {/* pass */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-purple-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    {...register("password")}
                    className="mt-1 block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-2 shadow-sm focus:border-fuchsia-500 focus:outline-none"
                  />
                  <p className="flex justify-center text-sm font-bold text-violet-600">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block font-medium text-purple-700"
                >
                  Confirma Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    {...register("confirmPassword")}
                    className="mt-1 block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-2 shadow-sm focus:border-fuchsia-500 focus:outline-none"
                  />
                  <p className="flex justify-center text-sm font-bold text-violet-600">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </div>
              {/* button */}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-3xl border border-transparent bg-fuchsia-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:outline-none"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
