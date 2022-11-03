export enum Role {
  Teacher = 'Teacher',
  Student = 'Student',
}

export interface IUser {
  name: string;
  role: Role;
}
