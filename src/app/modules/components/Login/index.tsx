import React from 'react';
import EmailButton from './_modules/EmailButton';
import taskManagement from '../../static/task-management.png';
// import ToDoVector from '../../__modules__/vectors/toDoListVector';

const LoginPage = (): JSX.Element => {
  return (
    <div className="pt-5 absolute top-0 bottom-0 left-0 right-0 bg-[#051125]">
      <img
        src={taskManagement}
        alt="taskManagement"
        className="m-auto"
      />
      <p className="px-5 text-5xl pt-10 text-white font-Mulish font-extrabold">
        Management everything with one app
      </p>
      <div className="absolute left-0 right-0 bottom-0">
        <EmailButton />
      </div>
    </div>
  );
};

export default LoginPage;
