import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useEffect, useState } from "react";
import { TAssignment } from "./interfaces";
import { BASE_URL } from "./helpers/constants"


function App() {
  const [assignments, setAssignments] = useState<TAssignment[]>([]);
  const [loading, setLoading] = useState(false)

  // TODO: RUN LOGIC TO TALK TO BACKEND SERVER
   async function getAssignment(){
    setLoading(true)

   const res = await  fetch(`${BASE_URL}/assignments`) 
   const json = await res.json() 
   setAssignments(json)

   setLoading(false)
   // setAssignments((await (fetch(`${BASE_URL}/assignments`))).json())       WE CAN USE THIS LINE REPLACED WITH 3 LINES ABOVE : SAME 
  } 
useEffect(() => {
    getAssignment()
}, []) 
 
  return ( 
    <>
      <Header getAssignments={getAssignment} setAssignments={setAssignments} />
      {loading && <h3>Loading...</h3>}
      {!loading && <Assignments 
        getAssignments = {getAssignment}
        assignments={assignments} 
        setAssignments={setAssignments} />}  
    </>
  );
}

export default App;
