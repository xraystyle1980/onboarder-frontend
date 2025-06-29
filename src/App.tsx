import React, { useState, useRef, useEffect } from "react";
import {
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { OnboardingFlowCards } from "./components/onboarding-flow-cards";
import Header from "./components/header";
import SectionHero from "./components/section-hero";
import { OnboardingSummaryTab } from "./components/tabs/OnboardingSummaryTab";
import { UXDesignContextTab } from "./components/tabs/UXDesignContextTab";
import { UXNarrativeTab } from "./components/tabs/UXNarrativeTab";
import { sampleOnboardingFlow } from "./sampleOnboardingFlow";
import { OnboardingFlow } from "./types";
import { exportFlow } from "./utils/flowExporter";
import { onboardingService } from "./services/api";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useTabTransition } from "./hooks/useTabTransition";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useSupabaseAuth } from "./hooks/useSupabaseAuth";
import { saveUserFlow, getUserFlows } from "./services/flows";
import Toast from "./components/shared/Toast";
import UserFlows from "./components/UserFlows";
import { GeneratingFlowCard, GeneratedFlowCard } from "./components/flow-header-cards";
import { MetaTags } from './components/MetaTags';

interface SavedFlow {
  id: string;
  flow_json: OnboardingFlow;
  prompt: string;
  product_name?: string;
  created_at: string;
}

