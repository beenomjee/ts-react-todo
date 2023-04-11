import React, { FC, useRef, useState } from "react";
import styles from "./Tasks.module.css";
import { GrFormAdd } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";

type TaskProps = {
  id: number;
  isDone: boolean;
  message: string;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const Task: FC<TaskProps> = ({ id, isDone, message, setTasks }) => {
  const changeCompletionHandler = (): void => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };
  const deleteHandler = (): void => {
    setTasks((prevState) => prevState.filter((task) => task.id != id));
  };
  return (
    <div className={styles.task}>
      <div className={styles.left}>
        <span
          className={`${styles.circle} ${isDone ? styles.done : ""}`}
        ></span>
        <span onClick={changeCompletionHandler} className={styles.message}>
          {message}
        </span>
      </div>
      <div className={styles.right}>
        <button onClick={deleteHandler}>
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  );
};

// ####################################################
// ####################################################
// ####################################################
// ####################################################

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const AddNewModal = React.forwardRef<HTMLInputElement, ModalProps>(
  ({ isModalOpen, setIsModalOpen, inputText, setInputText, setTasks }, ref) => {
    const handleClose = (): void => {
      setInputText("");
      setIsModalOpen(false);
    };
    const handleAdd = (): void => {
      setTasks((prevState) => [
        ...prevState,
        { id: Date.now(), isDone: false, message: inputText },
      ]);

      handleClose();
    };
    return (
      <div
        className={`${styles.modal} ${
          isModalOpen ? styles.open : styles.close
        }`}
      >
        <h2>Add New Task</h2>
        <div className={styles.inputBox}>
          <input
            type="text"
            required
            placeholder="Enter Your Task..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            ref={ref}
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={handleAdd} className={styles.add}>
            Add
          </button>
          <button onClick={handleClose} className={styles.close}>
            Close
          </button>
        </div>
      </div>
    );
  }
);

// ####################################################
// ####################################################
// ####################################################
// ####################################################

type TaskType = {
  id: number;
  isDone: boolean;
  message: string;
};

const Tasks: FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const inputEl = useRef<HTMLInputElement>(null);
  const openModalHandler = (): void => {
    setIsModalOpen(true);
    inputEl.current?.focus();
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.tasks}>
          {tasks.length === 0 ? (
            <p>There is no task!</p>
          ) : (
            tasks.map((task) => (
              <Task
                id={task.id}
                key={task.id}
                isDone={task.isDone}
                message={task.message}
                setTasks={setTasks}
              />
            ))
          )}
        </div>
        <div className={styles.top}>
          <button onClick={openModalHandler}>
            <GrFormAdd /> New task
          </button>
        </div>
      </div>
      <AddNewModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        inputText={inputText}
        setInputText={setInputText}
        ref={inputEl}
        setTasks={setTasks}
      />
    </>
  );
};

export default Tasks;
