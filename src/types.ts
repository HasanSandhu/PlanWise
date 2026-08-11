export type Category = "Study" | "Personal" | "Work";
export type Priority = "Low" | "Medium" | "High";

export type Task = {
  id: string;
  title: string;
  category: Category;
  due: string;
  priority: Priority;
  description?: string;
  completed: boolean;
};

export type ScreenName =
  | "Home"
  | "Calendar"
  | "Tasks"
  | "Profile"
  | "TaskForm";
