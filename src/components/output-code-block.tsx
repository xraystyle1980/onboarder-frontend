import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

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
    <div className="w-full">
      <Card className="w-full bg-content2 overflow-hidden dark-card-body">
        <CardBody className="p-0 dark-card-body">
          <div className="flex items-center justify-between p-4 border-b border-default-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-default-500">onboarding-flow.json</span>
              <Button
                size="sm"
                variant="light"
                onPress={handleCopy}
                startContent={isCopied ? <Icon icon="lucide:check" /> : <Icon icon="lucide:copy" />}
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                size="sm"
                variant="light"
                onPress={handleDownload}
                startContent={<Icon icon="lucide:download" />}
              >
                Download
              </Button>
            </div>
          </div>
          <div className="p-4">
            <pre className="text-sm text-default-700 whitespace-pre-wrap font-mono">
              {formattedJson}
            </pre>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}