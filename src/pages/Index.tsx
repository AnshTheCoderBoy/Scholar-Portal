
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { StudentProvider } from '@/contexts/StudentContext';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import LoginForm from '@/components/LoginForm';
import AppSidebar from '@/components/AppSidebar';
import Dashboard from '@/components/Dashboard';
import StudentList from '@/components/StudentList';
import StudentForm from '@/components/StudentForm';
import Reports from '@/components/Reports';
import Settings from '@/components/Settings';

const MainApp = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingStudentId, setEditingStudentId] = useState<string | undefined>();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const handleEditStudent = (studentId: string) => {
    setEditingStudentId(studentId);
    setActiveTab('edit-student');
  };

  const handleStudentFormSuccess = () => {
    setEditingStudentId(undefined);
    setActiveTab('students');
  };

  const handleStudentFormCancel = () => {
    setEditingStudentId(undefined);
    setActiveTab('students');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentList onEditStudent={handleEditStudent} />;
      case 'add-student':
        return (
          <StudentForm
            onCancel={() => setActiveTab('students')}
            onSuccess={handleStudentFormSuccess}
          />
        );
      case 'edit-student':
        return (
          <StudentForm
            studentId={editingStudentId}
            onCancel={handleStudentFormCancel}
            onSuccess={handleStudentFormSuccess}
          />
        );
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-white lg:hidden">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Scholar Records</h1>
          </div>
          <div className="flex-1 p-4 lg:p-8 bg-gray-50">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <StudentProvider>
        <MainApp />
      </StudentProvider>
    </AuthProvider>
  );
};

export default Index;
