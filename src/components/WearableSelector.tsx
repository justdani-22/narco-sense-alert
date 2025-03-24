
import { useState } from 'react';
import { Watch, Check, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Wearable {
  id: string;
  name: string;
  type: string;
  batteryLevel: number;
}

// Sample wearable devices
const sampleWearables: Wearable[] = [
  { id: 'w1', name: 'NarcoWatch Pro', type: 'Smartwatch', batteryLevel: 78 },
  { id: 'w2', name: 'NarcoSense Band', type: 'Wristband', batteryLevel: 65 },
  { id: 'w3', name: 'Neuro Monitor X1', type: 'Headband', batteryLevel: 92 },
];

interface WearableSelectorProps {
  className?: string;
}

const WearableSelector = ({ className }: WearableSelectorProps) => {
  const [selectedWearable, setSelectedWearable] = useState<Wearable>(sampleWearables[0]);
  const [isConnected, setIsConnected] = useState(true);

  const handleSelect = (wearable: Wearable) => {
    setSelectedWearable(wearable);
    
    // Simulate connection change
    setIsConnected(false);
    setTimeout(() => setIsConnected(true), 1500);
  };

  return (
    <div className={cn("glass-card rounded-xl p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium">Connected Device</h3>
        
        <div className="flex items-center">
          <span 
            className={cn(
              "inline-block w-2 h-2 rounded-full mr-2 animate-pulse-gentle",
              isConnected ? "bg-green-500" : "bg-amber-500"
            )}
          />
          <span className="text-sm text-muted-foreground">
            {isConnected ? "Connected" : "Connecting..."}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Watch className="h-6 w-6 text-primary" />
        </div>
        
        <div className="flex-grow">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-white"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{selectedWearable.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {selectedWearable.type} • Battery {selectedWearable.batteryLevel}%
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-[240px]">
              {sampleWearables.map((wearable) => (
                <DropdownMenuItem
                  key={wearable.id}
                  className="cursor-pointer flex justify-between items-center py-2"
                  onClick={() => handleSelect(wearable)}
                >
                  <div>
                    <p className="font-medium">{wearable.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {wearable.type} • Battery {wearable.batteryLevel}%
                    </p>
                  </div>
                  
                  {selectedWearable.id === wearable.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default WearableSelector;
