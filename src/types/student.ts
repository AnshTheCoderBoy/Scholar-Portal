
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  grade: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'teacher' | 'staff';
}
