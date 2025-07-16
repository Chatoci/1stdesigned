import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiGithub, FiEye } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageSEO from '../components/PageSEO';
import { useLanguage } from '../contexts/LanguageContext';

// Type cast icons
const GithubIcon = FiGithub as React.ComponentType<any>;
const EyeIcon = FiEye as React.ComponentType<any>;

// Styled Components
const WorkContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0f1419 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
`;

const ChromaGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
  
  @keyframes gridMove {
    0% {
      transform: translate(0, -50px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const WorkSection = styled.section`
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

const WorkContainerInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WorkHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const FilterTab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
    padding: 0;
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProjectCard = styled.div<{ $delay?: number }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(40px);
  animation: ${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  ${props => props.$delay !== undefined && css`
    animation-delay: ${props.$delay}s;
  `}
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-4px);
    }
    border-radius: 12px;
    margin: 0;
    width: 100%;
  }
`;

const ProjectImage = styled.div<{ bgColor: string; $hasImage?: boolean }>`
  height: 200px;
  background: ${props => props.$hasImage ? 'transparent' : props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$hasImage ? 'none' : 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)'};
    animation: ${props => props.$hasImage ? 'none' : 'shimmer 2s infinite'};
  }
  
  .project-placeholder {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 1;
    display: ${props => props.$hasImage ? 'none' : 'block'};
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ProjectTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.4rem;
    margin-bottom: 1.25rem;
  }
`;

const ProjectTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ProjectButton = styled.a`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  justify-content: center;
  width: 100%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    justify-content: center;
    width: 100%;
  }
`;

const VideoMotionSection = styled.section`
  padding: 6rem 2rem 4rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem 2rem;
  }
`;

const VideoMotionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const VideoMotionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: 3rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const VideoMotionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const VideoMotionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const VideoMotionVideo = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    height: 200px;
    
    .play-button {
      width: 50px;
      height: 50px;
      font-size: 1.2rem;
    }
  }
`;

const VideoMotionContent = styled.div`
  padding: 1.5rem;
`;

const VideoMotionTitle = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const VideoMotionDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const VideoMotionTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const VideoMotionTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
`;

const VideoMotionActions = styled.div`
  display: flex;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const VideoMotionButton = styled.a`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  justify-content: center;
  width: 100%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
`;

const PackagingSection = styled.section`
  padding: 6rem 2rem 4rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem 2rem;
  }
`;

const PackagingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PackagingHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: 3rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const PackagingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const PackagingCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  aspect-ratio: 1;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-4px);
    }
    border-radius: 12px;
  }
