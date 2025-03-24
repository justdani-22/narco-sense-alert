
import { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Send, 
  Calendar, 
  Phone, 
  Video,
  CheckCircle,
  FileText
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { format, addDays } from 'date-fns';

interface AppointmentSlot {
  id: string;
  date: Date;
  time: string;
  available: boolean;
}

// Generate appointment slots for the next 7 days
const generateSlots = (): AppointmentSlot[] => {
  const slots: AppointmentSlot[] = [];
  const today = new Date();
  
  for (let day = 1; day <= 7; day++) {
    const date = addDays(today, day);
    
    ['09:00', '10:30', '13:00', '14:30', '16:00'].forEach((time, index) => {
      slots.push({
        id: `slot-${day}-${index}`,
        date,
        time,
        available: Math.random() > 0.3 // 70% of slots are available
      });
    });
  }
  
  return slots;
};

const Consultation = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appointmentSlots] = useState<AppointmentSlot[]>(generateSlots());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<'phone' | 'video'>('video');
  const { toast } = useToast();
  
  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      toast({
        title: "Message sent",
        description: "Your message has been sent to Dr. Johnson.",
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setMessage('');
      }, 3000);
    }, 1500);
  };
  
  const handleAppointmentSubmit = () => {
    if (!selectedSlot) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Appointment requested",
        description: `Your ${consultationType} consultation has been requested. You'll receive a confirmation soon.`,
      });
      
      // Reset selection
      setSelectedSlot(null);
    }, 1500);
  };
  
  // Group slots by date
  const slotsByDate = appointmentSlots.reduce<Record<string, AppointmentSlot[]>>((acc, slot) => {
    const dateStr = format(slot.date, 'yyyy-MM-dd');
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(slot);
    return acc;
  }, {});
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 max-w-4xl mx-auto gradient-bg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Doctor Consultation</h1>
        <p className="text-gray-600">
          Request a consultation with your healthcare provider
        </p>
      </div>
      
      <Tabs defaultValue="message" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-4">
          <TabsTrigger value="message" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Quick Message
          </TabsTrigger>
          <TabsTrigger value="appointment" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Call
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="message" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5 text-primary" />
                Send a Message
              </CardTitle>
              <CardDescription>
                Send a message to Dr. Johnson about your recent narcolepsy symptoms or treatment
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleMessageSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Dr. Sarah Johnson</h3>
                      <p className="text-sm text-gray-500">Neurologist • Sleep Specialist</p>
                      <p className="text-xs text-gray-500 mt-1">Typically responds within 24 hours</p>
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-32 resize-none bg-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting || submitted}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit"
                  className="ml-auto"
                  disabled={!message.trim() || isSubmitting || submitted}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : submitted ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Sent
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointment" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Schedule a Consultation
              </CardTitle>
              <CardDescription>
                Book a phone or video consultation with Dr. Johnson
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3 justify-center mb-2">
                <Button
                  variant={consultationType === 'phone' ? 'default' : 'outline'}
                  onClick={() => setConsultationType('phone')}
                  className="flex items-center gap-2 min-w-32"
                >
                  <Phone className="h-4 w-4" />
                  Phone Call
                </Button>
                <Button
                  variant={consultationType === 'video' ? 'default' : 'outline'}
                  onClick={() => setConsultationType('video')}
                  className="flex items-center gap-2 min-w-32"
                >
                  <Video className="h-4 w-4" />
                  Video Call
                </Button>
              </div>
              
              <div className="overflow-x-auto pb-2">
                <div className="inline-flex flex-nowrap space-x-3 min-w-full px-1">
                  {Object.entries(slotsByDate).map(([dateStr, slots]) => (
                    <div key={dateStr} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm min-w-48 flex-shrink-0">
                      <div className="text-center pb-2 mb-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-500">
                          {format(new Date(dateStr), 'EEEE')}
                        </p>
                        <div className="flex items-center justify-center gap-1">
                          <CalendarDays className="h-3 w-3 text-primary" />
                          <p className="font-semibold">
                            {format(new Date(dateStr), 'MMM d')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {slots.map(slot => (
                          <button
                            key={slot.id}
                            className={`w-full py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors ${
                              !slot.available 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : selectedSlot === slot.id
                                  ? 'bg-primary/10 text-primary font-medium border border-primary/30'
                                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-transparent'
                            }`}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.id)}
                          >
                            <Clock className="h-3 w-3" />
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                className="ml-auto"
                disabled={!selectedSlot || isSubmitting}
                onClick={handleAppointmentSubmit}
              >
                {isSubmitting ? 'Requesting...' : 'Request Appointment'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Consultation;
