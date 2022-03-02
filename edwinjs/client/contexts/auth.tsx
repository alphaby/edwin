import axios from "axios";
import { useEffect } from "react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { createContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ServerMessage } from "../lib/prisma";

export type BaseUser = {
  id: string;
  email: string;
  password: string;
};

const AuthContext = createContext<{
  user: BaseUser | null;
  setUser: Dispatch<SetStateAction<BaseUser | null>>;
}>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BaseUser | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthRequired() {
  const { user, setUser } = useContext(AuthContext);
  const [fetchingSession, setFetchingSession] = useState(true);
  const location = useLocation();
  // Fetching session if context empty (triggered on every page refresh)
  useEffect(() => {
    if (user) return setFetchingSession(false);
    axios
      .post("/api/session")
      .then((res) => {
        setUser(res.data);
        setFetchingSession(false);
      })
      .catch((res) => {
        setFetchingSession(false);
      });
  }, [user]);
  if (fetchingSession) return null;
  else if (!user)
    return <Navigate to="/login" state={{ from: location }} replace />;
  else return <Outlet />;
}

export function useUser() {
  const { user } = useContext(AuthContext);
  return user;
}

export function useLogin() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = (state as any)?.from?.pathname;

  useEffect(() => {
    axios
      .post("/api/session")
      .then((res) => res.data && navigate("/", { replace: true }))
      .catch(() => null);
  }, []);

  return (
    email: BaseUser["email"],
    password: string,
    to?: string
  ): Promise<{ error: ServerMessage | null }> =>
    axios
      .post("/api/login", { email, password })
      .then((res) => {
        setUser(res.data);
        navigate(to || from || "/", { replace: true });
        return { error: null };
      })
      .catch((res) => ({
        error: {
          status: res.response.status,
          message: res.response.data,
        },
      }));
}

export function useLogout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (to?: string) =>
    axios.post("/api/logout").then((res) => {
      setUser(null);
      navigate(to || "/");
    });
}
