
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, CalendarCheck, Activity, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock data for medications
const mockMedications = [
  { 
    id: 1, 
    name: "Modafinil", 
    dosage: "200mg", 
    frequency: "Morning", 
    nextDose: "08:00",
    adherence: 92,
    effects: [
      { type: "positive", description: "Increased alertness during day" },
      { type: "negative", description: "Occasional headache" }
    ]
  },
  { 
    id: 2, 
    name: "Sodium Oxybate", 
    dosage: "4.5g", 
    frequency: "Bedtime", 
    nextDose: "22:00",
    adherence: 85,
    effects: [
      { type: "positive", description: "Improved nighttime sleep" },
      { type: "negative", description: "Nausea when taken with food" }
    ]
  },
  { 
    id: 3, 
    name: "Venlafaxine", 
    dosage: "75mg", 
    frequency: "Evening", 
    nextDose: "18:00",
    adherence: 78,
    effects: [
      { type: "positive", description: "Reduced cataplexy episodes" },
      { type: "negative", description: "Dry mouth, occasional dizziness" }
    ]
  }
];

interface MedicationTrackingProps {
  patientId?: string | null;
}

const MedicationTracking = ({ patientId }: MedicationTrackingProps) => {
  const handleTakeMedication = (id: number) => {
    toast.success("Farmaco registrato", {
      description: "L'assunzione del farmaco è stata registrata con successo"
    });
  };
  
  const handleExportData = () => {
    toast.success("Dati esportati", {
      description: "Lo storico dei farmaci è stato esportato in formato CSV"
    });
  };
  
  if (!patientId) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="mr-2 h-5 w-5 text-primary" />
            Tracciamento Farmaci
          </CardTitle>
          <CardDescription>
            Monitoraggio dell'assunzione di farmaci e dei loro effetti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Pill className="mx-auto h-12 w-12 opacity-20 mb-3" />
            <p>Seleziona un paziente prima per visualizzare e gestire i farmaci</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Pill className="mr-2 h-5 w-5 text-primary" />
              Tracciamento Farmaci
            </CardTitle>
            <CardDescription>
              Monitoraggio dell'assunzione di farmaci e dei loro effetti
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Nuovo
            </Button>
            <Button size="sm" variant="outline" onClick={handleExportData}>
              Esporta
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList className="mb-4">
            <TabsTrigger value="current">Farmaci Attuali</TabsTrigger>
            <TabsTrigger value="history">Storico</TabsTrigger>
            <TabsTrigger value="effects">Effetti</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <div className="space-y-4">
              {mockMedications.map((med) => (
                <div key={med.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-lg">{med.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • {med.frequency}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm flex items-center">
                      <CalendarCheck className="h-4 w-4 mr-1 text-primary" />
                      Prossima dose: {med.nextDose}
                    </span>
                    <Button 
                      size="sm" 
                      onClick={() => handleTakeMedication(med.id)}
                    >
                      Prendi ora
                    </Button>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Aderenza</span>
                      <span className="font-medium">{med.adherence}%</span>
                    </div>
                    <Progress value={med.adherence} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="text-center py-10 text-muted-foreground border rounded-lg">
              <Activity className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p>Lo storico dei farmaci assunti sarà visualizzato qui</p>
              <p className="text-sm mt-2">Cronologia completa dell'assunzione di farmaci e modifiche</p>
            </div>
          </TabsContent>
          
          <TabsContent value="effects">
            <div className="space-y-6">
              {mockMedications.map((med) => (
                <div key={med.id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-3">{med.name}</h3>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-green-600">Effetti positivi:</h4>
                    <ul className="pl-5 list-disc space-y-1">
                      {med.effects.filter(e => e.type === "positive").map((effect, idx) => (
                        <li key={idx} className="text-sm">{effect.description}</li>
                      ))}
                    </ul>
                    
                    <h4 className="text-sm font-medium text-red-600">Effetti collaterali:</h4>
                    <ul className="pl-5 list-disc space-y-1">
                      {med.effects.filter(e => e.type === "negative").map((effect, idx) => (
                        <li key={idx} className="text-sm">{effect.description}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicationTracking;
