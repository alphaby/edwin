import { useLogout, useMessage, useUser } from "@edwin/client";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const user = useUser();
  const logout = useLogout();
  const message = useMessage();

  return (
    <div>
      {user && <button onClick={() => logout()}>Déconnexion</button>}
      {message && <div>{JSON.stringify(message)}</div>}
      <Outlet />
    </div>
  );
}
