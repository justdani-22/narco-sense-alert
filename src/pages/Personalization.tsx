
import { useState } from 'react';
import { 
  Palette, 
  Globe, 
  Eye, 
  Layout, 
  RotateCcw, 
  Check, 
  Heart,
  Brain,
  TrendingUp, 
  Droplets,
  Smile
} from 'lucide-react';
import { usePreferences, useTranslation } from '@/context/PreferenceContext';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

type WidgetOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
};

const Personalization = () => {
  const { preferences, updatePreference, toggleWidget, resetPreferences } = usePreferences();
  const { t } = useTranslation();
  const [tempPreferences, setTempPreferences] = useState({ ...preferences });
  
  const handleSave = () => {
    // Aggiorna tutte le preferenze
    Object.entries(tempPreferences).forEach(([key, value]) => {
      updatePreference(key as keyof typeof preferences, value);
    });
    
    toast.success("Preferenze salvate", {
      description: "Le tue personalizzazioni sono state applicate"
    });
  };
  
  const handleReset = () => {
    resetPreferences();
    setTempPreferences({ ...preferences });
    
    toast.info("Preferenze reimpostate", {
      description: "Tutte le impostazioni sono state ripristinate ai valori predefiniti"
    });
  };
  
  const widgetOptions: WidgetOption[] = [
    { 
      id: 'heartRate', 
      name: 'Frequenza cardiaca', 
      icon: <Heart className="h-5 w-5 text-red-500" />,
      description: 'Monitoraggio della frequenza cardiaca' 
    },
    { 
      id: 'oxygenLevel', 
      name: 'Livello di ossigeno', 
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      description: 'Monitoraggio della saturazione di ossigeno' 
    },
    { 
      id: 'bloodPressure', 
      name: 'Pressione sanguigna', 
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      description: 'Monitoraggio della pressione arteriosa' 
    },
    { 
      id: 'brainActivity', 
      name: 'Attività cerebrale', 
      icon: <Brain className="h-5 w-5 text-green-500" />,
      description: 'Monitoraggio dell\'attività cerebrale' 
    },
    { 
      id: 'wearable', 
      name: 'Wearable', 
      icon: <Smile className="h-5 w-5 text-amber-500" />,
      description: 'Connessione a dispositivi indossabili' 
    },
    { 
      id: 'quickActions', 
      name: 'Azioni rapide', 
      icon: <Layout className="h-5 w-5 text-gray-500" />,
      description: 'Accesso veloce alle funzioni principali' 
    }
  ];
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 max-w-4xl mx-auto gradient-bg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Personalizzazione</h1>
        <p className="text-gray-600">
          Personalizza l'applicazione in base alle tue preferenze
        </p>
      </div>
      
      <Tabs defaultValue="theme" className="animate-fade-in">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="theme">
            <Palette className="h-4 w-4 mr-2" />
            <span>Aspetto</span>
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-4 w-4 mr-2" />
            <span>Lingua</span>
          </TabsTrigger>
          <TabsTrigger value="accessibility">
            <Eye className="h-4 w-4 mr-2" />
            <span>Accessibilità</span>
          </TabsTrigger>
          <TabsTrigger value="widgets">
            <Layout className="h-4 w-4 mr-2" />
            <span>Widget</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Scheda tema */}
        <TabsContent value="theme">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Personalizza tema</CardTitle>
              <CardDescription>
                Scegli il tema che preferisci per l'app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema colore</Label>
                <div className="grid grid-cols-5 gap-3">
                  {['light', 'dark', 'blue', 'purple', 'green'].map((theme) => (
                    <div 
                      key={theme}
                      className={`
                        rounded-lg p-4 cursor-pointer border-2 transition-all
                        ${tempPreferences.theme === theme ? 'border-primary' : 'border-transparent'}
                        theme-${theme} bg-background
                      `}
                      onClick={() => setTempPreferences({
                        ...tempPreferences,
                        theme: theme as any
                      })}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-full h-10 rounded-md mb-2 bg-primary`}></div>
                        <span className="text-xs capitalize">{theme}</span>
                        {tempPreferences.theme === theme && (
                          <Check className="h-4 w-4 text-primary mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Animazioni</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Attiva animazioni UI</span>
                  <Switch
                    checked={tempPreferences.animations}
                    onCheckedChange={(checked) => setTempPreferences({
                      ...tempPreferences,
                      animations: checked
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Scheda lingua */}
        <TabsContent value="language">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Impostazioni lingua</CardTitle>
              <CardDescription>
                Scegli la lingua preferita per l'interfaccia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="language">Lingua</Label>
                <Select 
                  value={tempPreferences.language}
                  onValueChange={(value) => setTempPreferences({
                    ...tempPreferences,
                    language: value as any
                  })}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Seleziona lingua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Scheda accessibilità */}
        <TabsContent value="accessibility">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Accessibilità</CardTitle>
              <CardDescription>
                Configura le opzioni per migliorare l'accessibilità
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Dimensione testo</Label>
                <div className="space-y-4">
                  <Select 
                    value={tempPreferences.fontSize}
                    onValueChange={(value) => setTempPreferences({
                      ...tempPreferences,
                      fontSize: value as any
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona dimensione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Piccolo</SelectItem>
                      <SelectItem value="medium">Medio</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="text-xs">
                    <p className={tempPreferences.fontSize === 'small' ? 'font-bold' : ''}>
                      Testo piccolo
                    </p>
                    <p className={tempPreferences.fontSize === 'medium' ? 'font-bold' : ''}>
                      Testo medio
                    </p>
                    <p className={tempPreferences.fontSize === 'large' ? 'font-bold text-lg' : ''}>
                      Testo grande
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Alto contrasto</Label>
                    <p className="text-sm text-muted-foreground">
                      Migliora la leggibilità aumentando il contrasto
                    </p>
                  </div>
                  <Switch
                    checked={tempPreferences.highContrast}
                    onCheckedChange={(checked) => setTempPreferences({
                      ...tempPreferences,
                      highContrast: checked
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Modalità screen reader</Label>
                    <p className="text-sm text-muted-foreground">
                      Ottimizza l'interfaccia per l'uso con screen reader
                    </p>
                  </div>
                  <Switch
                    checked={tempPreferences.screenReader}
                    onCheckedChange={(checked) => setTempPreferences({
                      ...tempPreferences,
                      screenReader: checked
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Scheda widget */}
        <TabsContent value="widgets">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Widget Dashboard</CardTitle>
              <CardDescription>
                Personalizza i widget visualizzati nella tua dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {widgetOptions.map((widget) => (
                  <div 
                    key={widget.id}
                    className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox 
                      id={widget.id}
                      checked={preferences.enabledWidgets.includes(widget.id as any)}
                      onCheckedChange={() => toggleWidget(widget.id as any)}
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor={widget.id}
                        className="flex items-center cursor-pointer"
                      >
                        {widget.icon}
                        <span className="ml-2 font-medium">{widget.name}</span>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {widget.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleReset}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Ripristina impostazioni
        </Button>
        
        <Button onClick={handleSave}>
          <Check className="mr-2 h-4 w-4" />
          Salva preferenze
        </Button>
      </div>
    </div>
  );
};

export default Personalization;
