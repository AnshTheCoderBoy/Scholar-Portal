
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useStudents } from '@/contexts/StudentContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Users, TrendingUp, Calendar } from 'lucide-react';

const Reports = () => {
  const { students } = useStudents();

  const gradeData = ['9th Grade', '10th Grade', '11th Grade', '12th Grade'].map(grade => ({
    grade: grade.replace(' Grade', ''),
    students: students.filter(s => s.grade === grade).length
  }));

  const statusData = [
    { name: 'Active', value: students.filter(s => s.status === 'active').length },
    { name: 'Inactive', value: students.filter(s => s.status === 'inactive').length },
    { name: 'Graduated', value: students.filter(s => s.status === 'graduated').length }
  ];

  const totalStudents = students.length;
  const averageAge = students.length > 0 
    ? Math.round(students.reduce((sum, student) => {
        const age = new Date().getFullYear() - new Date(student.dateOfBirth).getFullYear();
        return sum + age;
      }, 0) / students.length)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-600">Student statistics and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-600">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Age</p>
                <p className="text-3xl font-bold text-green-600">{averageAge}</p>
              </div>
              <div className="p-3 rounded-full bg-green-600">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-3xl font-bold text-purple-600">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                <p className="text-3xl font-bold text-orange-600">24</p>
              </div>
              <div className="p-3 rounded-full bg-orange-600">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Students by Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusData.map((item, index) => {
                const percentage = totalStudents > 0 ? (item.value / totalStudents) * 100 : 0;
                const colors = ['bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
                return (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.name}</span>
                      <span>{item.value} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${colors[index]} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 rounded-full">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-gray-600">{student.grade} • {student.studentId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-600">Enrolled</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
