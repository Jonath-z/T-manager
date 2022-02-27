import { create } from 'domain';
import React, { LegacyRef, useEffect, useRef } from 'react';
import { ITasks } from '../../../../types';

interface IProps {
  name: string | undefined;
  tasks: ITasks[];
}

const Tasks = ({ tasks }: IProps) => {
  const targetRef = useRef<LegacyRef<HTMLDivElement> | undefined>();
  // console.log(targetRef.current?.valueOf());
  const tasksDiv = document.querySelectorAll('.tasks');
  console.log(tasksDiv[0]);

  // let prevRatio = 0.0;

  // const createObserver = () => {
  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: buildThresholdList(),
  //   };
  //   const observer = new IntersectionObserver(
  //     handleIntersect,
  //     options,
  //   );
  //   observer.observe(targetRef.current as unknown as Element);
  // };

  // function buildThresholdList() {
  //   const thresholds = [];
  //   const numSteps = 20;

  //   for (let i = 1.0; i <= numSteps; i++) {
  //     const ratio = i / numSteps;
  //     thresholds.push(ratio);
  //   }

  //   thresholds.push(0);
  //   return thresholds;
  // }

  // function handleIntersect(
  //   entries: any[] | NodeListOf<Element>,
  //   observer: any,
  // ) {
  //   entries = tasksDiv;
  //   entries.forEach((entry) => {
  //     console.log(entry.isIntersecting);
  //     // console.log(observer);
  //     // if (entry.intersectionRatio > prevRatio) {
  //     //   console.log(entry);
  //     // } else {
  //     //   console.log(entry);
  //     // }

  //     // prevRatio = entry.intersectionRatio;
  //   });
  // }

  // useEffect(() => {
  //   createObserver();
  // }, []);

  return (
    <div
      className="px-8 mt-5 absolute bottom-0 left-0 right-0 top-44 overflow-y-scroll"
      ref={targetRef as React.RefObject<HTMLDivElement>}
    >
      {tasks.map((userTask, index) => {
        return (
          <div
            key={`index_${index}`}
            className="tasks bg-slate-600 py-5 px-2 rounded-lg mt-3 flex items-center"
          >
            <input
              type="checkbox"
              name="task"
              className="form-checkbox rounded-full outline-hidden text-[#00B4D8]"
            />
            <label
              htmlFor="task"
              className="pl-2 text-white font-Mulish inline-flex justify-between items-center w-full"
            >
              {userTask.title}
              <span className="text-xs text-slate-200">
                {userTask.start_time} up to {userTask.end_time}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
