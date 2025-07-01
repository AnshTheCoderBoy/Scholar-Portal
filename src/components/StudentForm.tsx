import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useStudents } from '@/contexts/StudentContext';
import { Student } from '@/types/student';
import { toast } from 'sonner';
import { Save, X } from 'lucide-react';

interface StudentFormProps {
  studentId?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const StudentForm = ({ studentId, onCancel, onSuccess }: StudentFormProps) => {
  const { addStudent, updateStudent, getStudent } = useStudents();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    grade: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    enrollmentDate: '',
    status: 'active' as 'active' | 'inactive' | 'graduated'
  });

  useEffect(() => {
    if (studentId) {
      const student = getStudent(studentId);
      if (student) {
        setFormData({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          studentId: student.studentId,
          grade: student.grade,
          dateOfBirth: student.dateOfBirth,
          phoneNumber: student.phoneNumber,
          address: student.address,
          guardianName: student.guardianName,
          guardianPhone: student.guardianPhone,
          enrollmentDate: student.enrollmentDate,
          status: student.status
        });
      }
    }
  }, [studentId, getStudent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (studentId) {
        updateStudent(studentId, formData);
        toast.success('Student updated successfully!');
      } else {
        addStudent(formData);
        toast.success('Student added successfully!');
      }
      onSuccess();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {studentId ? 'Edit Student' : 'Add New Student'}
          </h1>
          <p className="text-gray-600">
            {studentId ? 'Update student information' : 'Enter student details to create a new record'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID *</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleChange('studentId', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade *</Label>
                <Select value={formData.grade} onValueChange={(value) => handleChange('grade', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                    <SelectItem value="12th Grade">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Enrollment Date *</Label>
                <Input
                  id="enrollmentDate"
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={(e) => handleChange('enrollmentDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={(e) => handleChange('guardianName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianPhone">Guardian Phone</Label>
                <Input
                  id="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={(e) => handleChange('guardianPhone', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Saving...' : (studentId ? 'Update Student' : 'Add Student')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm;
