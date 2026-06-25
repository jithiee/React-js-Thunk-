import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getTasksFromServer } from '../slice/taskListSlice';

const Tasks = () => {

  const  {taskLists , is_loading , error}  = useSelector((state)=> state.tasks)
  // console.log(taskLists);
  // console.log(is_loading);
  // console.log(error);
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(getTasksFromServer())
  }, [])

  // console.log(taskLists);
  
  
  return (
    <div>
      <h1>Task List</h1> <hr />
      <div>
        {taskLists.map((item)=>(
          <div>
            <p>Task Id : {item.id}</p>
            <p>Task Title : {item.title}</p>
            <p>Task Description : {item.description}</p> 
            <hr />
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Tasks;
