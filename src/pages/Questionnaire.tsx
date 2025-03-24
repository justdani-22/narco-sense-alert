
import QuestionnaireForm from '@/components/QuestionnaireForm';

const Questionnaire = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 max-w-3xl mx-auto gradient-bg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Post-Attack Questionnaire</h1>
        <p className="text-gray-600">
          Please provide details about your recent narcolepsy attack to help your doctor adjust your treatment plan.
        </p>
      </div>
      
      <QuestionnaireForm />
    </div>
  );
};

export default Questionnaire;
