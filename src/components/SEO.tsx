import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  twitterHandle?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Portfolio - Creative Developer & Designer",
  description = "Professional portfolio showcasing creative development, design work, and innovative projects. Expert in React, TypeScript, Three.js, and modern web technologies.",
  keywords = "portfolio, developer, designer, react, typescript, three.js, web development, creative coding, frontend, UI/UX, graphic design, motion graphics",
  author = "Ace Likhith",
  image = "/og-image.jpg",
  url = "https://your-portfolio.com",
  type = "website",
  siteName = "Portfolio - Ace Likhith",
  twitterHandle = "@ace_likhith"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
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

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');
    
    // Open Graph Meta Tags
    updatePropertyTag('og:title', title);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:url', url);
    updatePropertyTag('og:type', type);
    updatePropertyTag('og:site_name', siteName);
    updatePropertyTag('og:locale', 'en_US');
    updatePropertyTag('og:image:width', '1200');
    updatePropertyTag('og:image:height', '630');
    
    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', twitterHandle);
    updateMetaTag('twitter:creator', twitterHandle);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Additional Meta Tags
    updateMetaTag('theme-color', '#061800');
    updateMetaTag('msapplication-TileColor', '#061800');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    updateMetaTag('apple-mobile-web-app-title', 'Portfolio');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    
    // Preconnect links
    const preconnectLinks = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnectLinks.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        if (href.includes('gstatic')) {
          link.setAttribute('crossorigin', 'anonymous');
        }
        document.head.appendChild(link);
      }
    });

    // Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ace Likhith",
      "jobTitle": "Creative Developer & Designer",
      "description": "Professional portfolio showcasing creative development, design work, and innovative projects.",
      "url": "https://your-portfolio.com",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61559057724990",
        "https://www.behance.net/ace_likhith1",
        "https://github.com/Chatoci"
      ],
      "knowsAbout": [
        "React",
        "TypeScript", 
        "Three.js",
        "Web Development",
        "Graphic Design",
        "Motion Graphics"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      }
    };

    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, author, image, url, type, siteName, twitterHandle]);

  return null;
};

export default SEO; 