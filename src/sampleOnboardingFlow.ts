import { OnboardingFlow } from './types';

export const sampleOnboardingFlow: OnboardingFlow = {
  "productInfo": {
    "productName": "FreelancePM",
    "targetAudience": "independent contractors and solo professionals aged 25-50",
    "productType": "mobile app",
    "coreUserGoal": "To set up a project, invite a client, and outline key tasks",
    "onboardingGoal": {
      "education": "Teach users how to use the app effectively",
      "featureSetup": "Guide users through setting up their first project",
      "activation": "Encourage users to start their first project and invite a client"
    },
    "keyFeatures": [
      "Project creation and management",
      "Client invitation and collaboration",
      "Task tracking and deadlines",
      "Time tracking",
      "Invoicing and payments"
    ],
    "launchContext": {
      "timing": "after signup",
      "signupStrategy": "early",
      "frictionReduction": "Use progressive disclosure to introduce features gradually",
      "valueReinforcement": "Highlight quick project setup and easy client collaboration"
    },
    "flowType": "wizard"
  },
  "pattern": {
    "pattern": "Setup Wizard with Just-in-Time Tooltips",
    "rationale": "The Setup Wizard is ideal for guiding users through the initial steps of setting up their first project, which aligns perfectly with the onboarding goal of feature setup and activation. It provides a structured flow that helps users understand the app's core functionalities step-by-step. Additionally, incorporating Just-in-Time Tooltips will enhance the experience by offering contextual help as users interact with specific features, ensuring they grasp how to use the app effectively without overwhelming them with information all at once. This combination addresses the need for education and friction reduction while reinforcing the value of quick project setup and client collaboration.",
    "citation": "NNGroup"
  },
  "steps": [
    {
      "stepName": "Welcome to FreelancePM",
      "uxGoal": "Introduce users to the app and its purpose",
      "userAction": "Read the welcome message and click 'Get Started'",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "The Setup Wizard pattern is appropriate here as it provides a structured introduction to the app, setting the stage for the onboarding process.",
      "layoutType": "full_screen",
      "layoutPurpose": "The full screen layout captures the user's attention and allows for a comprehensive introduction without distractions.",
      "rationale": "This step builds excitement and prepares users for the onboarding journey, establishing a positive emotional tone.",
      "flowEnd": false,
      "headline": "Start Your Freelance Journey",
      "subtitle": "Welcome aboard! Let's set you up for success.",
      "marketingCopy": "FreelancePM is designed to empower independent contractors like you. With intuitive project management, seamless client collaboration, and tools for tracking tasks and invoicing, you'll gain the confidence to focus on what you do best. Let's get started on your path to organized and efficient freelancing.",
      "cta": "Get Started",
      "ctaType": "next page",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily create and manage projects to keep your freelance work organized and on track."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring clear communication and shared goals."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your tasks and deadlines to deliver projects on time and impress your clients."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time to ensure you're billing accurately and maximizing your earnings."
          },
          {
            "title": "Invoicing and payments",
            "description": "Simplify your invoicing and payment processes to get paid faster and focus more on your work."
          }
        ]
      },
      "id": "step-1"
    },
    {
      "stepName": "Create Your First Project",
      "uxGoal": "Guide users to set up their first project",
      "userAction": "Fill in project details and click 'Next'",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "The Setup Wizard pattern effectively guides users through sequential steps, making the project creation process feel manageable.",
      "layoutType": "modal_form",
      "layoutPurpose": "The modal form layout provides a focused environment for users to input necessary project details without distractions.",
      "modalType": "form",
      "inputFields": [
        {
          "label": "Project Name",
          "type": "text",
          "required": true,
          "placeholder": "Enter your project name"
        },
        {
          "label": "Project Deadline",
          "type": "date",
          "required": true
        }
      ],
      "rationale": "This step is crucial as it directly engages users in the app's core functionality, reducing friction by guiding them through the project setup.",
      "flowEnd": false,
      "headline": "Set Up Your Project Now",
      "subtitle": "Let's bring your ideas to life!",
      "marketingCopy": "Creating your first project is easy and rewarding with FreelancePM. Input your project details, set a deadline, and start organizing your workflow like never before. Take this important step towards successful project management!",
      "cta": "Next",
      "ctaType": "next page",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily create and manage projects to keep your freelance work organized and on track."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring clear communication and shared goals."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your tasks and deadlines to deliver projects on time and impress your clients."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time to ensure you're billing accurately and maximizing your earnings."
          },
          {
            "title": "Invoicing and payments",
            "description": "Simplify your invoicing and payment processes to get paid faster and focus more on your work."
          }
        ]
      },
      "id": "step-2"
    },
    {
      "stepName": "Invite Your Client",
      "uxGoal": "Encourage users to invite their client to collaborate",
      "userAction": "Enter client email and click 'Send Invite'",
      "uxPattern": "Just-in-Time Tooltip",
      "patternPurpose": "The Just-in-Time Tooltip pattern provides context-sensitive help, making it easier for users to understand the importance of inviting clients at this stage.",
      "layoutType": "modal_form",
      "layoutPurpose": "The tooltip overlay allows users to receive immediate guidance without interrupting their workflow, enhancing usability.",
      "rationale": "This step matters because it fosters collaboration, encouraging users to take the next step in their project setup by involving their clients.",
      "flowEnd": false,
      "headline": "Invite Your Client to Collaborate",
      "subtitle": "Teamwork makes the dream work!",
      "marketingCopy": "Enhance your project's success by inviting your client to collaborate. With FreelancePM, you can seamlessly share updates and gather feedback, ensuring everyone is on the same page. Take this opportunity to build strong client relationships.",
      "cta": "Send Invite",
      "ctaType": "submit",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily create and manage projects to keep your freelance work organized and on track."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring clear communication and shared goals."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your tasks and deadlines to deliver projects on time and impress your clients."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time to ensure you're billing accurately and maximizing your earnings."
          },
          {
            "title": "Invoicing and payments",
            "description": "Simplify your invoicing and payment processes to get paid faster and focus more on your work."
          }
        ]
      },
      "id": "step-3"
    },
    {
      "stepName": "Outline Key Tasks",
      "uxGoal": "Help users outline important tasks for their project",
      "userAction": "Add tasks and set deadlines",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "The Setup Wizard pattern helps users systematically outline tasks, ensuring they understand how to manage their project effectively.",
      "layoutType": "modal_form",
      "layoutPurpose": "The modal form layout focuses users on entering task details, minimizing distractions and improving task management.",
      "modalType": "form",
      "inputFields": [
        {
          "label": "Task Name",
          "type": "text",
          "required": true,
          "placeholder": "Enter task name"
        },
        {
          "label": "Task Deadline",
          "type": "date",
          "required": true
        }
      ],
      "rationale": "This step is essential for ensuring users can effectively manage their projects, reducing uncertainty and building confidence in using the app.",
      "flowEnd": false,
      "headline": "Define Your Project Tasks",
      "subtitle": "Keep your project on track!",
      "marketingCopy": "Outlining key tasks is crucial for project success. With FreelancePM, you can easily define each task and set deadlines, ensuring that nothing falls through the cracks. Boost your productivity and clarity as you navigate your project.",
      "cta": "Add Tasks",
      "ctaType": "next page",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily create and manage projects to keep your freelance work organized and on track."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring clear communication and shared goals."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your tasks and deadlines to deliver projects on time and impress your clients."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time to ensure you're billing accurately and maximizing your earnings."
          },
          {
            "title": "Invoicing and payments",
            "description": "Simplify your invoicing and payment processes to get paid faster and focus more on your work."
          }
        ]
      },
      "id": "step-4"
    },
    {
      "stepName": "Success! You're All Set",
      "uxGoal": "Confirm that the onboarding process is complete",
      "userAction": "Click 'Finish' to start using the app",
      "uxPattern": "Setup Wizard",
      "patternPurpose": "The Setup Wizard pattern culminates in a success confirmation, reinforcing the user's accomplishments during onboarding.",
      "layoutType": "full_screen",
      "layoutPurpose": "The full screen layout for the success message celebrates the user's completion of onboarding and encourages further exploration of the app.",
      "rationale": "This step matters as it provides closure to the onboarding experience, reinforcing users' achievements and encouraging them to engage with the app.",
      "flowEnd": true,
      "headline": "You're Ready to Go!",
      "subtitle": "Great job completing onboarding!",
      "marketingCopy": "Congratulations! You've successfully set up your FreelancePM account and are ready to manage your projects with ease. Dive in and explore all the features designed to help you thrive in your freelance career. Your journey to organized success starts now!",
      "cta": "Finish",
      "ctaType": "submit",
      "featureCallouts": {
        "features": [
          {
            "title": "Project creation and management",
            "description": "Easily create and manage projects to keep your freelance work organized and on track."
          },
          {
            "title": "Client invitation and collaboration",
            "description": "Invite clients to collaborate seamlessly, ensuring clear communication and shared goals."
          },
          {
            "title": "Task tracking and deadlines",
            "description": "Stay on top of your tasks and deadlines to deliver projects on time and impress your clients."
          },
          {
            "title": "Time tracking",
            "description": "Effortlessly track your time to ensure you're billing accurately and maximizing your earnings."
          },
          {
            "title": "Invoicing and payments",
            "description": "Simplify your invoicing and payment processes to get paid faster and focus more on your work."
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
        "description": "Easily create and manage projects to keep your freelance work organized and on track."
      },
      {
        "title": "Client invitation and collaboration",
        "description": "Invite clients to collaborate seamlessly, ensuring clear communication and shared goals."
      },
      {
        "title": "Task tracking and deadlines",
        "description": "Stay on top of your tasks and deadlines to deliver projects on time and impress your clients."
      },
      {
        "title": "Time tracking",
        "description": "Effortlessly track your time to ensure you're billing accurately and maximizing your earnings."
      },
      {
        "title": "Invoicing and payments",
        "description": "Simplify your invoicing and payment processes to get paid faster and focus more on your work."
      }
    ]
  },
  "integrationOverview": {
    "narrative": "At FreelancePM, onboarding is designed to feel intuitive and supportive, guiding independent contractors and solo professionals through the essential steps of setting up their first project. By employing a Setup Wizard paired with Just-in-Time Tooltips, users are led through a structured flow that demystifies the app's core functionalities. This approach not only educates users on how to effectively utilize features like project creation, client collaboration, and task tracking but also reduces friction by introducing these elements progressively. Users can focus on one task at a time, ensuring they feel confident and empowered as they navigate the app.\n\nThe onboarding experience is strategically positioned immediately after signup, aligning with our early signup strategy. This timing allows users to dive right into the app, reinforcing their decision to engage with FreelancePM. By emphasizing quick project setup and seamless client invitations, we create a compelling value proposition that encourages users to activate their first project right away. The combination of the Setup Wizard and contextual tooltips ensures that users receive the right information at the right moment, enhancing their overall experience while minimizing overwhelm. This thoughtful integration of onboarding not only meets the educational needs of our users but also aligns perfectly with their goals, setting them up for success in their freelance endeavors.",
    "implementationNotes": "Ensure proper user guidance and feedback throughout the flow."
  },
  "copy": {
    "tone": "Empathetic and encouraging",
    "voice": "Clear, concise, and action-oriented",
    "keyPhrases": [
      "Start your first project with ease",
      "Invite clients and collaborate effortlessly",
      "Track tasks and meet deadlines",
      "Manage time and get paid faster",
      "Your freelance journey starts here"
    ]
  },
  "generatedAt": "2025-06-23T15:14:13.593Z"
}; 