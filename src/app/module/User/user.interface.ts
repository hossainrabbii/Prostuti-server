export interface IUser {
  _id?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isVerified: boolean; // NEW
  appPassword?: string; // NEW
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ITokenPayload {
  id: string;
  email: string;
  role: "user" | "admin";
  // isVerified: boolean; // NEW
}