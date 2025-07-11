import React, { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'Onboarder - AI-Powered UX Flow Generator',
  description = 'Transform your product ideas into structured onboarding flows with AI-powered UX insights. Generate beautiful, user-friendly onboarding experiences instantly.',
  keywords = 'onboarding, UX design, AI, user experience, flow generator, product design, user journey, design tools',
  image = 'https://onboarder.design/og-image.png',
  url = 'https://onboarder.design',
  type = 'website'
}) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, content: string, property?: string) => {
      let metaTag = document.querySelector(selector);
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        const newMetaTag = document.createElement('meta');
        if (property) {
          newMetaTag.setAttribute('property', property);
        } else {
          newMetaTag.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        }
        newMetaTag.setAttribute('content', content);
        document.head.appendChild(newMetaTag);
      }
    };

    // Update basic meta tags
    updateMetaTag('meta[name="title"]', title);
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', keywords);
    
    // Update Open Graph meta tags
    updateMetaTag('meta[property="og:title"]', title, 'og:title');
    updateMetaTag('meta[property="og:description"]', description, 'og:description');
    updateMetaTag('meta[property="og:image"]', image, 'og:image');
    updateMetaTag('meta[property="og:url"]', url, 'og:url');
    updateMetaTag('meta[property="og:type"]', type, 'og:type');
    
    // Update Twitter meta tags
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[name="twitter:image"]', image);
    updateMetaTag('meta[name="twitter:url"]', url);
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', url);
    } else {
      const newCanonicalLink = document.createElement('link');
      newCanonicalLink.setAttribute('rel', 'canonical');
      newCanonicalLink.setAttribute('href', url);
      document.head.appendChild(newCanonicalLink);
    }
  }, [title, description, keywords, image, url, type]);

  return null;
}; 