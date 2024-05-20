// import App from "./App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage.jsx";
import WorkersPage from "./pages/WorkersPage/WorkersPage.jsx";
import AboutMePage from "./pages/AboutMePage/AboutMePage.jsx";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects/:tabName",
    element: (
      <ProtectedRoute>
        <ProjectsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workers",
    element: (
      <ProtectedRoute>
        <WorkersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/me",
    element: (
      <ProtectedRoute>
        <AboutMePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default routes;
