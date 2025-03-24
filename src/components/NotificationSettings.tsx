
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Clock, Pill, ClipboardList, MessageSquare } from 'lucide-react';
import { toast } from "sonner";

const NotificationSettings = () => {
  const handleSaveNotifications = () => {
    toast.success("Notifiche salvate", {
      description: "Le impostazioni di notifica sono state aggiornate"
    });
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5 text-primary" />
          Sistema di Notifiche
        </CardTitle>
        <CardDescription>
          Configura promemoria e avvisi personalizzati
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Promemoria medicinali</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <Pill className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Promemoria farmaci</h4>
                    <p className="text-sm text-muted-foreground">Ricevi notifiche per i tuoi medicinali</p>
                  </div>
                </div>
                <Switch defaultChecked id="medication-reminders" />
              </div>
              
              <div className="pl-4 space-y-2">
                <RadioGroup defaultValue="30min">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10min" id="r1" />
                    <Label htmlFor="r1">10 minuti prima</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="30min" id="r2" />
                    <Label htmlFor="r2">30 minuti prima</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1hour" id="r3" />
                    <Label htmlFor="r3">1 ora prima</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Questionari e monitoraggio</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <ClipboardList className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Promemoria questionari</h4>
                    <p className="text-sm text-muted-foreground">Ricevi promemoria per completare i questionari</p>
                  </div>
                </div>
                <Switch defaultChecked id="questionnaire-reminders" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Avvisi dopo attacco</h4>
                    <p className="text-sm text-muted-foreground">Ricevi notifiche dopo un attacco rilevato</p>
                  </div>
                </div>
                <Switch defaultChecked id="attack-alerts" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Comunicazioni</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Messaggi dal medico</h4>
                    <p className="text-sm text-muted-foreground">Ricevi notifiche per i messaggi dal tuo medico</p>
                  </div>
                </div>
                <Switch defaultChecked id="doctor-messages" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Aggiornamenti community</h4>
                    <p className="text-sm text-muted-foreground">Ricevi notifiche dalla comunità</p>
                  </div>
                </div>
                <Switch id="community-updates" />
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full" onClick={handleSaveNotifications}>Salva impostazioni</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
