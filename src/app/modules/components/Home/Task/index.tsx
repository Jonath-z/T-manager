interface ITasks {
  id: string;
  title: string;
  content: string;
  remind: boolean;
  start_time: string;
  end_time: string;
  completed: boolean;
  owner_name: string;
  owner_email: string;
}
interface IProps {
  name: string | undefined;
  tasks: ITasks[];
}

const Tasks = ({ tasks }: IProps) => {
  return (
    <div>
      {tasks.map((userTask, index) => {
        return (
          <div key={`index_${index}`}>
            <p>{userTask.title} </p>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
