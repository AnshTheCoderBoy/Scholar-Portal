
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student } from '@/types/student';

interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudent: (id: string) => Student | undefined;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};

const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@email.com',
    studentId: 'STU001',
    grade: '10th Grade',
    dateOfBirth: '2008-03-15',
    phoneNumber: '(555) 123-4567',
    address: '123 Main St, Anytown, ST 12345',
    guardianName: 'Michael Johnson',
    guardianPhone: '(555) 123-4568',
    enrollmentDate: '2024-08-15',
    status: 'active'
  },
  {
    id: '2',
    firstName: 'Liam',
    lastName: 'Smith',
    email: 'liam.smith@email.com',
    studentId: 'STU002',
    grade: '11th Grade',
    dateOfBirth: '2007-07-22',
    phoneNumber: '(555) 234-5678',
    address: '456 Oak Ave, Somewhere, ST 12346',
    guardianName: 'Sarah Smith',
    guardianPhone: '(555) 234-5679',
    enrollmentDate: '2023-08-15',
    status: 'active'
  },
  {
    id: '3',
    firstName: 'Olivia',
    lastName: 'Brown',
    email: 'olivia.brown@email.com',
    studentId: 'STU003',
    grade: '12th Grade',
    dateOfBirth: '2006-11-08',
    phoneNumber: '(555) 345-6789',
    address: '789 Pine Rd, Elsewhere, ST 12347',
    guardianName: 'David Brown',
    guardianPhone: '(555) 345-6790',
    enrollmentDate: '2022-08-15',
    status: 'active'
  }
];

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString()
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, studentData: Partial<Student>) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, ...studentData } : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const getStudent = (id: string) => {
    return students.find(student => student.id === id);
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent, getStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
