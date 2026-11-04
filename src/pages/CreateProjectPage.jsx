import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"; // used for calling the API

function CreateProjectPage() {

  const navigate = useNavigate()
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    const body = {
      title: title,
      description: description
    }

    try {
      // call the API here to create one project...
      await axios.post(`${import.meta.env.VITE_API_URL}/projects`, body)
      navigate("/projects")
      
    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }
  };  

  return (
    <div className="CreateProjectPage">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}> 
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;