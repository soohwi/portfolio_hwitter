/**
 * components/hoc
 * ProtectedRoute/ProtectedRoute.tsx
**/

import { Navigate } from "react-router-dom";
import { auth } from "@/firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode,
}) {
  // 1. 유저가 로그인 했는 지 확인
  const user = auth.currentUser;

  // 로그인 안했다면 login 페이지로 이동
  if (user === null) {
    return <Navigate to="/Login" />
  }

  // 로그인 했다면 <ProtectedRoute> prop으로 받은 children으로 이동
  return children;
}