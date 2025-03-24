
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  Activity, 
  ClipboardCheck, 
  Bell, 
  Search,
  FileText
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PatientsList from '@/components/PatientsList';
import PatientDetails from '@/components/PatientDetails';

const Doctor = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 max-w-7xl mx-auto gradient-bg">
      <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Doctor Portal</h1>
          <p className="text-gray-600">Monitor and manage your narcolepsy patients</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search patients..." 
              className="pl-8 w-full" 
            />
          </div>
          <Button className="glass-button">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Patients
            </CardTitle>
            <CardDescription>
              Manage your patient list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PatientsList 
              onSelectPatient={setSelectedPatient} 
              selectedPatient={selectedPatient}
            />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Patient Overview</CardTitle>
            <CardDescription>
              {selectedPatient ? "Detailed information and management" : "Select a patient to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedPatient ? (
              <PatientDetails patientId={selectedPatient} />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="mx-auto h-12 w-12 opacity-20 mb-3" />
                <p>Select a patient from the list to view their details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Doctor;
