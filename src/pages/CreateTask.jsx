import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskToServer } from '../slice/taskListSlice';

const CreateTask = () => {
  const [ formData , setFormData ] = useState({
    title : "",
    description : ""
  })


  const handleChange=(e)=>{
     const {name , value} = e.target;
     setFormData({...formData  , [name]: value})
  }
  const dispatch = useDispatch()

  const handleSubmit =(e)=>{
     e.preventDefault();
     dispatch(addTaskToServer(formData))
     
  }



  return (
    <div>
      <h1>create task</h1> <hr />
       <form  onSubmit={handleSubmit} >
        {/* title  */}
          <label htmlFor="">Title : </label>
          <input 
            type="text"
            placeholder='Enter task title'
            name="title"
            value={formData.title}
            onChange={handleChange}
            />

          <p></p>

        {/* description  */}
           <label htmlFor="">description : </label>
           <input 
             type="text"
             placeholder='Enter task description'
             name='description'
             value={formData.description}
             onChange={handleChange}
             />
           <p></p>
         
         <button type='submit'>create </button>

          

       </form>




    </div>
  );
}

export default CreateTask;
