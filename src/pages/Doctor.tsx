
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
  FileText,
  Pills,
  PieChart,
  Share2,
  Languages,
  Download,
  MessageSquare,
  Settings
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PatientsList from '@/components/PatientsList';
import PatientDetails from '@/components/PatientDetails';
import { toast } from "sonner";

const Doctor = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("patients");
  
  const handleNotificationClick = () => {
    toast.success("Notifiche controllate", {
      description: "Tutte le notifiche sono state contrassegnate come lette"
    });
  };

  const handleExportData = () => {
    toast.success("Dati esportati", {
      description: "I dati del paziente sono stati esportati con successo"
    });
  };
  
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
          <Button className="glass-button" onClick={handleNotificationClick}>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5 md:grid-cols-5 lg:w-auto">
          <TabsTrigger value="patients">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Patients</span>
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="medications">
            <Pills className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Medications</span>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <PieChart className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <TabsContent value="patients" className="mt-0">
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
      </TabsContent>
      
      <TabsContent value="reports" className="mt-0">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Reports & Data Export
            </CardTitle>
            <CardDescription>
              Generate and export patient reports and data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Patient Summary</CardTitle>
                  <CardDescription>General overview of patient status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mt-2" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Generate PDF
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Attack History</CardTitle>
                  <CardDescription>Detailed narcolepsy episodes log</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mt-2" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Questionnaire Data</CardTitle>
                  <CardDescription>Compiled questionnaire responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mt-2" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Medication Log</CardTitle>
                  <CardDescription>Patient medication history</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mt-2" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Custom Report</CardTitle>
                  <CardDescription>Create a custom data report</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mt-2" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Build Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="medications" className="mt-0">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pills className="mr-2 h-5 w-5 text-primary" />
              Medication Tracking
            </CardTitle>
            <CardDescription>
              Monitor patient medication plans and adherence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Pills className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p>Select a patient first to view and manage their medication</p>
              <p className="text-sm mt-2">This section allows tracking prescriptions, adherence, and effects</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-0">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-primary" />
              Analytics Dashboard
            </CardTitle>
            <CardDescription>
              Comprehensive statistics and trend analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <PieChart className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p>The analytics dashboard will display here</p>
              <p className="text-sm mt-2">Track patterns, attack frequencies, treatment effectiveness, and more</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="settings" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="mr-2 h-5 w-5 text-primary" />
                Community Features
              </CardTitle>
              <CardDescription>
                Patient community and support settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Community Forum</h3>
                    <p className="text-sm text-muted-foreground">Enable patient community forum</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Support Groups</h3>
                    <p className="text-sm text-muted-foreground">Manage patient support groups</p>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Shared Experiences</h3>
                    <p className="text-sm text-muted-foreground">Patient testimonial settings</p>
                  </div>
                  <Button variant="outline">Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="mr-2 h-5 w-5 text-primary" />
                Language & Accessibility
              </CardTitle>
              <CardDescription>
                Modify language and accessibility options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Language Settings</h3>
                    <p className="text-sm text-muted-foreground">Set interface language</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge>EN</Badge>
                    <Badge variant="outline">IT</Badge>
                    <Badge variant="outline">DE</Badge>
                    <Badge variant="outline">FR</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Accessibility</h3>
                    <p className="text-sm text-muted-foreground">Configure accessibility features</p>
                  </div>
                  <Button variant="outline">Settings</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Configure patient reminder system</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Communication System
              </CardTitle>
              <CardDescription>
                Configure patient-doctor communication channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Templates
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Customize patient notifications</p>
                  <Button variant="outline" className="mt-3 w-full">Edit Templates</Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Appointment System
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Configure online appointments</p>
                  <Button variant="outline" className="mt-3 w-full">Settings</Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messaging System
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Patient-doctor secure chat</p>
                  <Button variant="outline" className="mt-3 w-full">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </div>
  );
};

export default Doctor;
