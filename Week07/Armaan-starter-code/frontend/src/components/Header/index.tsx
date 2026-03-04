import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase, trim } from "../../helpers/stringHelpers";
import { useState } from "react";
import { TAssignment } from "../../interfaces";
import { BASE_URL } from "../../helpers/constants";

type Props = {
  setAssignments: React.Dispatch<React.SetStateAction<TAssignment[]>>;
  getAssignments(): Promise<void>
};

export function Header({getAssignments}: Props) {
  const [assignment, setAssignment] = useState("");

  const handleCreateButton = (e: React.FormEvent) => {
    // TODO: make sure to add the assignment to the database
    e.preventDefault();
    
     fetch (`${BASE_URL}/assignments`, {
      method: "POST", 
      body: JSON.stringify({ assignment}),
      headers: {"Content-Type": "application/json"} 
    })
 
    setAssignment("");
    getAssignments()
  };

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={handleCreateButton}>
        <input
          placeholder="Add a new assignment"
          type="text"
          value={assignment}
          onChange={(e) => setAssignment(trim(e.target.value))}
        />
        <button type="submit" disabled={!assignment}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
