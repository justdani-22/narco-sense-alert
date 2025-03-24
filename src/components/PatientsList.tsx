
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from 'lucide-react';

// Dati di esempio per i pazienti
const mockPatients = [
  { 
    id: "1", 
    name: "Maria Johnson", 
    status: "At Risk", 
    lastAttack: "2 days ago",
    image: null 
  },
  { 
    id: "2", 
    name: "Robert Smith", 
    status: "Stable", 
    lastAttack: "2 weeks ago",
    image: null 
  },
  { 
    id: "3", 
    name: "Emma Davis", 
    status: "Critical", 
    lastAttack: "Today",
    image: null 
  },
  { 
    id: "4", 
    name: "James Wilson", 
    status: "Stable", 
    lastAttack: "1 month ago",
    image: null 
  },
  { 
    id: "5", 
    name: "Sophia Martinez", 
    status: "At Risk", 
    lastAttack: "5 days ago",
    image: null 
  }
];

interface PatientsListProps {
  onSelectPatient: (patientId: string) => void;
  selectedPatient: string | null;
}

const PatientsList = ({ onSelectPatient, selectedPatient }: PatientsListProps) => {
  const [filter, setFilter] = useState("");
  
  const filteredPatients = mockPatients.filter(
    patient => patient.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Critical": return "bg-red-500";
      case "At Risk": return "bg-amber-500";
      case "Stable": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Filter patients..." 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
          className="pl-8 w-full"
        />
      </div>
      
      <div className="space-y-2">
        {filteredPatients.map((patient) => (
          <div 
            key={patient.id}
            onClick={() => onSelectPatient(patient.id)}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
              selectedPatient === patient.id 
                ? 'bg-primary/10 border border-primary/20' 
                : 'hover:bg-gray-100 border border-transparent'
            }`}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={patient.image || ""} alt={patient.name} />
                <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div 
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(patient.status)}`} 
              />
            </div>
            
            <div className="ml-3 flex-1">
              <p className="font-medium text-sm">{patient.name}</p>
              <p className="text-xs text-muted-foreground">Last attack: {patient.lastAttack}</p>
            </div>
            
            <Badge 
              variant="outline" 
              className={`${
                patient.status === "Critical" ? "text-red-600 border-red-200 bg-red-50" :
                patient.status === "At Risk" ? "text-amber-600 border-amber-200 bg-amber-50" :
                "text-green-600 border-green-200 bg-green-50"
              }`}
            >
              {patient.status}
            </Badge>
          </div>
        ))}
      </div>
      
      <Button className="w-full" variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientsList;
