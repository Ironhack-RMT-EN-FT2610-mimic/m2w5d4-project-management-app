import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // used for calling the API

import AddTask from "../components/AddTask"; // for rendering Task Add Form
import TaskCard from "../components/TaskCard"; // for rendering Task List

function ProjectDetailsPage () {

  const { projectId } = useParams() // destructuring the project id from dynamic params (see App.jsx => /:projectId)

  const [ project, setProject ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    try {

      // call the API here to receive project details...
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}?_embed=tasks`)
      console.log(response)

      setProject(response.data)

      setIsLoading(false) // render the component once the data finished loading

    } catch (error) {
      console.log(error)
      //todo proper error handling here
    }
  }

  if (isLoading) return <h3>Loading...</h3> //todo proper loading animation here
  
  return (
    <div className="ProjectDetailsPage">

      <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>

      {/* ... list of all Tasks for this Project should be rendered here */}

      {/* example of a single TaskCard being rendered */}
      {/* <TaskCard /> */}
      {project.tasks.map((task) => {
        return <TaskCard key={task.id} {...task}/>
      })}

      {/* ... form for adding a new Task should be rendered here    */}
      <AddTask projectId={project.id} getData={getData}/> 

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      
      <Link to={`/projects/edit/${project.id}`}>
        <button>Edit Project</button>
      </Link>      
      
    </div>
  );
}

export default ProjectDetailsPage;
