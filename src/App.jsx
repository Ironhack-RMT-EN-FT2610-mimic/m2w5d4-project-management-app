import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";

import Navbar from "./components/Navbar";
import Error from "./pages/Error";

function App() {

  return (
    <div className="App">
      
    <Navbar />

    <Routes>
      <Route path="/" element={ <HomePage /> } />
      
      <Route path="/projects" element={<ProjectListPage />} />
      <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
      
      <Route exact path="/projects/create" element={<CreateProjectPage />} />
      <Route path="/projects/edit/:projectId" element={ <EditProjectPage /> } />

      {/* //! error handling routes should be here */}
      <Route path="/error" element={ <Error /> }/>

    </Routes>
    
  </div>
  )
}

export default App
