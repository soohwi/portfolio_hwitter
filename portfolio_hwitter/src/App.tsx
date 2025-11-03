/**
 * App.tsx
**/

import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { auth } from "@/firebase";
import { Layout } from "@/components/layout";
import { Home, Profile, Login, SignUp } from "@/pages";
import { LoadingScreen } from "@/components/common";
import { ProtectedRoute } from "@/components/hoc";

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/Profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/SignUp",
    element: <SignUp />
  }
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="hwitter">
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router}/>}
    </div>
  )
}

export default App;
