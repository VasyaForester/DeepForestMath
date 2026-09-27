import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../state";

export function RequireName() {
  const { state } = useStore();
  if (!state.login) return <Navigate to="/" replace />;
  return <Outlet />;
}
