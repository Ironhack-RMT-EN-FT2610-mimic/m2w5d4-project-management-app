import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // used for calling the API

function EditProjectPage() {

  const navigate = useNavigate()
  const { projectId } = useParams() // destructuring the project id from dynamic params (see App.jsx => /:projectId)
  
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {  
    getData()
  }, [])

  const getData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}`)

      setTitle(response.data.title)
      setDescription(response.data.description)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }
  }

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    const body = {
      title: title,
      description: description
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/projects/${projectId}`, body)
      navigate(`/projects/${projectId}`)
    } catch (error) {
      console.log(error)
      //todo proper error handling here 
    }
  };

  const deleteProject = async() => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${projectId}`)
      navigate("/projects")
    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }
  }; 

  if (isLoading) return <h3>Loading...</h3> //todo proper loading animation here

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>      
    </div>
  );
}

export default EditProjectPage;
