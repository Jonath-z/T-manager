import React from 'react';
import EmailButton from './_modules/EmailButton';
import taskManagement from '../../modules/static/task-management.png';
// import ToDoVector from '../../__modules__/vectors/toDoListVector';

const LoginPage = (): JSX.Element => {
  return (
    <div className="pt-5 absolute top-0 bottom-0 left-0 right-0 bg-[#051125]">
      <img
        src={taskManagement}
        alt="taskManagement"
        className="m-auto"
      />
      <p className="text-center text-2xl font-Mulish text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">
        T-Manager
      </p>
      <p className="px-5 2xl:text-5xl 2xl:pt-10 md:text-4xl md:pt-0 text-white font-Mulish font-extrabold text-center">
        Manage your tasks with one app
      </p>
      <div className="absolute left-0 right-0 bottom-0 2xl:bottom-40">
        <EmailButton />
      </div>
    </div>
  );
};

export default LoginPage;
