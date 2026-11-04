import { useState } from "react";
import axios from "axios";

function AddTask({projectId, getData}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title: title,
      description: description,
      projectId: projectId
    }
    console.log(body)

    try {
      // call the API here to create one task...
      // IMPORTANT: the ID of the Project should be part of the Task data
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, body)
      console.log("task added") 
      // now get all the updated data from the project and its tasks
      getData()
    
    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }

  };
  
  return (
    <div className="AddTask">
      <h3>Add New Task</h3>
      
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

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;



// fetch() with then/catch
// fetch() with async/await
// axios() with then/catch
// axios() with async/await