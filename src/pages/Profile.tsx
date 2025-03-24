
import { useState } from 'react';
import { 
  User, 
  Save, 
  Calendar, 
  Weight, 
  Ruler, 
  Shield, 
  Bell, 
  CheckCircle 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    dateOfBirth: "1988-05-12",
    height: "168",
    weight: "62",
    notificationsEnabled: true,
    dataSharing: true
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleToggleChange = (name: string, checked: boolean) => {
    setProfileData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
      
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 max-w-4xl mx-auto gradient-bg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Profile Settings</h1>
        <p className="text-gray-600">
          Update your personal information and preferences
        </p>
      </div>
      
      <div className="mb-6">
        <Button
          variant="outline"
          className="flex items-center"
          asChild
        >
          <Link to="/personalization">
            <Palette className="mr-2 h-4 w-4" />
            Personalizza l'app
          </Link>
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="glass-card md:col-span-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details used for analysis
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    Date of Birth
                  </Label>
                  <Input 
                    id="dateOfBirth" 
                    name="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height" className="flex items-center">
                    <Ruler className="mr-1 h-4 w-4 text-muted-foreground" />
                    Height (cm)
                  </Label>
                  <Input 
                    id="height" 
                    name="height"
                    type="number"
                    value={profileData.height}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center">
                    <Weight className="mr-1 h-4 w-4 text-muted-foreground" />
                    Weight (kg)
                  </Label>
                  <Input 
                    id="weight" 
                    name="weight"
                    type="number"
                    value={profileData.weight}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Settings */}
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Preferences
              </CardTitle>
              <CardDescription>
                Manage your app settings and preferences
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts for attacks and reminders
                  </p>
                </div>
                <Switch
                  checked={profileData.notificationsEnabled}
                  onCheckedChange={(checked) => 
                    handleToggleChange('notificationsEnabled', checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center">
                    <Shield className="mr-1 h-4 w-4 text-muted-foreground" />
                    Data Sharing
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Share data with your healthcare provider
                  </p>
                </div>
                <Switch
                  checked={profileData.dataSharing}
                  onCheckedChange={(checked) => 
                    handleToggleChange('dataSharing', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            className="min-w-[120px]"
            disabled={isSaving || savedSuccess}
          >
            {isSaving ? (
              <>Saving...</>
            ) : savedSuccess ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
