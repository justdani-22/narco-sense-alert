
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Watch, Bluetooth, RefreshCw, PlayCircle, StopCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useSimulatedData } from '@/hooks/useSimulatedData';
import WearableSelector from '@/components/WearableSelector';
import { toast } from "sonner";

interface WearableSectionProps {
  className?: string;
}

const WearableSection = ({ className }: WearableSectionProps) => {
  const [monitoring, setMonitoring] = useState(false);
  const [includeAttack, setIncludeAttack] = useState(false);
  const data = useSimulatedData(includeAttack);
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  
  const handleStartMonitoring = () => {
    setMonitoring(true);
    toast.success("Monitoraggio avviato", {
      description: "I dati del wearable vengono ora registrati in tempo reale"
    });
  };
  
  const handleStopMonitoring = () => {
    setMonitoring(false);
    toast.info("Monitoraggio interrotto", {
      description: "I dati sono stati salvati nel profilo dell'utente"
    });
  };
  
  const handleHealthAppConnect = () => {
    toast.success("Connessione app salute", {
      description: "Connessione con Apple Health/Google Fit avviata. Segui le istruzioni sull'app."
    });
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Watch className="mr-2 h-5 w-5 text-primary" />
          Integrazione Wearable
        </CardTitle>
        <CardDescription>
          Monitoraggio in tempo reale tramite dispositivi indossabili
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-1">
            <WearableSelector />
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autosync" className="cursor-pointer">Auto-sincronizzazione</Label>
                <Switch id="autosync" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="alerts" className="cursor-pointer">Avvisi attacco</Label>
                <Switch id="alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="background" className="cursor-pointer">Registro in background</Label>
                <Switch id="background" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="simulate-attack" className="cursor-pointer">Simula attacco (demo)</Label>
                <Switch id="simulate-attack" checked={includeAttack} onCheckedChange={setIncludeAttack} />
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              {!monitoring ? (
                <Button className="w-full" onClick={handleStartMonitoring}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Avvia monitoraggio
                </Button>
              ) : (
                <Button className="w-full" variant="destructive" onClick={handleStopMonitoring}>
                  <StopCircle className="mr-2 h-4 w-4" />
                  Ferma monitoraggio
                </Button>
              )}
            </div>
            
            <Button className="w-full mt-2" variant="outline" onClick={handleHealthAppConnect}>
              <Heart className="mr-2 h-4 w-4" />
              Connetti App Salute
            </Button>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="realtime">
              <TabsList className="mb-4">
                <TabsTrigger value="realtime">Tempo Reale</TabsTrigger>
                <TabsTrigger value="daily">Report Giornaliero</TabsTrigger>
              </TabsList>
              
              <TabsContent value="realtime" className="h-[300px]">
                <div className="border rounded-lg p-4 h-full">
                  <div className="text-sm font-medium mb-2">Monitoraggio Fisiologico</div>
                  
                  <ChartContainer
                    config={{
                      heart: { 
                        color: "#ef4444", 
                        label: "Heart Rate"
                      },
                      oxygen: { 
                        color: "#3b82f6", 
                        label: "Oxygen"
                      },
                      hrv: { 
                        color: "#84cc16", 
                        label: "HRV"
                      },
                      blood: { 
                        color: "#f97316",
                        label: "Blood Pressure"
                      }
                    }}
                  >
                    <LineChart
                      data={[
                        ...data.heartRate.map((point) => ({
                          time: formatTimestamp(point.timestamp),
                          heart: point.value,
                          hrv: data.brainActivity.find(p => p.timestamp === point.timestamp)?.value,
                          oxygen: data.oxygenLevel.find(p => p.timestamp === point.timestamp)?.value,
                          blood: data.bloodPressure.find(p => p.timestamp === point.timestamp)?.value,
                        }))
                      ]}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent 
                            nameKey="dataKey"
                            labelKey="time"
                          />
                        }
                      />
                      <Line 
                        type="monotone" 
                        dataKey="heart" 
                        stroke="var(--color-heart)" 
                        strokeWidth={2} 
                        dot={false} 
                        activeDot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="oxygen" 
                        stroke="var(--color-oxygen)" 
                        strokeWidth={2} 
                        dot={false} 
                        activeDot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="hrv" 
                        stroke="var(--color-hrv)" 
                        strokeWidth={2} 
                        dot={false} 
                        activeDot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="blood" 
                        stroke="var(--color-blood)" 
                        strokeWidth={2} 
                        dot={false} 
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="daily">
                <div className="text-center py-10 text-muted-foreground border rounded-lg">
                  <Activity className="mx-auto h-12 w-12 opacity-20 mb-3" />
                  <p>Il report giornaliero mostrerà qui le metriche aggregate nelle ultime 24 ore</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WearableSection;
