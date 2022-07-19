import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/login';
import Quiz from "../pages/quiz";
import Home from "../pages/home";
import SidebarWithHeader from "../components/sidebar";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const AppRouter = () => {
  const userProfileData = useAppSelector((state: RootState) => state.userProfile);
  return (
    <Router >
      {userProfileData.value.uid !== null ?
        <SidebarWithHeader>
          <Routes>
            <Route path="/" >
              <Route index element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route path="quiz" element={<Quiz />} />
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Route>
          </Routes>
        </SidebarWithHeader>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      }
    </Router >
  )
}

export default AppRouter;