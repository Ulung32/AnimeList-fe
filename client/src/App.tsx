// import "./App.css";
import "./index.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/index";
import { Register } from "./pages/register/index";
import { Animes } from "./pages/animes/index";
import { AddAnime } from "./pages/add-anime/index";
import { EditAnime } from "./pages/edit-anime/index.tsx";
import { Home } from "./pages/home";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route
          path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/anime" element={<Animes />}></Route>
        <Route path="/add-anime" element={<AddAnime />}></Route>
        <Route path="/edit-anime/:id" element={<EditAnime />}></Route>
      </Routes>
    </AppContainer>
  );
}

export default App;
