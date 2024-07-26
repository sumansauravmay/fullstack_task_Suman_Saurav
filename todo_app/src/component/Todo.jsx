import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdEventNote } from "react-icons/md";
import axios from "axios";

const Todo = () => {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");

  const getData = async () => {
    await fetch(`https://fullstack-task-suman-saurav.onrender.com/`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.AllTask);
        setData(res.AllTask);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelte = (id) => {
    axios
      .delete(`https://fullstack-task-suman-saurav.onrender.com/delete/${id}`)
      .then((res) => {
        console.log(res.data.message);
        getData();
      })
      .catch((err) => console.log(err));
  };

  const handllePostTask = () => {
    axios.post(`https://fullstack-task-suman-saurav.onrender.com/post`,{
        todoText: task,
        todoID: Date.now(),
      })
    .then((res)=>{
        console.log(res.data.msg);
        getData();
        setTask("");
    })
    .catch((err)=>console.log(err));
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest text-xl font-bold">
            <div className="flex gap-2">
              <MdEventNote className="mt-1" />
              Note App
            </div>
          </h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="New Note..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal text-white hover:bg-black bg-[#92400E]">
              <div className="flex gap-1" onClick={handllePostTask}>
                <IoIosAddCircle className="mt-1" />
                Add
              </div>
            </button>
          </div>
        </div>
        <div>
          {data.map((task) => (
            <div className="flex mb-4 items-center" key={task.id}>
              <p className="w-full text-grey-darkest">{task.todoText}</p>
              <button
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-black"
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
              >
                Update
              </button>

              <button
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-black"
                onClick={() => handleDelte(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
