import { ChipProps } from "@heroui/react";

export type LayoutType = 'full_screen' | 'modal_form' | 'tooltip_overlay' | 'split_screen' | 'swipeable_cards' | 'default';

export interface FlowCardStyle {
  stepChip: ChipProps;
  typeChip: ChipProps;
}

const flowCardStyles: Record<LayoutType, FlowCardStyle> = {
  modal_form: {
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
  full_screen: {
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
  tooltip_overlay: {
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
  split_screen: {
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
  swipeable_cards: {
    stepChip: {
      size: "md",
      color: "warning",
      className: "bg-yellow-600 text-white font-semibold"
    },
    typeChip: {
      size: "md",
      variant: "flat",
      color: "warning",
      className: "bg-yellow-100 text-yellow-700 font-medium"
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