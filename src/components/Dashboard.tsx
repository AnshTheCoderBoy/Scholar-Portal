
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useStudents } from '@/contexts/StudentContext';
import { Users, UserCheck, UserX, GraduationCap } from 'lucide-react';

const Dashboard = () => {
  const { students } = useStudents();

  const activeStudents = students.filter(s => s.status === 'active').length;
  const inactiveStudents = students.filter(s => s.status === 'inactive').length;
  const graduatedStudents = students.filter(s => s.status === 'graduated').length;

  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: Users,
      color: 'bg-blue-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: UserCheck,
      color: 'bg-green-600',
      textColor: 'text-green-600'
    },
    {
      title: 'Inactive Students',
      value: inactiveStudents,
      icon: UserX,
      color: 'bg-yellow-600',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Graduated',
      value: graduatedStudents,
      icon: GraduationCap,
      color: 'bg-purple-600',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of student records and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-600 rounded-full">
                  <UserCheck className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">New student enrolled</p>
                  <p className="text-xs text-gray-600">Emma Johnson joined 10th Grade</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-600 rounded-full">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Records updated</p>
                  <p className="text-xs text-gray-600">Student information synchronized</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['10th Grade', '11th Grade', '12th Grade'].map((grade) => {
                const count = students.filter(s => s.grade === grade).length;
                const percentage = students.length > 0 ? (count / students.length) * 100 : 0;
                return (
                  <div key={grade}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{grade}</span>
                      <span>{count} students</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
    </div>
  );
};

export default Dashboard;
