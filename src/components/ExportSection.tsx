
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileText, Download, FileIcon, File } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const ExportSection = () => {
  const handleExport = (format: string) => {
    toast.success(`Dati esportati in formato ${format.toUpperCase()}`, {
      description: "Il file è stato scaricato sul tuo dispositivo"
    });
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5 text-primary" />
          Esportazione Dati
        </CardTitle>
        <CardDescription>
          Esporta i tuoi dati in vari formati
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Formato di esportazione</h3>
            <RadioGroup defaultValue="pdf" className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center cursor-pointer">
                  <FileText className="h-5 w-5 mr-2 text-red-500" />
                  <div>
                    <p className="font-medium">PDF</p>
                    <p className="text-xs text-muted-foreground">Ideale per la stampa</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center cursor-pointer">
                  <FileIcon className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <p className="font-medium">CSV</p>
                    <p className="text-xs text-muted-foreground">Per analisi di dati</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Dati da includere</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="personal" defaultChecked />
                <Label htmlFor="personal">Dati personali</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="attacks" defaultChecked />
                <Label htmlFor="attacks">Storico attacchi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="medications" defaultChecked />
                <Label htmlFor="medications">Medicazioni</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="questionnaires" defaultChecked />
                <Label htmlFor="questionnaires">Questionari compilati</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="wearable" defaultChecked />
                <Label htmlFor="wearable">Dati wearable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="charts" defaultChecked />
                <Label htmlFor="charts">Grafici e visualizzazioni</Label>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button className="flex-1" onClick={() => handleExport('pdf')}>
              <Download className="mr-2 h-4 w-4" />
              Esporta PDF
            </Button>
            <Button className="flex-1" variant="outline" onClick={() => handleExport('csv')}>
              <Download className="mr-2 h-4 w-4" />
              Esporta CSV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportSection;
