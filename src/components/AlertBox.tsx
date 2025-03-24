
import { useState, useEffect } from 'react';
import { AlertTriangle, X, Clock, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";

interface AlertBoxProps {
  time: Date;
  onDismiss: () => void;
  className?: string;
}

const AlertBox = ({ time, onDismiss, className }: AlertBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Delay to allow animation to work properly
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); // Wait for animation to complete
    
    toast({
      title: "Alert dismissed",
      description: "You've acknowledged the narcolepsy attack alert.",
    });
  };
  
  const handleQuestionnaireClick = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };
  
  return (
    <div 
      className={cn(
        "fixed inset-x-4 bottom-4 md:bottom-6 md:right-6 md:left-auto md:max-w-md z-50 transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      <div className="glass-card bg-white/90 border border-red-100 shadow-xl rounded-xl overflow-hidden">
        <div className="bg-red-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-white" />
            <h3 className="font-semibold text-white">Narcolepsy Attack Detected</h3>
          </div>
          <button 
            onClick={handleDismiss}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-red-600/30 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Clock className="h-4 w-4 mr-1.5" />
              <span className="text-sm">
                Detected {formatDistanceToNow(time, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Our system has detected patterns indicating a narcolepsy attack. 
              Your doctor has been notified.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleDismiss}
            >
              Dismiss
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-primary hover:bg-primary/90 gap-1"
              asChild
            >
              <Link to="/questionnaire" onClick={handleQuestionnaireClick}>
                Questionnaire
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
