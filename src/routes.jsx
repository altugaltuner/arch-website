// import App from "./App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage.jsx";
import WorkersPage from "./pages/WorkersPage/WorkersPage.jsx";
import AboutMePage from "./pages/AboutMePage/AboutMePage.jsx";
import GroupsPage from "./pages/GroupsPage/GroupsPage.jsx";
import ProjectsMainPage from "./pages/ProjectsMainPage/ProjectsMainPage.jsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.jsx";
import CompanyCreatePage from "./pages/CompanyCreatePage/CompanyCreatePage.jsx";

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
    path: "/projects",
    element: (
      <ProtectedRoute>
        <ProjectsMainPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects/:projectId/",
    element: (
      <ProtectedRoute>
        <ProjectsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/groups",
    element: (
      <ProtectedRoute>
        <GroupsPage />
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
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/company-create",
    element: (
      <ProtectedRoute>
        <CompanyCreatePage />
      </ProtectedRoute>
    ),
  }
];

export default routes;
