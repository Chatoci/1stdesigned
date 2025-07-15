import React from 'react';
import styled from 'styled-components';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiAdobepremierepro, SiAdobeaftereffects, SiFigma, SiCanva } from 'react-icons/si';
import { MdTextFields } from 'react-icons/md';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// Type cast icons
const MailIcon = FiMail as React.ComponentType<any>;
const PhoneIcon = FiPhone as React.ComponentType<any>;
const MapPinIcon = FiMapPin as React.ComponentType<any>;
const GithubIcon = FiGithub as React.ComponentType<any>;
const LinkedInIcon = FiLinkedin as React.ComponentType<any>;
const TwitterIcon = FiTwitter as React.ComponentType<any>;

// Styled Components
const AboutContainer = styled.div`
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

const AboutSection = styled.section`
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

const AboutContainerInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutHeader = styled.div`
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

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
    animation: shimmer 3s infinite;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  border: 4px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ProfileTitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  
  svg {
    color: rgba(255, 255, 255, 0.6);
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    gap: 0.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const AboutContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const AboutText = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const SkillsSection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  
  .skill-name {
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
  
  .skill-level {
    color: #fff;
    font-weight: 400;
    margin-top: 8px;
    font-size: 0.85rem;
    background: none;
    height: auto;
    overflow: visible;
    padding: 0;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const ExperienceSection = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
  }
`;

const ExperienceItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  .experience-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  
  .experience-company {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .experience-date {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
  
  .experience-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const About: React.FC = () => {
  const skills = [
    { name: "Adobe Photoshop", level: 90, icon: SiAdobephotoshop as React.ComponentType<any> },
    { name: "Adobe Illustrator", level: 85, icon: SiAdobeillustrator as React.ComponentType<any> },
    { name: "Adobe InDesign", level: 80, icon: SiAdobeindesign as React.ComponentType<any> },
    { name: "Figma", level: 85, icon: SiFigma as React.ComponentType<any> },
    { name: "Canva", level: 90, icon: SiCanva as React.ComponentType<any> },
    { name: "Typography", level: 88, icon: MdTextFields as React.ComponentType<any> },
    { name: "Adobe Premiere Pro", level: 75, icon: SiAdobepremierepro as React.ComponentType<any> },
    { name: "Adobe After Effects", level: 70, icon: SiAdobeaftereffects as React.ComponentType<any> }
  ];

  const experience = [
    {
      title: "Graphic Designer",
      company: "Laos Clean Clean",
      date: "2024 - Present",
      description: "My main job is to design the logo, business card, and other design for the company. Also, I design the product packaging design for the company."
    },
    {
      title: "Graphic Designer & Video Editor",
      company: "YADEA & GOWEI",
      date: "2022 - 2024",
      description: "Make the product packaging design for the company. Social media post design for the company."
    },
    {
      title: "Graphic Designer",
      company: "Haier",
      date: "Freelance",
      description: "Design poster, social media post, and other design for the company. Signage design for the company."
    }
  ];

  return (
    <AboutContainer>
      <ChromaGrid />
      <ContentWrapper>
        <Navbar />
        <AboutSection>
          <AboutContainerInner>
            <AboutHeader>
              <h1>About Me</h1>
              <p>
                Passionate designer and developer with a love for creating meaningful digital experiences. 
                I combine technical expertise with creative vision to build solutions that make a difference.
              </p>
            </AboutHeader>

            <ProfileGrid>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ height: '100%' }}
              >
                <ProfileCard>
                  <ProfileImage>
                    <img src="/images/profile.jpg" alt="Profile" />
                  </ProfileImage>
                  <ProfileName>Ace Likhith</ProfileName>
                  <ProfileTitle>Graphic Designer</ProfileTitle>
                  
                  <ContactInfo>
                    <ContactItem>
                      <MailIcon size={16} />
                      al6091377@email.com
                    </ContactItem>
                    <ContactItem>
                      <PhoneIcon size={16} />
                      +856 (20) 7831-4914
                    </ContactItem>
                    <ContactItem>
                      <MapPinIcon size={16} />
                      Laos, Vientiane, Dongdok
                    </ContactItem>
                  </ContactInfo>

                  <SocialLinks>
                    <SocialIcon href="https://github.com/Chatoci" aria-label="GitHub" target="_blank">
                      <GithubIcon size={18} />
                    </SocialIcon>
                    <SocialIcon href="#" aria-label="LinkedIn">
                      <LinkedInIcon size={18} />
                    </SocialIcon>
                    <SocialIcon href="#" aria-label="Twitter">
                      <TwitterIcon size={18} />
                    </SocialIcon>
                  </SocialLinks>
                </ProfileCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ height: '100%' }}
              >
                <AboutContent>
                  <AboutText>
                    <h3>My Story</h3>
                    <p>
                      My journey as a graphic designer began with a passion for visual storytelling and creativity. Over the years, I have honed my skills in Adobe Creative Suite, Figma, and other design tools to craft compelling visuals that communicate ideas and inspire audiences.
                    </p>
                    <p>
                      I specialize in branding, digital illustrations, and layout design for both print and digital media. I believe that great design is not just about aesthetics, but also about solving problems and making a lasting impact. Every project is an opportunity to blend creativity with strategy, delivering results that exceed expectations.
                    </p>
                  </AboutText>

                  <SkillsSection>
                    <h3>Skills & Expertise</h3>
                    <SkillsGrid>
                      {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        const levelText = skill.name === "Adobe Photoshop" ? "Advance" : "Normal";
                        return (
                          <SkillItem key={index}>
                            <div className="skill-name" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              {Icon && <Icon size={20} style={{ flexShrink: 0 }} />}
                              {skill.name}
                            </div>
                            <div className="skill-level">{levelText}</div>
                          </SkillItem>
                        );
                      })}
                    </SkillsGrid>
                  </SkillsSection>

                  <ExperienceSection>
                    <h3>Experience</h3>
                    {experience.map((exp, index) => (
                      <ExperienceItem key={index}>
                        <div className="experience-title">{exp.title}</div>
                        <div className="experience-company">{exp.company}</div>
                        <div className="experience-date">{exp.date}</div>
                        <div className="experience-description">{exp.description}</div>
                      </ExperienceItem>
                    ))}
                  </ExperienceSection>
                </AboutContent>
              </motion.div>
            </ProfileGrid>
          </AboutContainerInner>
        </AboutSection>

        
        <Footer />
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About; 