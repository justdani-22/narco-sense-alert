
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Calendar, 
  FileText, 
  Heart, 
  Phone, 
  MessageSquare,
  Clock,
  ClipboardList,
  Brain, 
  Upload,
  Download,
  Edit
} from 'lucide-react';

// Dati di esempio per il paziente selezionato
const mockPatients = {
  "1": { 
    id: "1", 
    name: "Maria Johnson", 
    age: 32,
    gender: "Female",
    email: "maria.j@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY",
    diagnosis: "Narcolepsy Type 1",
    diagnosisDate: "2021-03-15",
    status: "At Risk", 
    lastAttack: "2023-10-10",
    medication: [
      { name: "Modafinil", dosage: "200mg", frequency: "Morning" },
      { name: "Sodium Oxybate", dosage: "4.5g", frequency: "Bedtime" }
    ],
    attacks: [
      { date: "2023-10-10", time: "14:30", duration: "8 minutes", severity: "Moderate" },
      { date: "2023-09-25", time: "10:15", duration: "12 minutes", severity: "Severe" },
      { date: "2023-09-14", time: "16:45", duration: "5 minutes", severity: "Mild" }
    ],
    notes: "Patient reports improved sleep quality with new medication regimen. Still experiencing occasional cataplexy when emotionally triggered."
  },
  // Altri pazienti di mockup...
};

interface PatientDetailsProps {
  patientId: string;
}

const PatientDetails = ({ patientId }: PatientDetailsProps) => {
  const patient = mockPatients[patientId as keyof typeof mockPatients];
  
  if (!patient) {
    return <div>Patient not found</div>;
  }
  
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">
          <Activity className="mr-2 h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="history">
          <Calendar className="mr-2 h-4 w-4" />
          Attack History
        </TabsTrigger>
        <TabsTrigger value="questionnaires">
          <ClipboardList className="mr-2 h-4 w-4" />
          Questionnaires
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText className="mr-2 h-4 w-4" />
          Reports
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{patient.name}</h3>
                  <p className="text-muted-foreground">{patient.age} years, {patient.gender}</p>
                  <Badge 
                    className={`mt-1 ${
                      patient.status === "Critical" ? "bg-red-500" :
                      patient.status === "At Risk" ? "bg-amber-500" :
                      "bg-green-500"
                    }`}
                  >
                    {patient.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-muted-foreground">Diagnosis</div>
                <div>{patient.diagnosis}</div>
                
                <div className="text-muted-foreground">Diagnosis Date</div>
                <div>{new Date(patient.diagnosisDate).toLocaleDateString()}</div>
                
                <div className="text-muted-foreground">Email</div>
                <div>{patient.email}</div>
                
                <div className="text-muted-foreground">Phone</div>
                <div>{patient.phone}</div>
                
                <div className="text-muted-foreground">Address</div>
                <div>{patient.address}</div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Medication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.medication.map((med, idx) => (
                  <div key={idx} className="p-3 border rounded-lg">
                    <div className="font-medium">{med.name}</div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Dosage: {med.dosage}</span>
                      <span className="text-muted-foreground">Frequency: {med.frequency}</span>
                    </div>
                  </div>
                ))}
                
                <Button className="mt-2" size="sm" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Adjust Medication
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Attacks</CardTitle>
              <CardDescription>
                Last 3 narcolepsy episodes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.attacks.map((attack, idx) => (
                  <div key={idx} className="p-3 border rounded-lg flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {new Date(attack.date).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className={
                          attack.severity === "Severe" ? "text-red-600 border-red-200 bg-red-50" :
                          attack.severity === "Moderate" ? "text-amber-600 border-amber-200 bg-amber-50" :
                          "text-green-600 border-green-200 bg-green-50"
                        }>
                          {attack.severity}
                        </Badge>
                      </div>
                      <div className="flex gap-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {attack.time}
                        </span>
                        <span>Duration: {attack.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                View Full History
              </Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Clinical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{patient.notes}</p>
              
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
                <Button size="sm" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Records
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="history" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Attack History</CardTitle>
            <CardDescription>
              Complete log of narcolepsy episodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p>Detailed attack history will be displayed here</p>
              <Button className="mt-4" variant="outline">Export History</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="questionnaires" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire Responses</CardTitle>
            <CardDescription>
              Patient responses to post-attack questionnaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <ClipboardList className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p>Questionnaire responses will be displayed here</p>
              <Button className="mt-4" variant="outline">View Responses</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reports" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Medical Reports</CardTitle>
            <CardDescription>
              Generate and download medical reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p>Medical reports generation tools will be displayed here</p>
              <Button className="mt-4" variant="outline">Generate New Report</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PatientDetails;
