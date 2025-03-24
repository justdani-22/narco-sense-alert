
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, MessageSquare, Users, UserPlus, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data for community posts
const communityPosts = [
  {
    id: 1,
    author: "Maria S.",
    avatar: null,
    initials: "MS",
    time: "2 ore fa",
    content: "Ho provato una nuova tecnica di rilassamento che mi aiuta prima di andare a dormire. Qualcuno ha suggerimenti simili?",
    likes: 12,
    replies: 5,
    tags: ["Sonno", "Consigli"]
  },
  {
    id: 2,
    author: "Marco R.",
    avatar: null,
    initials: "MR",
    time: "Ieri",
    content: "Il nuovo farmaco che sto prendendo mi sta dando meno effetti collaterali rispetto al precedente. Qualcuno ha avuto un'esperienza simile?",
    likes: 8,
    replies: 3,
    tags: ["Farmaci", "Effetti"]
  }
];

const CommunitySection = () => {
  const handleJoinGroup = () => {
    toast.success("Ti sei unito al gruppo di supporto", {
      description: "Ora puoi partecipare alle discussioni e agli eventi"
    });
  };
  
  const handleLike = (postId: number) => {
    toast.success("Post apprezzato", {
      description: "Il tuo apprezzamento è stato registrato"
    });
  };
  
  return (
    <Card className="glass-card md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Share2 className="mr-2 h-5 w-5 text-primary" />
          Community
        </CardTitle>
        <CardDescription>
          Condividi esperienze e connettiti con altri pazienti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Discussioni recenti</h3>
              <Button size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Nuovo post
              </Button>
            </div>
            
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-8 w-8 mr-2">
                      {post.avatar && <AvatarImage src={post.avatar} alt={post.author} />}
                      <AvatarFallback>{post.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-3">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center text-xs"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className="h-3 w-3 mr-1" />
                      {post.likes} Mi piace
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {post.replies} Risposte
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Gruppi di supporto</h3>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Narcolessia di Tipo 1</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <Users className="h-3 w-3 inline mr-1" /> 
                  128 membri
                </p>
                <Button size="sm" className="w-full" onClick={handleJoinGroup}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Unisciti
                </Button>
              </div>
              
              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Narcolessia di Tipo 2</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <Users className="h-3 w-3 inline mr-1" /> 
                  95 membri
                </p>
                <Button size="sm" className="w-full" onClick={handleJoinGroup}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Unisciti
                </Button>
              </div>
              
              <div className="border rounded-lg p-3">
                <h4 className="font-medium">Giovani con narcolessia</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <Users className="h-3 w-3 inline mr-1" /> 
                  67 membri
                </p>
                <Button size="sm" className="w-full" onClick={handleJoinGroup}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Unisciti
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-1" />
                Visualizza tutti i gruppi
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunitySection;
