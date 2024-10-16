import HomePage from "./pages/HomePage/HomePage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage.jsx";
import WorkersPage from "./pages/WorkersPage/WorkersPage.jsx";
import AboutMePage from "./pages/AboutMePage/AboutMePage.jsx";
import ProjectsMainPage from "./pages/ProjectsMainPage/ProjectsMainPage.jsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.jsx";
import CompanyCreatePage from "./pages/CompanyCreatePage/CompanyCreatePage.jsx";
import FirstPage from "./pages/FirstPage/FirstPage.jsx";
import FlowPage from "./pages/FlowPage/FlowPage.jsx";
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage.jsx";
import CalendarPage from "./pages/CalendarPage/CalendarPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import SurveysPage from "./pages/SurveysPage/SurveysPage.jsx";

const routes = [
  {
    path: "/",
    element: (
      <FirstPage />
    ),
  },
  {
    path: "/flow",
    element: (
      <FlowPage />
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
    path: "/surveys",
    element: (
      <ProtectedRoute>
        <SurveysPage />
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
    path: "/calendar",
    element: (
      <ProtectedRoute>
        <CalendarPage />
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
    path: "/adminpanel",
    element: (
      <ProtectedRoute adminOnly={true}>
        <AdminPanelPage />
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
      <CompanyCreatePage />
    ),
  },
  {
    path: "/homepage",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <NotFoundPage />
    ),
  },
];

export default routes;
