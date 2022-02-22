import React, { useState, useEffect, useContext, createContext, FC } from "react";
import Web3 from "web3";
import { TO_DO_CONTRACT_ADDRESS, TO_DO_CONTRACT_ABI } from "../../config";

const initialState = [{
    id: 'id',
    content: '',
    remind: false,
    start_time: '00:00',
    end_time: '00:00',
    completed: false,
    owner_name: '',
    owner_email: ''
        
}];

const TasksContext = createContext(initialState);
const AccountContext = createContext('');

export const useTasks = () => useContext(TasksContext);
export const useAccount = () => useContext(AccountContext);

const TasksProvider: FC = ({ children }): JSX.Element => {

    const [tasks, setTasks] = useState<any[]>([]);
    const [account, setAccount] = useState<string>('');

    const getTasks = (provider: any) => {
        (async () => {
            const Contract = new provider.eth.Contract(TO_DO_CONTRACT_ABI, TO_DO_CONTRACT_ADDRESS);

            try {
                console.log('in process ...')
                const data = await Contract.methods.tasks(1).call();
                const tasksCount = await Contract.taskCount(1).call();
                console.log(tasksCount);
                setTasks(data);
                console.log('process done');
            } catch (err) {
                if (err) {
                    console.log(err);
                }
            }
        })();
    }

    useEffect(() => {
        const load = async () => {

            const web3_provider = new Web3(Web3.givenProvider || 'http://localhost:8545');

            try {

                const account = await web3_provider.eth.requestAccounts();
                setAccount(account[0]);
                console.log(account[0]);
                // window.location.assign('/auth');
                getTasks(web3_provider);

            } catch (err) {

                alert('error when connecting to Metamask');
                console.log(err);
            }

        }
        load();
    }, []);

    return (
        <TasksContext.Provider value={tasks}>
            <AccountContext.Provider value={account}>
                {children}
            </AccountContext.Provider>
        </TasksContext.Provider>
    );
}

export default TasksProvider;