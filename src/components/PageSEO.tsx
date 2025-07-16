import React, { useEffect } from 'react';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  keywords,
  image = "/og-image.jpg",
  url,
  type = "website"
}) => {
  const fullTitle = `${title} - Portfolio`;
  const currentUrl = url || window.location.href;
  
  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Page-specific Meta Tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    
    // Open Graph Meta Tags
    updatePropertyTag('og:title', fullTitle);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:url', currentUrl);
    updatePropertyTag('og:type', type);
    
    // Twitter Card Meta Tags
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;

  }, [fullTitle, description, keywords, image, currentUrl, type]);

  return null;
};

export default PageSEO; 