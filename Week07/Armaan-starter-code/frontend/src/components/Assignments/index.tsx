import { BASE_URL } from "../../helpers/constants";
import { TAssignment } from "../../interfaces";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

type Props = {
  getAssignments(): Promise<void>
  assignments: TAssignment[];
  setAssignments: React.Dispatch<React.SetStateAction<TAssignment[]>>;
};

// *************************** DELETE ***********************************************
// TODO: fetch all the assignments from the database
export function Assignments({ assignments, setAssignments, getAssignments }: Props) {
  const handleDeleteButton = async (id: string) => {
    // TODO: make sure to delete the assignment from the database too
  await fetch(`${BASE_URL}/assignments/${id}/delete`, {method: "POST"})
    await getAssignments()

    

  };
//********************************* CompletedTask **************************************************
  const handleCompletedTask = async(id: string) => {
   await fetch(`${BASE_URL}/assignments/${id}/toggle`, {method: "POST"})
    await getAssignments()
  };


//********************************* countCompletedTasks **************************************************
  const countCompletedTasks = () => {
    return assignments.filter((assignment) => assignment.completed).length;
  };
  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>
            {countCompletedTasks()} of {assignments.length}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {assignments.map((assignment, index) => (
          <Assignment
            id={assignment.id}
            assignment={assignment.task}
            completed={assignment.completed}
            handleDeleteButton={handleDeleteButton}
            handleCompletedTask={handleCompletedTask}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
