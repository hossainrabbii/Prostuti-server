export interface IUser {
  _id?: string;
  email: string;
  password: string;
  facebook?: string;
  name:string,
  role: "student" | "admin";
  isActive: boolean; 
  appPassword?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}
