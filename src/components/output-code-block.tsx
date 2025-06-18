import React from "react";
import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";

interface OutputCodeBlockProps {
  data: any;
}

export const OutputCodeBlock: React.FC<OutputCodeBlockProps> = ({ data }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  
  const formattedJson = JSON.stringify(data, null, 2);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([formattedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "onboarding-flow.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <Card className="w-full bg-content2 overflow-hidden">
        <div className="flex items-center justify-between bg-content3 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-danger"></div>
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
          </div>
          <div className="text-xs text-default-500">onboarding-flow.json</div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="utility"
              isIconOnly
              onPress={handleCopy}
              className="min-w-0 w-8 h-8"
              aria-label="Copy code"
            >
              <Icon icon={isCopied ? "lucide:check" : "lucide:copy"} width={16} />
            </Button>
            <Button 
              size="sm" 
              variant="utility"
              isIconOnly
              onPress={handleDownload}
              className="min-w-0 w-8 h-8"
              aria-label="Download JSON"
            >
              <Icon icon="lucide:download" width={16} />
            </Button>
          </div>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono">
          <code>{formattedJson}</code>
        </pre>
      </Card>
    </div>
  );
}