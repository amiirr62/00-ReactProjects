import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useEffect, useState } from "react";
import { TAssignment } from "./interfaces";

function App() {
  const [assignments, setAssignments] = useState<TAssignment[]>([]);

  // TODO: RUN LOGIC TO TALK TO BACKEND SERVER
useEffect(() => {
  async function getAssignment(){
   const res = await  fetch("http://localhost:8000/assignments") 
   const json = await res.json() 
   setAssignments(json)
  } 
    getAssignment()
}, []) 
 
  return ( 
    <>
      <Header setAssignments={setAssignments} />
      <Assignments assignments={assignments} setAssignments={setAssignments} />
    </>
  );
}

export default App;
