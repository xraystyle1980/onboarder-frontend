import { OnboardingFlow } from './types';

export const sampleOnboardingFlow: OnboardingFlow = {
  productInfo: {
    productName: "FreelancePM",
    targetAudience: "Freelancers",
    productType: "SaaS",
    coreUserGoal: "Create a project and see the first task board",
    onboardingGoal: {
      education: "Teach users how to use the tool effectively",
      featureSetup: "Guide users through the initial project and task setup",
      activation: "Get users to actively engage with the product by starting their first project"
    },
    keyFeatures: [
      "Project creation",
      "Client invitation",
      "Task tracking"
    ],
    launchContext: {
      timing: "After signup",
      signupStrategy: "Early",
      frictionReduction: "Simplify the initial setup process with templates and guides",
      valueReinforcement: "Quickly demonstrate the ease of managing projects and tasks"
    },
    flowType: "Wizard"
  },
  pattern: {
    pattern: "Setup Wizard",
    rationale: "The Setup Wizard is ideal for FreelancePM as it provides a structured and guided approach for users to create their first project and task board. Given that the core user goal is to quickly engage with the product, a wizard can simplify the onboarding process by breaking it down into manageable steps. This aligns with the onboarding goals of education, feature setup, and activation, ensuring that users understand how to use the tool effectively while also reducing friction through templates and guides.",
    // citation: "NNGroup"
  },
  steps: [
    {
      id: "step-1-1749135500920",
      stepName: "Welcome",
      uxGoal: "Introduce the product and set the tone for the onboarding experience",
      userAction: "Press 'Start' to begin onboarding",
      layout: "modal",
      rationale: "Welcoming users helps to create a positive first impression and prepares them for the onboarding process",
      pattern: "Setup Wizard",
      patternRationale: "This step marks the beginning of the linear Setup Wizard pattern, guiding users through a series of steps",
      headline: "Begin Your Journey!",
      subtext: "Discover how FreelancePM can streamline your projects and simplify your freelancing life.",
      cta: "Start",
      ctaType: "next page"
    },
    {
      id: "step-2-1749135500920",
      stepName: "Project Creation",
      uxGoal: "Get users to create their first project",
      userAction: "Fill in the project details and click 'Create'",
      layout: "full screen",
      rationale: "Creating a project is the core functionality of FreelancePM and the starting point for users to manage their work",
      pattern: "Setup Wizard",
      patternRationale: "This step is a part of the sequential process in the Setup Wizard, leading users through the core features",
      headline: "Create Your First Project",
      subtext: "Let's jump right in! Set up your first project to see how easy managing your workflows can be.",
      cta: "Create",
      ctaType: "submit"
    },
    {
      id: "step-3-1749135500920",
      stepName: "Client Invitation",
      uxGoal: "Show users how to collaborate with clients",
      userAction: "Enter client email addresses and send invitations",
      layout: "full screen",
      rationale: "Inviting clients is essential for freelancers to collaborate and share progress, fostering user engagement",
      pattern: "Setup Wizard",
      patternRationale: "Continuing the Setup Wizard, this step educates users on the collaboration feature of the product",
      headline: "Invite Your Clients",
      subtext: "Connect with your clients by inviting them to collaborate and stay updated on project progress.",
      cta: "Invite",
      ctaType: "submit"
    },
    {
      id: "step-4-1749135500920",
      stepName: "Task Tracking",
      uxGoal: "Teach users how to create and manage tasks",
      userAction: "Create a new task and assign it a deadline",
      layout: "full screen",
      rationale: "Task management is a fundamental feature that users need to understand to effectively use FreelancePM",
      pattern: "Setup Wizard",
      patternRationale: "As part of the Setup Wizard, this step helps users understand how to track their work within the project",
      headline: "Track Your Tasks",
      subtext: "Learn to create and manage tasks efficiently to keep your projects on deadline and budget.",
      cta: "Assign",
      ctaType: "submit"
    },
    {
      id: "step-5-1749135500920",
      stepName: "First Project Overview",
      uxGoal: "Give users a summary of their project setup and encourage engagement",
      userAction: "Review the project summary and click 'Finish' to complete the onboarding",
      layout: "modal",
      rationale: "Providing a summary helps users see what they've accomplished and reinforces the value of the product",
      pattern: "Setup Wizard",
      patternRationale: "This final step in the Setup Wizard gives users a sense of completion and prepares them for active product use",
      headline: "Review and Launch",
      subtext: "Take a moment to review your project setup. Ready to take control of your freelancing career?",
      cta: "Finish",
      ctaType: "dismiss"
    }
  ],
  generatedAt: new Date().toISOString(),
  integrationOverview: {
    narrative: 'As freelancers begin their journey with FreelancePM, they should encounter an onboarding experience that is intuitive, educational, and empowering. The onboarding should function as a Setup Wizard, a pattern that will provide a seamless flow from the moment they sign up. This wizard will usher users through a series of well-orchestrated steps that not only reduce friction by offering templates and guides but also reinforce the value of the product through immediate demonstration of project and task management capabilities.\n\nThe onboarding will be strategically placed right after the early signup phase, ensuring that users are not overwhelmed but are instead guided through the initial setup process in a timely manner. This timing is critical as it leverages the user\'s interest and readiness to engage with the tool. The wizard will culminate in the creation of the user\'s first project and task board, directly aligning with the core user goal and activating their journey with FreelancePM.\n\nThe rationale for integrating a Setup Wizard into FreelancePM\'s onboarding process is rooted in its ability to break down complex tasks into digestible steps, making it an ideal match for freelancers who are often juggling multiple projects and deadlines. This approach dovetails with the product\'s onboarding goals of educating users on how to use the tool effectively, guiding them through feature setup, and activating their engagement from the outset. By choosing this pattern, FreelancePM ensures that users quickly realize the tool\'s benefits, setting the stage for a productive and satisfying user experience.',
    implementationNotes: "Ensure that the Setup Wizard is optional for returning users or those who prefer to explore the app independently."
  },
  copy: {
    tone: "Empathetic and encouraging",
    voice: "Clear, concise, and action-oriented",
    keyPhrases: ["Streamline your projects", "Simplify your freelancing life", "Take control of your career"]
  }
}; 