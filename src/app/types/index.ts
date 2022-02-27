export interface ITasks {
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
