
import { useState } from 'react';
import { Calendar, Brain, Clock, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data for attack history
const mockAttacks = [
  { id: 1, date: "2023-11-15", time: "14:30", duration: "8 minutes", severity: "Moderate", triggers: "Stress, Lack of sleep", notes: "Happened during a meeting" },
  { id: 2, date: "2023-11-02", time: "10:15", duration: "12 minutes", severity: "Severe", triggers: "Emotional reaction", notes: "Triggered by funny video" },
  { id: 3, date: "2023-10-28", time: "16:45", duration: "5 minutes", severity: "Mild", triggers: "Unknown", notes: "Brief episode while reading" },
  { id: 4, date: "2023-10-20", time: "09:30", duration: "10 minutes", severity: "Moderate", triggers: "Fatigue", notes: "Morning episode after poor sleep" },
  { id: 5, date: "2023-10-12", time: "13:20", duration: "15 minutes", severity: "Severe", triggers: "Emotional reaction", notes: "During family gathering" },
  { id: 6, date: "2023-10-05", time: "19:45", duration: "6 minutes", severity: "Mild", triggers: "Unknown", notes: "Evening episode while watching TV" },
];

// Attack statistics calculation
const calculateStatistics = (attacks: typeof mockAttacks) => {
  const total = attacks.length;
  const severeCount = attacks.filter(a => a.severity === "Severe").length;
  const moderateCount = attacks.filter(a => a.severity === "Moderate").length;
  const mildCount = attacks.filter(a => a.severity === "Mild").length;
  
  const averageDuration = attacks.reduce((acc, attack) => {
    const minutes = parseInt(attack.duration.split(' ')[0]);
    return acc + minutes;
  }, 0) / total;
  
  return {
    total,
    severeCount,
    moderateCount,
    mildCount,
    averageDuration: averageDuration.toFixed(1),
    mostCommonTrigger: "Emotional reaction"
  };
};

interface AttackHistoryProps {
  patientId?: string | null;
}

const AttackHistory = ({ patientId }: AttackHistoryProps) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const stats = calculateStatistics(mockAttacks);
  
  const handleExport = () => {
    toast.success("Dati esportati", {
      description: "Lo storico degli attacchi è stato esportato in formato CSV"
    });
  };
  
  if (!patientId) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Calendar className="mx-auto h-12 w-12 opacity-20 mb-3" />
        <p>Seleziona un paziente per visualizzare lo storico degli attacchi</p>
      </div>
    );
  }
  
  return (
    <Tabs defaultValue="attacks" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="attacks">Elenco Attacchi</TabsTrigger>
        <TabsTrigger value="statistics">Statistiche</TabsTrigger>
      </TabsList>
      
      <TabsContent value="attacks">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button 
              variant={viewMode === 'list' ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode('list')}
            >
              Lista
            </Button>
            <Button 
              variant={viewMode === 'calendar' ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              Calendario
            </Button>
          </div>
          <Button size="sm" variant="outline" onClick={handleExport}>
            Esporta CSV
          </Button>
        </div>
        
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {mockAttacks.map((attack) => (
              <div key={attack.id} className="p-3 border rounded-lg flex items-center">
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
                  <p className="text-sm mt-1">{attack.notes}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground border rounded-lg">
            <Calendar className="mx-auto h-12 w-12 opacity-20 mb-3" />
            <p>La visualizzazione calendario sarà implementata qui</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Totale Attacchi</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{stats.total}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Durata Media</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{stats.averageDuration} min</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Trigger Comune</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-bold">{stats.mostCommonTrigger}</CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuzione Severità</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-around">
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-red-100 border-4 border-red-400 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{stats.severeCount}</span>
              </div>
              <p className="text-sm font-medium">Severo</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{stats.moderateCount}</span>
              </div>
              <p className="text-sm font-medium">Moderato</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-green-100 border-4 border-green-400 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{stats.mildCount}</span>
              </div>
              <p className="text-sm font-medium">Lieve</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AttackHistory;
