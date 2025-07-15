import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiPhone, FiFacebook } from 'react-icons/fi';
import { FaFacebookMessenger } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

// Type cast icons
const PhoneIcon = FiPhone as React.ComponentType<any>;
const FacebookIcon = FiFacebook as React.ComponentType<any>;
const MessengerIcon = FaFacebookMessenger as React.ComponentType<any>;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const gridMove = keyframes`
  0% {
    transform: translate(0, -50px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components
const ContactContainer = styled.div`
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
  animation: ${gridMove} 20s linear infinite;
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
  }
  
  &::before {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    top: 60%;
    right: 15%;
    animation-delay: 3s;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 1rem 3rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 1.2s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  animation: ${fadeIn} 1.2s ease-out 0.6s both;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  @media (max-width: 768px) {
    gap: 2rem;
    margin-bottom: 3rem;
  }
`;

const ContactForm = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${slideInLeft} 1s ease-out 0.9s both;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    animation: ${fadeInUp} 1s ease-out 0.9s both;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  animation: ${fadeIn} 1s ease-out 1.2s both;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 0.8s ease-out both;
  
  &:nth-child(1) { animation-delay: 1.4s; }
  &:nth-child(2) { animation-delay: 1.6s; }
  &:nth-child(3) { animation-delay: 1.8s; }
  &:nth-child(4) { animation-delay: 2.0s; }
  &:nth-child(5) { animation-delay: 2.2s; }
  
  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.12);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.12);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.9rem;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(255, 255, 255, 0.15);
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${slideInRight} 1s ease-out 0.9s both;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    animation: ${fadeInUp} 1s ease-out 1.2s both;
  }
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  animation: ${fadeIn} 1s ease-out 1.2s both;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.8s ease-out both;
  
  &:nth-child(1) { animation-delay: 1.4s; }
  &:nth-child(2) { animation-delay: 1.6s; }
  &:nth-child(3) { animation-delay: 1.8s; }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 30px rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    gap: 0.75rem;
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

const ContactDetails = styled.div`
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.25rem;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out both;
  
  &:nth-child(1) { animation-delay: 2.4s; }
  &:nth-child(2) { animation-delay: 2.6s; }
  &:nth-child(3) { animation-delay: 2.8s; }
  &:nth-child(4) { animation-delay: 3.0s; }
  
  &:hover {
    transform: translateY(-8px) scale(1.05);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  &:hover div:first-child {
    animation: ${pulse} 0.6s ease-in-out;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create message for Facebook Messenger
    const message = `Hello! I'm ${formData.name} (${formData.email}).

Subject: ${formData.subject}

Message: ${formData.message}

I'm interested in discussing a project with you.`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Facebook Messenger URL with your page ID
    const messengerUrl = `https://www.facebook.com/messages/t/61559057724990?text=${encodedMessage}`;
    
    // Open Facebook Messenger in new tab
    window.open(messengerUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const openMessenger = () => {
    const messengerUrl = 'https://www.facebook.com/messages/t/61559057724990';
    window.open(messengerUrl, '_blank');
  };

  return (
    <ContactContainer>
      <ChromaGrid />
      <FloatingParticles />
      <Navbar />
      <Content>
        <Header>
          <Title>{t('contact.title')}</Title>
          <Subtitle>{t('contact.subtitle')}</Subtitle>
        </Header>

        <ContactGrid>
          <ContactForm>
            <FormTitle>{t('contact.form.title')}</FormTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">{t('contact.form.name')}</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">{t('contact.form.email')}</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.subjectPlaceholder')}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">{t('contact.form.message')}</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                />
              </FormGroup>
              
              <SubmitButton type="submit">
                <MessengerIcon size={18} />
                {t('contact.form.submit')}
              </SubmitButton>
            </form>
          </ContactForm>

          <ContactInfo>
            <InfoTitle>{t('contact.info.title')}</InfoTitle>
            <ContactList>
              <ContactItem>
                <ContactIcon>
                  <MessengerIcon size={20} />
                </ContactIcon>
                <ContactDetails>
                  <h3>{t('contact.info.messenger.title')}</h3>
                  <p>{t('contact.info.messenger.description')}</p>
                  <button 
                    onClick={openMessenger}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {t('contact.info.messenger.button')}
                  </button>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <FacebookIcon size={20} />
                </ContactIcon>
                <ContactDetails>
                  <h3>{t('contact.info.facebook.title')}</h3>
                  <p>{t('contact.info.facebook.description')}</p>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61559057724990" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      marginTop: '0.5rem',
                      display: 'inline-block'
                    }}
                  >
                    {t('contact.info.facebook.link')}
                  </a>
                </ContactDetails>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <PhoneIcon size={20} />
                </ContactIcon>
                <ContactDetails>
                  <h3>{t('contact.info.whatsapp.title')}</h3>
                  <p>{t('contact.info.whatsapp.description')}</p>
                  <a 
                    href="https://wa.me/+8562059991574" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: '#25D366',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      marginTop: '0.5rem',
                      display: 'inline-block'
                    }}
                  >
                    {t('contact.info.whatsapp.link')}
                  </a>
                </ContactDetails>
              </ContactItem>
            </ContactList>
          </ContactInfo>
        </ContactGrid>

        <StatsSection>
          <StatCard>
            <StatNumber>50+</StatNumber>
            <StatLabel>{t('contact.stats.projectsCompleted')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>24h</StatNumber>
            <StatLabel>{t('contact.stats.responseTime')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>100%</StatNumber>
            <StatLabel>{t('contact.stats.clientSatisfaction')}</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>5+</StatNumber>
            <StatLabel>{t('contact.stats.yearsExperience')}</StatLabel>
          </StatCard>
        </StatsSection>
      </Content>
      <Footer />
    </ContactContainer>
  );
};

export default Contact; 