import { ChipProps } from "@heroui/react";

export type LayoutType = 'modal' | 'full screen' | 'tooltip' | 'embedded' | 'default';

export interface FlowCardStyle {
  stepChip: ChipProps;
  typeChip: ChipProps;
}

const flowCardStyles: Record<LayoutType, FlowCardStyle> = {
  modal: {
    stepChip: {
      size: "md",
      color: "primary",
      className: "bg-purple-600 text-white font-semibold"
    },
    typeChip: {
      size: "md",
      variant: "flat",
      color: "primary",
      className: "bg-purple-100 text-purple-700 font-medium"
    }
  },
  "full screen": {
    stepChip: {
      size: "md",
      color: "secondary",
      className: "bg-blue-600 text-white font-semibold"
    },
    typeChip: {
      size: "md",
      variant: "flat",
      color: "secondary",
      className: "bg-blue-100 text-blue-700 font-medium"
    }
  },
  tooltip: {
    stepChip: {
      size: "md",
      color: "default",
      className: "bg-gray-600 text-white font-semibold"
    },
    typeChip: {
      size: "md",
      variant: "flat",
      color: "default",
      className: "bg-gray-100 text-gray-700 font-medium"
    }
  },
  embedded: {
    stepChip: {
      size: "md",
      color: "success",
      className: "bg-green-600 text-white font-semibold"
    },
    typeChip: {
      size: "md",
      variant: "flat",
      color: "success",
      className: "bg-green-100 text-green-700 font-medium"
    }
  },
  default: {
    stepChip: {
      size: "md",
      color: "default",
      className: "bg-gray-600 text-white font-semibold"
    },
    typeChip: {
      size: "md",
      variant: "flat",
      color: "default",
      className: "bg-gray-100 text-gray-700 font-medium"
    }
  }
};

export const getFlowCardStyle = (layout: string): FlowCardStyle => {
  return flowCardStyles[layout as LayoutType] || flowCardStyles.default;
}; 