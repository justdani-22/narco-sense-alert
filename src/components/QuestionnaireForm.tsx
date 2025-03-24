
import { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  type: 'rating' | 'select' | 'text';
  options?: string[];
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'How would you rate your alertness before the attack?',
    type: 'rating'
  },
  {
    id: 'q2',
    text: 'Which symptoms did you experience?',
    type: 'select',
    options: [
      'Sudden muscle weakness',
      'Excessive daytime sleepiness',
      'Sleep paralysis',
      'Hallucinations',
      'Automatic behaviors',
      'Other'
    ]
  },
  {
    id: 'q3',
    text: 'What were you doing when the attack occurred?',
    type: 'text'
  },
  {
    id: 'q4',
    text: 'How would you rate your stress level before the attack?',
    type: 'rating'
  },
  {
    id: 'q5',
    text: 'How long did the attack last?',
    type: 'select',
    options: [
      'Less than 1 minute',
      '1-5 minutes',
      '5-15 minutes',
      '15-30 minutes',
      'More than 30 minutes',
      'I don\'t know'
    ]
  }
];

const QuestionnaireForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleRatingChange = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value.toString()
    }));
  };
  
  const handleSelectChange = (option: string) => {
    const questionId = questions[currentQuestion].id;
    let newValue: string | string[];
    
    if (Array.isArray(answers[questionId])) {
      const currentAnswers = answers[questionId] as string[];
      if (currentAnswers.includes(option)) {
        newValue = currentAnswers.filter(a => a !== option);
      } else {
        newValue = [...currentAnswers, option];
      }
    } else {
      newValue = [option];
    }
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: newValue
    }));
  };
  
  const handleTextChange = (text: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: text
    }));
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      
      toast({
        title: "Questionnaire submitted",
        description: "Thank you for completing the post-attack questionnaire.",
      });
    }, 1500);
  };
  
  if (isComplete) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-fade-in max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your responses have been recorded and will help your doctor adjust your treatment plan if needed.
          </p>
        </div>
        
        <Button 
          className="w-full" 
          asChild
        >
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    );
  }
  
  const currentQ = questions[currentQuestion];
  const hasAnswer = answers[currentQ.id] !== undefined && 
                   (typeof answers[currentQ.id] === 'string' 
                     ? (answers[currentQ.id] as string).trim() !== '' 
                     : (answers[currentQ.id] as string[]).length > 0);
  
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Post-Attack Questionnaire</h2>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
          <div 
            className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-start mb-4">
          <AlertCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <h3 className="text-lg font-medium">{currentQ.text}</h3>
        </div>
        
        {currentQ.type === 'rating' && (
          <div className="flex justify-between items-center my-6 px-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <button
                key={rating}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  parseInt(answers[currentQ.id] as string) === rating
                    ? "bg-primary text-white transform scale-110 shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                )}
                onClick={() => handleRatingChange(rating)}
              >
                {rating}
              </button>
            ))}
          </div>
        )}
        
        {currentQ.type === 'select' && currentQ.options && (
          <div className="space-y-2 my-4">
            {currentQ.options.map((option) => {
              const isSelected = Array.isArray(answers[currentQ.id])
                ? (answers[currentQ.id] as string[]).includes(option)
                : false;
              
              return (
                <button
                  key={option}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center",
                    isSelected
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  )}
                  onClick={() => handleSelectChange(option)}
                >
                  <div className={cn(
                    "w-5 h-5 mr-3 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors",
                    isSelected ? "bg-primary border-primary" : "border-gray-300"
                  )}>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                  {option}
                </button>
              );
            })}
          </div>
        )}
        
        {currentQ.type === 'text' && (
          <textarea
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary h-32 resize-none"
            placeholder="Type your answer here..."
            value={answers[currentQ.id] as string || ''}
            onChange={(e) => handleTextChange(e.target.value)}
          ></textarea>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!hasAnswer || isSubmitting}
          className="min-w-[100px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : currentQuestion === questions.length - 1 ? (
            'Submit'
          ) : (
            <>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