const EXAMPLE_PROMPT = "A project management app called \"FreelancePM\" that helps freelancers create projects, invite clients, and track tasks. Target audience is independent contractors and solo professionals aged 25-50.";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<OnboardingFlow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSampleFlow, setShowSampleFlow] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null);
  const [loadingSteps, setLoadingSteps] = useState<any[]>([]);
  const [currentProgressMessage, setCurrentProgressMessage] = useState<string>("");
  const eventSourceRef = useRef<EventSource | null>(null);
  
  const {
    selectedTab: selectedMainTab,
    handleTabChange: setSelectedMainTab,
    getTabTransitionClass,
  } = useTabTransition("summary");

  const { user } = useSupabaseAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("info");
  const [showUserFlowsDrawer, setShowUserFlowsDrawer] = useState(false);
  const [userFlowCount, setUserFlowCount] = useState(0);
  const [pendingFlow, setPendingFlow] = useState(null);
  const [pendingPrompt, setPendingPrompt] = useState(null);
  const [isNewlyGenerated, setIsNewlyGenerated] = useState(false);
  const [currentFlowId, setCurrentFlowId] = useState<string | null>(null);

  // Fetch user flow count on login
  React.useEffect(() => {
    async function fetchCount() {
      if (user) {
        const { data } = await getUserFlows(user.id);
        setUserFlowCount(data ? data.length : 0);
      }
    }
    fetchCount();
  }, [user]);

  // Auto-save pending flow after login
  React.useEffect(() => {
    if (user && pendingFlow && pendingPrompt) {
      handleSaveFlow(pendingPrompt, pendingFlow, true);
      setPendingFlow(null);
      setPendingPrompt(null);
      localStorage.removeItem("pendingFlow");
      localStorage.removeItem("pendingPrompt");
    }
  }, [user]);

  // Restore pending flow from localStorage
  React.useEffect(() => {
    const pf = localStorage.getItem("pendingFlow");
    const pp = localStorage.getItem("pendingPrompt");
    if (pf && pp) {
      setPendingFlow(JSON.parse(pf));
      setPendingPrompt(pp);
    }
  }, []);

  const handleSaveFlow = async (prompt, flow, isFromPending = false) => {
    if (!user) {
      // Store pending flow and prompt
      setPendingFlow(flow);
      setPendingPrompt(prompt);
      localStorage.setItem("pendingFlow", JSON.stringify(flow));
      localStorage.setItem("pendingPrompt", prompt);
      setToastMsg("Sign in to save your flow!");
      setToastType("info");
      setShowToast(true);
      // Optionally, trigger login modal here
      const loginBtn = document.querySelector<HTMLButtonElement>('button:contains("Sign In")');
      if (loginBtn) loginBtn.click();
      return;
    }
    // Save flow
    const { error } = await saveUserFlow({
      userId: user.id,
      prompt,
      flow_json: flow,
      flow_type: flow.productInfo?.flowType,
      product_name: flow.productInfo?.productName,
    });
    if (error) {
      setToastMsg("Error saving flow: " + error.message);
      setToastType("error");
      setShowToast(true);
    } else {
      setToastMsg("Flow saved to your account!");
      setToastType("success");
      setShowToast(true);
      setUserFlowCount((c) => c + 1);
    }
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);
    setError(null);
    setShowSampleFlow(false);
    setCurrentFlow(null);
    setSubmittedPrompt(inputText);
    setLoadingSteps([]);
    setCurrentProgressMessage("");
    setIsNewlyGenerated(false);
    try {
      const flow = await onboardingService.generateFlowStream(inputText, (stepData) => {
        console.log('Received stepData:', stepData);
        if (stepData && stepData.message) {
          setCurrentProgressMessage(stepData.message);
        }
        if (stepData && stepData.stepName) {
          setLoadingSteps(prev => [...prev, stepData]);
        }
      });
      setCurrentFlow(flow);
      setIsNewlyGenerated(true);
    } catch (err: any) {
      setError(err.message || 'Streaming error');
    } finally {
      setIsGenerating(false);
      // setLoadingSteps([]);
    }
  };

  const handleClear = () => {
    setInputText("");
    setCurrentFlow(null);
    setError(null);
    setShowSampleFlow(false);
    setSubmittedPrompt(null);
    setLoadingSteps([]);
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
  };

  const displayFlow = showSampleFlow ? sampleOnboardingFlow : currentFlow;
  const hasFlowToDisplay = displayFlow !== null;

  const handleDownload = (format: 'markdown' | 'html' | 'json') => {
    if (!displayFlow) return;
    const content = exportFlow(displayFlow, { format });
    const blob = new Blob([content], { type: format === 'markdown' ? 'text/markdown' : format === 'html' ? 'text/html' : 'application/json' });
    const filename = `${displayFlow.productInfo.productName.toLowerCase().replace(/\s+/g, '-')}-onboarding-flow.${format}`;
    
    // Create download URL
    const url = window.URL.createObjectURL(blob);
    
    // Create invisible download link
    const downloadLink = document.createElement('a') as HTMLAnchorElement;
    downloadLink.style.display = 'none';
    downloadLink.href = url;
    downloadLink.download = filename;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // Cleanup
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(url);
  };

  const handleSelectSavedFlow = (flow: SavedFlow) => {
    setCurrentFlow(flow.flow_json);
    setSubmittedPrompt(flow.prompt);
    setCurrentFlowId(flow.id);
    setIsNewlyGenerated(false);
    setShowUserFlowsDrawer(false);
  };

  return (
    <>
      <MetaTags />
      <ErrorBoundary>
        <div className="min-h-screen bg-background flex flex-col">
          <Header onShowMyFlows={() => setShowUserFlowsDrawer(true)} />
          <SectionHero
            inputText={inputText}
            onInputChange={setInputText}
            onGenerate={handleGenerate}
            onClear={handleClear}
            isGenerating={isGenerating}
            isExample={showSampleFlow}
            onToggleExample={setShowSampleFlow}
          />
          <div className="container mx-auto pb-20">
            {/* Drawer for My Flows */}
            <Drawer isOpen={showUserFlowsDrawer} onOpenChange={setShowUserFlowsDrawer} placement="right" size="md" hideCloseButton={true}>
              <DrawerContent>
                <DrawerHeader className="flex justify-between items-center">
                  <span>My Flows</span>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => setShowUserFlowsDrawer(false)}
                    aria-label="Close drawer"
                  >
                    <Icon icon="lucide:x" width={20} height={20} />
                  </Button>
                </DrawerHeader>
                <DrawerBody>
                  <UserFlows 
                    onSelectFlow={handleSelectSavedFlow}
                    onDeleteFlow={(deletedFlowId: string) => {
                      if (currentFlowId && currentFlowId === deletedFlowId) {
                        setCurrentFlow(null);
                        setSubmittedPrompt(null);
                        setIsNewlyGenerated(false);
                        setCurrentFlowId(null);
                      }
                    }}
                  />
                </DrawerBody>
              </DrawerContent>
            </Drawer>

            {/* Main logic for generating and generated flow states */}
            {isGenerating && (
              <GeneratingFlowCard 
                prompt={submittedPrompt} 
                steps={loadingSteps}
                currentProgressMessage={currentProgressMessage}
              />
            )}

            {!isGenerating && displayFlow && (
              <GeneratedFlowCard 
                prompt={showSampleFlow ? EXAMPLE_PROMPT : submittedPrompt} 
                flow={displayFlow}
                isNewlyGenerated={isNewlyGenerated}
                onSaveFlow={handleSaveFlow}
                onDownload={handleDownload}
                onClose={handleClear}
              />
            )}

            {!isGenerating && displayFlow && (
              <OnboardingFlowCards flow={displayFlow} />
            )}

            {error && (
              <div className="text-red-500 text-center mt-4">
                {error}
              </div>
            )}

            <div className="flex flex-col flex-1 md:p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {!isGenerating && hasFlowToDisplay && (
                <>
                  {/* Tabs and Download Button Row */}
                  <div className="flex-col md:flex-row flex mt-8 mb-6 justify-start items-center border-b border-divider">
                    <Tabs
                      selectedKey={selectedMainTab}
                      onSelectionChange={(key) => setSelectedMainTab(key as string)}
                      color="primary"
                      variant="underlined"
                      classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0",
                        cursor: "w-full bg-sky-400",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-white text-lg",
                      }}
                    >
                      <Tab key="summary" title={<span className="sm:inline">Summary</span>} />
                      <Tab key="narrative" title={<span className="sm:inline">Narrative</span>} />
                    </Tabs>
                  </div>

                  <div className="relative">
                    <div className={getTabTransitionClass("summary")}>
                      <OnboardingSummaryTab flow={displayFlow} onDownload={handleDownload} />
                    </div>

                    <div className={getTabTransitionClass("narrative")}>
                      <UXNarrativeTab flow={displayFlow} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <footer className="w-full text-center px-4 py-2 md:p-4">
            <div className="container mx-auto">
              <p>&copy; 2025 Onboarder. All rights reserved.</p>
            </div>
          </footer>
          {showToast && (
            <Toast
              message={toastMsg}
              type={toastType as 'info' | 'success' | 'error'}
              onClose={() => setShowToast(false)}
              className="animate-slide-in-right font-medium text-slate-900"
            />
          )}
        </div>
      </ErrorBoundary>
    </>
  );
}
