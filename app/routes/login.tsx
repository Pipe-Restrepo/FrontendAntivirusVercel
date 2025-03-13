import { useFetcher, useActionData } from "@remix-run/react";
import Navbar from "../components/Navbar";
import { json, redirect } from "@remix-run/node";

interface ActionData {
  error?: string;
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("Email");
  const password = formData.get("Password");

  const response = await fetch("http://localhost:5282/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    return json({ error: "Credenciales incorrectas" }, { status: 401 });
  }
  const data = await response.json();

  const headers = new Headers();
  headers.append("Set-Cookie", `token=${data.token}; HttpOnly; Path=/; Secure`);
  return redirect("/novedades", { headers });
};

export default function Login() {
  const fetcher = useFetcher();
  const actionData = useActionData<ActionData>();
  return (
    <div>
      <Navbar></Navbar>
      {actionData?.error && (
        <p className="text-red-500 text-center mt-2">{actionData.error}</p>
      )}
      <fetcher.Form method="post" className="mt-6">
        <label className="block text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="border-2 rounded-md w-full p-2"
          type="email"
          id="email"
          name="Email"
        ></input>
        <label className="block text-gray-700 mt-4" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 rounded-md w-full p-2"
          type="password"
          id="password"
          name="Password"
        ></input>
        <button
          className="mt-6 w-full bg-yellow-500 text-white rounded-full font-bold py-2"
          type="submit"
        >
          Login
        </button>
      </fetcher.Form>
    </div>
  );
}
