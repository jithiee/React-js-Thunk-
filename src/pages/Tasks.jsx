import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getTasksFromServer , deleteTaskFromServer } from '../slice/taskListSlice';
import { useNavigate } from 'react-router-dom';


const Tasks = () => {

  const  {taskLists , is_loading , error}  = useSelector((state)=> state.tasks)
  // console.log(taskLists);
  // console.log(is_loading);
  // console.log(error);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
      dispatch(getTasksFromServer())
  }, [])

  // console.log(taskLists);
  
  const handleDelete = (id)=>{
     const is_confirm = window.confirm("Are you sure you want to delete this task ?")
     if(is_confirm){
       dispatch(deleteTaskFromServer(id))
     }
  }

  
  return (
    <div>
      <h1>Task List</h1> <hr />
      <div>
        {taskLists.map((item)=>(
          <div key={item.id}>
            <p>Task Id : {item.id}</p>
            <p>Task Title : {item.title}</p>
            <p>Task Description : {item.description}</p> 
            <button onClick={()=> handleDelete(item.id)}>delete</button>
            <button onClick={()=> navigate(`edit/${item.id}`)}>Edit</button>
        
            <hr />
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Tasks;





