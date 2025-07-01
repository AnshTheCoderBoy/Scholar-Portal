
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStudents } from '@/contexts/StudentContext';
import { toast } from 'sonner';
import { Search, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';

interface StudentListProps {
  onEditStudent: (studentId: string) => void;
}

const StudentList = ({ onEditStudent }: StudentListProps) => {
  const { students, deleteStudent } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteStudent(id);
      toast.success('Student deleted successfully');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-yellow-100 text-yellow-800',
      graduated: 'bg-purple-100 text-purple-800'
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Students</h1>
          <p className="text-gray-600">Manage student records and information</p>
        </div>
        <div className="text-sm text-gray-600">
          {filteredStudents.length} of {students.length} students
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {student.firstName} {student.lastName}
                  </CardTitle>
                  <p className="text-sm text-gray-600">ID: {student.studentId}</p>
                </div>
                <Badge className={getStatusBadge(student.status)}>
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{student.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{student.address}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Grade: <strong>{student.grade}</strong></span>
                  <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditStudent(student.id)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(student.id, `${student.firstName} ${student.lastName}`)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'No students have been added yet'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentList;
