import express from "express";
import { setTimeout as sleep } from "node:timers/promises";
import cors from "cors";
import database from "./database";
import { randomUUID } from "node:crypto";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/assignments", async (req, res) => {
   await sleep(3000);
  res.json(database.assignments);
});

app.post("/assignments", async(req, res) => {
  const {assignment} = req.body

  database.assignments.push({
    task:assignment ,
    completed:false, 
    id:(Math.floor(Math.random()*1000) +1) })
})

app.post("/assignments/:id/delete", async (req, res) => {
  // TODO: finish implementing this function
  await sleep(2000);
  const id = req.params.id;
  const index = database.assignments.findIndex((assignment)=>assignment.id == Number(id))
  if(index !== -1){
    database.assignments.splice(index, 1)
  }
  console.log(database.assignments)
  console.log(id);
  res.status(200).json();
}); 

app.post("/assignments/:id/toggle", async (req, res) => {
  // TODO: finish implementing this function
  await sleep(3000);
  const id = req.params.id;
  
  database.assignments = database.assignments.map((assignment) =>
      assignment.id === Number(id)
        ? { ...assignment, completed: !assignment.completed }
        : assignment,
    ); 
    res.json({ test: "you toggled complete" });
  });



app.listen(8000, () => {
  console.log("Backend Web Server has started 🚀");
});