`;

const PackagingImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const Work: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { t, translations } = useLanguage();

  const projects = [
    {
      id: 1,
      title: t('work.projects.ecommerce.title'),
      description: t('work.projects.ecommerce.description'),
      category: "web",
      tags: translations.work.projects.ecommerce.tags,
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "/work/ecommerce.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: t('work.projects.banking.title'),
      description: t('work.projects.banking.description'),
      category: "mobile",
      tags: translations.work.projects.banking.tags,
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      image: "/work/mobile.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: t('work.projects.designSystem.title'),
      description: t('work.projects.designSystem.description'),
      category: "design",
      tags: translations.work.projects.designSystem.tags,
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "/work/system.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: t('work.projects.aiChat.title'),
      description: t('work.projects.aiChat.description'),
      category: "web",
      tags: translations.work.projects.aiChat.tags,
      bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image: "/work/ai.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: t('work.projects.fitness.title'),
      description: t('work.projects.fitness.description'),
      category: "mobile",
      tags: translations.work.projects.fitness.tags,
      bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      image: "/work/fitness.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: t('work.projects.portfolio.title'),
      description: t('work.projects.portfolio.description'),
      category: "design",
      tags: translations.work.projects.portfolio.tags,
      bgColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      image: "/work/portfolio.png",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Video Motion data
  const videoMotionData = [
    {
      id: 1,
      title: "Tissue Motion Graphics",
      description: "Dynamic motion graphics for tissue product campaign.",
      video: "/videos/product-launch.mp4",
      thumbnail: "/motion/tissue.jpg",
      tags: ["After Effects", "Motion Graphics", "Product"],
      duration: "2:30",
      category: "Commercial"
    },
    {
      id: 2,
      title: "First Place Motion",
      description: "Animated motion graphics for first place achievement.",
      video: "/videos/brand-motion.mp4",
      thumbnail: "/motion/1st.jpg",
      tags: ["Logo Animation", "Motion Graphics"],
      duration: "1:45",
      category: "Branding"
    },
    {
      id: 3,
      title: "Video Motion Content",
      description: "Professional video motion content and animations.",
      video: "  ",
      thumbnail: "/motion/Vdo.jpg",
      tags: ["Video Motion", "Animation", "Professional"],
      duration: "0:30",
      category: "Social"
    }
  ];

  // Packaging Design data
  const packagingData = [
    {
      id: 1,
      image: "/packaging/packaging1.jpg",
      alt: "Product Packaging Design 1"
    },
    {
      id: 2,
      image: "/packaging/packaging2.jpg",
      alt: "Product Packaging Design 2"
    },
    {
      id: 3,
      image: "/packaging/packaging3.jpg",
      alt: "Product Packaging Design 3"
    },
    {
      id: 4,
      image: "/packaging/packaging4.jpg",
      alt: "Product Packaging Design 4"
    },
    {
      id: 5,
      image: "/packaging/packaging5.jpg",
      alt: "Product Packaging Design 5"
    },
    {
      id: 6,
      image: "/packaging/packaging6.jpg",
      alt: "Product Packaging Design 6"
    }
  ];

  return (
    <>
      <PageSEO
        title="Work"
        description="Explore my portfolio of creative projects, web applications, and design work. From React applications to 3D experiences, discover innovative solutions that showcase technical expertise and creative vision."
        keywords="portfolio projects, web development, react projects, design work, creative projects, 3D experiences, digital solutions"
        image="/og-work.jpg"
      />
      <WorkContainer>
        <ChromaGrid />
        <ContentWrapper>
          <Navbar />
          <WorkSection>
            <WorkContainerInner>
              <WorkHeader>
                <h1>{t('work.title')}</h1>
                <p>{t('work.subtitle')}</p>
              </WorkHeader>

              <FilterTabs>
                <FilterTab 
                  active={activeFilter === 'all'} 
                  onClick={() => setActiveFilter('all')}
                >
                  {t('work.filters.all')}
                </FilterTab>
                <FilterTab 
                  active={activeFilter === 'web'} 
                  onClick={() => setActiveFilter('web')}
                >
                  {t('work.filters.web')}
                </FilterTab>
                <FilterTab 
                  active={activeFilter === 'mobile'} 
                  onClick={() => setActiveFilter('mobile')}
                >
                  {t('work.filters.mobile')}
                </FilterTab>
                <FilterTab 
                  active={activeFilter === 'design'} 
                  onClick={() => setActiveFilter('design')}
                >
                  {t('work.filters.design')}
                </FilterTab>
              </FilterTabs>

              <ProjectsGrid>
                {filteredProjects.map((project, idx) => (
                  <ProjectCard key={project.id} $delay={idx * 0.12}>
                    <ProjectImage bgColor={project.bgColor} $hasImage={!!project.image}>
                      {project.image && <img src={project.image} alt={project.title} />}
                      <div className="project-placeholder">
                        {project.title}
                      </div>
                    </ProjectImage>
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>
                      <ProjectTags>
                        {project.tags.map((tag: string, index: number) => (
                          <ProjectTag key={index}>{tag}</ProjectTag>
                        ))}
                      </ProjectTags>
                      <ProjectActions>
                        <ProjectButton href={project.liveUrl}>
                          <EyeIcon size={14} />
                          {t('work.buttons.liveDemo')}
                        </ProjectButton>
                        <ProjectButton href={project.githubUrl}>
                          <GithubIcon size={14} />
                          {t('work.buttons.code')}
                        </ProjectButton>
                      </ProjectActions>
                    </ProjectContent>
                  </ProjectCard>
                ))}
              </ProjectsGrid>
            </WorkContainerInner>
          </WorkSection>

          <VideoMotionSection>
            <VideoMotionContainer>
              <VideoMotionHeader>
                <h2>Video Motion</h2>
                <p>Explore our dynamic motion graphics and video animations that bring brands to life with engaging visual storytelling.</p>
              </VideoMotionHeader>
              
              <VideoMotionGrid>
                {videoMotionData.map((video) => (
                  <VideoMotionCard key={video.id}>
                    <VideoMotionVideo>
                      {video.video.includes('facebook.com/plugins/video.php') ? (
                        <iframe
                          src={video.video}
                          title={video.title}
                          width="100%"
                          height="100%"
                          style={{ border: 'none', overflow: 'hidden' }}
                          scrolling="no"
                          frameBorder="0"
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                      ) : video.video.startsWith('http') ? (
                        <iframe
                          src={video.video}
                          title={video.title}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allowFullScreen
                        />
                      ) : (
                        <video 
                          src={video.video} 
                          poster={video.thumbnail}
                          muted
                          loop
                        />
                      )}
                      <div className="play-button">▶</div>
                    </VideoMotionVideo>
                    <VideoMotionContent>
                      <VideoMotionTitle>{video.title}</VideoMotionTitle>
                      <VideoMotionDescription>{video.description}</VideoMotionDescription>
                      <VideoMotionTags>
                        {video.tags.map((tag, index) => (
                          <VideoMotionTag key={index}>{tag}</VideoMotionTag>
                        ))}
                      </VideoMotionTags>
                      <VideoMotionActions>
                        <VideoMotionButton 
                          href={video.video} 
                          target="_blank"
                        >
                          Watch Full Video
                        </VideoMotionButton>
                        <VideoMotionButton 
                          href="https://wa.me/+8562059991574" 
                          target="_blank"
                        >
                          Discuss Project
                        </VideoMotionButton>
                      </VideoMotionActions>
                    </VideoMotionContent>
                  </VideoMotionCard>
                ))}
              </VideoMotionGrid>
              
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <VideoMotionButton 
                  href="https://www.facebook.com/profile.php?id=61559057724990&sk=reels_tab" 
                  target="_blank"
                  style={{ 
                    maxWidth: '200px', 
                    margin: '0 auto',
                    fontSize: '1rem',
                    padding: '1rem 1rem'
                  }}
                >
                  View More
                </VideoMotionButton>
              </div>
            </VideoMotionContainer>
          </VideoMotionSection>

          <PackagingSection>
            <PackagingContainer>
              <PackagingHeader>
                <h2>Packaging Design</h2>
                <p>Explore our innovative packaging designs that combine functionality with aesthetics, ensuring a memorable brand experience.</p>
              </PackagingHeader>
              
              <PackagingGrid>
                {packagingData.map((pack) => (
                  <PackagingCard key={pack.id}>
                    <PackagingImage>
                      <img src={pack.image} alt={pack.alt} />
                    </PackagingImage>
                  </PackagingCard>
                ))}
              </PackagingGrid>
              
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <VideoMotionButton 
                  href="https://www.facebook.com/profile.php?id=61559057724990&sk=reels_tab" 
                  target="_blank"
                  style={{ 
                    maxWidth: '200px', 
                    margin: '0 auto',
                    fontSize: '1rem',
                    padding: '1rem 1rem'
                  }}
                >
                  View More
                </VideoMotionButton>
              </div>
            </PackagingContainer>
          </PackagingSection>
          <Footer />
        </ContentWrapper>
      </WorkContainer>
    </>
  );
};

export default Work; 