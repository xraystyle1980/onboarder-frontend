import { OnboardingFlow } from './types';

export const sampleOnboardingFlow: OnboardingFlow = {
  "productInfo": {
    "productName": "FreelancePM",
    "targetAudience": "independent contractors and solo professionals aged 25-50",
    "productType": "mobile app",
    "coreUserGoal": "To create a project, invite clients, and set up task tracking",
    "onboardingGoal": {
      "education": "Teach users how to use the app effectively",
      "featureSetup": "Guide users through setting up their first project and tasks",
      "activation": "Encourage users to start their first project to see the app's value"
    },
    "keyFeatures": [
      "Project creation and management",
      "Client invitation and collaboration",
      "Task tracking and deadlines",
      "Time tracking",
      "Invoice generation"
    ],
    "launchContext": {
      "timing": "after signup",
      "signupStrategy": "early",
      "frictionReduction": "Use progressive disclosure to introduce features gradually",
      "valueReinforcement": "Quickly demonstrate how easy it is to set up a project and invite a client"
    },
    "flowType": "wizard"
  },
  "pattern": {
    "pattern": "Setup Wizard",
    "rationale": "The Setup Wizard is the best fit for FreelancePM because it aligns perfectly with the product's core user goal of creating a project, inviting clients, and setting up task tracking. Given that the target audience consists of independent contractors and solo professionals, they will benefit from a structured, step-by-step approach to onboarding that guides them through the essential actions needed to start using the app effectively. The onboarding goals emphasize education, feature setup, and activation, all of which can be efficiently addressed through a wizard that leads users through the initial setup process. This pattern will help reduce friction by providing clear instructions and reinforcing the app's value by demonstrating how easy it is to set up a project and invite clients. The other patterns are less suitable; a Feature Discovery Tour would overwhelm users with too much information at once, while Progressive Personalization is not as relevant since the primary focus is on immediate task setup rather than adapting to user preferences over time.",
    "citation": "NNGroup"
  },
  "steps": [
    {
      "stepName": "Welcome to FreelancePM",
      "uxGoal": "Introduce users to the app and its capabilities",
      "userAction": "Understand the app's purpose and navigate to the next step",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "The Setup Wizard pattern is appropriate here as it guides users through the initial introduction of the app in a structured manner.",
      "layoutType": "modal_form",
      "layoutPurpose": "The modal form layout allows for a focused introduction without distractions, making it easy for users to engage with the content.",
      "modalType": "welcome",
      "inputFields": [],
      "rationale": "This step sets a positive tone for the onboarding journey, helping users feel welcomed and informed about what to expect.",
      "flowEnd": false,
      "headline": "Start Your Freelance Journey",
      "subtitle": "Unlock your project management potential with ease.",
      "marketingCopy": "FreelancePM empowers independent contractors like you to manage projects effortlessly. Create, collaborate, and track your tasks all in one place. Experience seamless client interactions and watch your business thrive!",
      "cta": "Get Started",
      "ctaType": "next page",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily set up and organize your projects, so you can focus on delivering great results without the hassle."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring everyone stays on the same page and your projects run smoothly."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your workload with intuitive task tracking and deadline reminders that keep you organized and accountable."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time spent on tasks, helping you manage your hours and boost productivity."
          },
          {
            "title": "Invoice generation",
            "description": "Generate professional invoices in minutes, making it easy to get paid on time and keep your finances in order."
          }
        ]
      },
      "id": "step-1"
    },
    {
      "stepName": "Create Your First Project",
      "uxGoal": "Guide users to create their first project",
      "userAction": "Fill in project details to start using the app",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "The Setup Wizard helps users through the project creation process step-by-step, reducing confusion.",
      "layoutType": "modal_form",
      "layoutPurpose": "This layout supports user focus on project details in a contained environment, minimizing distractions.",
      "modalType": "form",
      "inputFields": [
        {
          "label": "Project Name",
          "type": "text",
          "required": true,
          "placeholder": "Enter a descriptive project name"
        },
        {
          "label": "Project Description",
          "type": "textarea",
          "required": false,
          "placeholder": "Provide a brief description of the project"
        }
      ],
      "rationale": "Creating the first project is a critical step in demonstrating the app's value and functionality, making it essential for user engagement.",
      "flowEnd": false,
      "headline": "Kick Off Your Project",
      "subtitle": "Let's get your ideas into action!",
      "marketingCopy": "Creating your first project is the gateway to effective management. With FreelancePM, you can easily define your project's scope and set the stage for successful collaboration. Start organizing your work today and see how simple it can be!",
      "cta": "Create Project",
      "ctaType": "submit",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily set up and organize your projects, so you can focus on delivering great results without the hassle."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring everyone stays on the same page and your projects run smoothly."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your workload with intuitive task tracking and deadline reminders that keep you organized and accountable."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time spent on tasks, helping you manage your hours and boost productivity."
          },
          {
            "title": "Invoice generation",
            "description": "Generate professional invoices in minutes, making it easy to get paid on time and keep your finances in order."
          }
        ]
      },
      "id": "step-2"
    },
    {
      "stepName": "Invite Your Clients",
      "uxGoal": "Encourage users to invite clients to their project",
      "userAction": "Enter client email addresses to send invitations",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "The Setup Wizard effectively guides users through the client invitation process, ensuring they understand its importance.",
      "layoutType": "modal_form",
      "layoutPurpose": "Using a modal form allows users to focus on inputting client information without distractions.",
      "modalType": "form",
      "inputFields": [
        {
          "label": "Client Email",
          "type": "email",
          "required": true,
          "placeholder": "Enter client email addresses"
        }
      ],
      "rationale": "Inviting clients is crucial for collaboration and demonstrates the app's collaborative features, reinforcing user engagement.",
      "flowEnd": false,
      "headline": "Invite Your Clients",
      "subtitle": "Collaboration made easy!",
      "marketingCopy": "Get your clients on board to enjoy seamless collaboration! With FreelancePM, inviting clients to your projects is just a few clicks away. Enhance communication and ensure everyone is aligned on project goals.",
      "cta": "Send Invites",
      "ctaType": "submit",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily set up and organize your projects, so you can focus on delivering great results without the hassle."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring everyone stays on the same page and your projects run smoothly."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your workload with intuitive task tracking and deadline reminders that keep you organized and accountable."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time spent on tasks, helping you manage your hours and boost productivity."
          },
          {
            "title": "Invoice generation",
            "description": "Generate professional invoices in minutes, making it easy to get paid on time and keep your finances in order."
          }
        ]
      },
      "id": "step-3"
    },
    {
      "stepName": "Set Up Task Tracking",
      "uxGoal": "Help users understand how to track tasks within their project",
      "userAction": "Choose task tracking preferences",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "The Setup Wizard provides a structured approach to setting up task tracking, ensuring users grasp its functionality.",
      "layoutType": "modal_form",
      "layoutPurpose": "A modal form allows users to focus on defining their task tracking preferences in a straightforward manner.",
      "modalType": "form",
      "inputFields": [
        {
          "label": "Task Deadline",
          "type": "date",
          "required": true,
          "placeholder": "Select a deadline for your tasks"
        },
        {
          "label": "Task Priority",
          "type": "select",
          "required": true,
          "options": [
            "Low",
            "Medium",
            "High"
          ]
        }
      ],
      "rationale": "Setting up task tracking is essential for project management, helping users understand how to effectively use the app's capabilities.",
      "flowEnd": false,
      "headline": "Track Your Tasks Effectively",
      "subtitle": "Stay on top of your project deadlines.",
      "marketingCopy": "Managing tasks is key to project success. FreelancePM's intuitive task tracking feature allows you to set deadlines and prioritize effectively. Keep your projects on schedule and your clients happy with clear visibility on what matters most!",
      "cta": "Set Preferences",
      "ctaType": "submit",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily set up and organize your projects, so you can focus on delivering great results without the hassle."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring everyone stays on the same page and your projects run smoothly."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your workload with intuitive task tracking and deadline reminders that keep you organized and accountable."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time spent on tasks, helping you manage your hours and boost productivity."
          },
          {
            "title": "Invoice generation",
            "description": "Generate professional invoices in minutes, making it easy to get paid on time and keep your finances in order."
          }
        ]
      },
      "id": "step-4"
    },
    {
      "stepName": "You're All Set!",
      "uxGoal": "Confirm that users have completed the onboarding process",
      "userAction": "Review project setup and start using the app",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "This final step summarizes the onboarding process, reinforcing the user's achievements.",
      "layoutType": "modal_form",
      "layoutPurpose": "The modal form provides a clear and concise summary, allowing users to feel accomplished and ready to use the app.",
      "modalType": "summary",
      "inputFields": [],
      "rationale": "This step is vital for providing closure to the onboarding experience, helping users feel confident in their ability to use the app effectively.",
      "flowEnd": true,
      "headline": "You're Ready to Go!",
      "subtitle": "Your project setup is complete.",
      "marketingCopy": "Congratulations! You've successfully set up your projects and invited your clients. With FreelancePM, you have everything you need to manage your freelance business efficiently. Start tracking tasks, managing time, and invoicing with confidence!",
      "cta": "Start Now",
      "ctaType": "next page",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily set up and organize your projects, so you can focus on delivering great results without the hassle."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring everyone stays on the same page and your projects run smoothly."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your workload with intuitive task tracking and deadline reminders that keep you organized and accountable."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time spent on tasks, helping you manage your hours and boost productivity."
          },
          {
            "title": "Invoice generation",
            "description": "Generate professional invoices in minutes, making it easy to get paid on time and keep your finances in order."
          }
        ]
      },
      "id": "step-5"
    }
  ],
  "featureCallouts": {
    "features": [
      {
        "title": "Project creation and management",
        "description": "Easily set up and organize your projects, so you can focus on delivering great results without the hassle."
      },
      {
        "title": "Client invitation and collaboration",
        "description": "Invite clients to collaborate seamlessly, ensuring everyone stays on the same page and your projects run smoothly."
      },
      {
        "title": "Task tracking and deadlines",
        "description": "Stay on top of your workload with intuitive task tracking and deadline reminders that keep you organized and accountable."
      },
      {
        "title": "Time tracking",
        "description": "Effortlessly track your time spent on tasks, helping you manage your hours and boost productivity."
      },
      {
        "title": "Invoice generation",
        "description": "Generate professional invoices in minutes, making it easy to get paid on time and keep your finances in order."
      }
    ]
  },
  "integrationOverview": {
    "narrative": "At FreelancePM, onboarding is not just a step; it's the first chapter in a user's journey toward successful project management. Upon signing up, users are seamlessly guided into a Setup Wizard that feels intuitive and supportive. This structured, step-by-step approach aligns perfectly with the needs of independent contractors and solo professionals, allowing them to effortlessly create their first project, invite clients, and set up task tracking. By leveraging progressive disclosure, we minimize friction, introducing features gradually and ensuring users are not overwhelmed. Each step reinforces the app's value, showcasing how simple it is to begin their project management journey.\n\nThe timing of this onboarding experience is crucial; it occurs immediately after signup, capitalizing on the users' initial excitement and readiness to engage. By strategically placing the Setup Wizard at this point, we ensure that users are not left to navigate the app alone. Instead, they receive immediate guidance that addresses their core goals—education on the app's functionality, setup of essential features, and activation through hands-on experience. This approach not only facilitates a smoother transition into the app but also fosters confidence, encouraging users to dive into their projects and realize the full potential of FreelancePM. Ultimately, the Setup Wizard is the perfect fit for our onboarding strategy, as it transforms the initial user experience into a compelling and productive interaction, setting the stage for long-term success.",
    "implementationNotes": "Ensure proper user guidance and feedback throughout the flow."
  },
  "copy": {
    "tone": "Empathetic and encouraging",
    "voice": "Clear, concise, and action-oriented",
    "keyPhrases": [
      "Start your first project in minutes!",
      "Invite clients and collaborate easily.",
      "Track your tasks and deadlines effortlessly.",
      "See the value of FreelancePM right away.",
      "Your freelance journey starts here!"
    ]
  },
  "generatedAt": "2025-06-29T01:25:36.757Z"
}; 