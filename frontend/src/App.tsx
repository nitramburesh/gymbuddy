import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateEvent from "./pages/CreateEventPage/CreateEvent";
import FullArticle from "./pages/FullArticle";

import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { userState } from "./atoms";
import Exercises from "./pages/Exercises/Exercises";

const ProtectedRoute = ({ children }) => {
  const user = useRecoilValue(userState);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Box
            position="relative"
            minHeight="100vh"
            minWidth="100vw"
            pb="200px"
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route
                path="/createEvent"
                element={
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route path="/fullArticle/:id" element={<FullArticle />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Box>
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
