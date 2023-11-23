import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/shared/Layout/AppLayout";
import Authors from "./pages/Authors";
import { Suspense } from "react";
import {
  AdminCirculation,
  Catalogue,
  Genres,
  Students,
  Users,
} from "./constants";
import AdminDashboard from "./pages/AdminDashboard";
import BuildLayout, {
  buildSidebarItems,
  settingsSidebarItems,
} from "./components/shared/Layout/BuildLayout";
import BuildSideNav from "./components/shared/BuildSideNav";
import ItemTypes from "./pages/ItemTypes";
import UserRole from "./pages/UserRole";
import EducationStages from "./pages/EducationalStage";
import GradeLevel from "./pages/GradeLevel";
import AcademicCourse from "./pages/AcademicCourse";
import Login from "./pages/Login";
import Staff from "./pages/Staff/Staff";
import Librarian from "./pages/Librarian/Librarian";
import ProtectedRoute from "./components/shared/PrivateRoute";
import RequiredAdmin from "./components/shared/RequiredAdmin";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <RequiredAdmin>
                <AppLayout />
              </RequiredAdmin>
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<AdminDashboard />} />
          <Route
            path="/builds"
            element={
              <BuildLayout
                miniSideNav={<BuildSideNav items={buildSidebarItems} />}
                title=" Build your Library"
                description="Manage your library content and set your data into the system.."
              />
            }
          >
            <Route
              path="/builds/catalogue"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Catalogue />
                </Suspense>
              }
            />

            <Route
              path="/builds/student-management"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Students />
                </Suspense>
              }
            />

            <Route
              path="/builds/user-management"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Users />
                </Suspense>
              }
            />

            <Route
              path="/builds/circulation"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <AdminCirculation />
                </Suspense>
              }
            />

            <Route
              index
              element={<Navigate replace to="/builds/catalogue" />}
            />
          </Route>

          <Route
            path="/settings"
            element={
              <BuildLayout
                miniSideNav={<BuildSideNav items={settingsSidebarItems} />}
                title="Customize your settings"
                description="Expands your library settings and configure the data related in your university."
              />
            }
          >
            <Route index element={<Navigate replace to="/settings/genres" />} />
            <Route
              path="genres"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Genres />
                </Suspense>
              }
            />

            <Route path="authors" element={<Authors />} />
            <Route path="item-types" element={<ItemTypes />} />
            <Route path="user-roles" element={<UserRole />} />
            <Route path="educational-stage" element={<EducationStages />} />
            <Route path="grade-level" element={<GradeLevel />} />
            <Route path="academic-course" element={<AcademicCourse />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="staff" element={<Staff />} />
        </Route>
        <Route
          path="librarian"
          element={
            <ProtectedRoute>
              <Librarian />
            </ProtectedRoute>
          }
        />

        <Route path="login" element={<Login />} />

        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
