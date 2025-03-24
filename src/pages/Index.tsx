
import { useState, useEffect } from 'react';
import { 
  Brain, 
  Heart, 
  TrendingUp, 
  Droplets,
  AlertCircle
} from 'lucide-react';
import DataChart from '@/components/DataChart';
import WearableSelector from '@/components/WearableSelector';
import AlertBox from '@/components/AlertBox';
import { useSimulatedData, useAttackDetection } from '@/hooks/useSimulatedData';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { hasDetectedAttack, attackTime } = useAttackDetection();
  const data = useSimulatedData(true);
  
  // Show alert when attack detected
  useEffect(() => {
    if (hasDetectedAttack) {
      setShowAlert(true);
    }
  }, [hasDetectedAttack]);
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 max-w-7xl mx-auto gradient-bg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Welcome Back, Maria</h1>
        <p className="text-gray-600">Here's your health overview for today</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DataChart 
          title="Heart Rate" 
          data={data.heartRate} 
          color="#ef4444" 
          unit="bpm"
          min={50}
          max={130}
        />
        
        <DataChart 
          title="Oxygen Level" 
          data={data.oxygenLevel} 
          color="#3b82f6" 
          unit="%"
          min={90}
          max={100}
        />
        
        <DataChart 
          title="Blood Pressure" 
          data={data.bloodPressure} 
          color="#8b5cf6" 
          unit="mmHg"
          min={90}
          max={150}
        />
        
        <DataChart 
          title="Brain Activity" 
          data={data.brainActivity} 
          color="#10b981" 
          unit="Hz"
          min={0}
          max={40}
          className="md:col-span-2 lg:col-span-1"
        />
        
        <WearableSelector className="md:col-span-2 lg:col-span-1" />
        
        <div className="glass-card rounded-xl p-5 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center justify-start h-auto py-3 px-4 bg-white hover:bg-gray-50"
              asChild
            >
              <Link to="/questionnaire">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3" />
                <div className="text-left">
                  <span className="block font-medium">Report Symptoms</span>
                  <span className="text-xs text-muted-foreground">Complete questionnaire</span>
                </div>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-start h-auto py-3 px-4 bg-white hover:bg-gray-50"
              asChild
            >
              <Link to="/consultation">
                <TrendingUp className="h-5 w-5 text-green-500 mr-3" />
                <div className="text-left">
                  <span className="block font-medium">Request Call</span>
                  <span className="text-xs text-muted-foreground">Contact your doctor</span>
                </div>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-start h-auto py-3 px-4 bg-white hover:bg-gray-50"
            >
              <Heart className="h-5 w-5 text-red-500 mr-3" />
              <div className="text-left">
                <span className="block font-medium">Vitals History</span>
                <span className="text-xs text-muted-foreground">View past records</span>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-start h-auto py-3 px-4 bg-white hover:bg-gray-50"
              asChild
            >
              <Link to="/profile">
                <Brain className="h-5 w-5 text-purple-500 mr-3" />
                <div className="text-left">
                  <span className="block font-medium">Settings</span>
                  <span className="text-xs text-muted-foreground">Update your profile</span>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {showAlert && attackTime && (
        <AlertBox 
          time={attackTime} 
          onDismiss={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Index;
