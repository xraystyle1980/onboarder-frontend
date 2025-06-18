import React, { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'Onboarder - AI-Powered UX Flow Generator',
  description = 'Transform your product ideas into structured onboarding flows with AI-powered UX insights. Generate beautiful, user-friendly onboarding experiences instantly.',
}) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = description;
      document.head.appendChild(newMetaDescription);
    }
  }, [title, description]);

  return null;
}; 