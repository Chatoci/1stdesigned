import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiSearch, FiZap } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Type cast icons
const HomeIcon = FiHome as React.ComponentType<any>;
const ArrowLeftIcon = FiArrowLeft as React.ComponentType<any>;
const SearchIcon = FiSearch as React.ComponentType<any>;
const ZapIcon = FiZap as React.ComponentType<any>;

// Styled Components
const NotFoundContainer = styled.div`
  min-height: 100vh;
  background: rgb(6, 24, 0);
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
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, 50px);
    }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const glow = keyframes`
  0%, 100% { 
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
  50% { 
    text-shadow: 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3);
  }
`;

const MainSection = styled.section`
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

const ErrorContainer = styled.div`
  max-width: 800px;
  text-align: center;
  position: relative;
`;

const ErrorCode = styled.h1`
  font-size: 15rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.05em;
  animation: ${glow} 3s ease-in-out infinite;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 6rem;
  }
`;

const ErrorText = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-weight: 700;
  animation: ${pulse} 2s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ErrorDesc = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const ActionButton = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 160px;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    color: #ffffff;
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(255, 255, 255, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 0.9rem;
    width: 100%;
    max-width: 280px;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${float} 4s ease-in-out infinite;
  backdrop-filter: blur(10px);
  
  &:nth-child(1) {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    top: 20%;
    right: 10%;
    animation-delay: 1.5s;
  }
  
  &:nth-child(3) {
    bottom: 15%;
    left: 15%;
    animation-delay: 3s;
  }
  
  &:nth-child(4) {
    bottom: 25%;
    right: 5%;
    animation-delay: 0.5s;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const SuggestionCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  max-width: 600px;
  margin: 0 auto;
  
  h3 {
    color: #ffffff;
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: center;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  li {
    color: rgba(255, 255, 255, 0.8);
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    &::before {
      content: '⚡';
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem;
    
    ul {
      grid-template-columns: 1fr;
    }
    
    li {
      padding: 0.5rem 0.75rem;
      font-size: 0.9rem;
    }
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <ChromaGrid />
      <ContentWrapper>
        <Navbar />
        
        {/* Floating Elements */}
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        
        <MainSection>
          <ErrorContainer>
            <ErrorCode>404</ErrorCode>
            <ErrorText>Page Not Found</ErrorText>
            <ErrorDesc>
              Oops! Looks like this page has wandered off into the digital wilderness. 
              Don't worry, even the best explorers get lost sometimes!
            </ErrorDesc>
            
            <ButtonGroup>
              <ActionButton to="/">
                <HomeIcon size={20} />
                Go Home
              </ActionButton>
              <ActionButton to="/work">
                <ArrowLeftIcon size={20} />
                View My Work
              </ActionButton>
            </ButtonGroup>
            
            <SuggestionCard>
              <h3>
                <SearchIcon size={20} />
                Looking for something specific?
              </h3>
              <ul>
                <li>Check out my latest work in the Showcase</li>
                <li>Learn more about my services</li>
                <li>Get in touch for a project discussion</li>
                <li>Explore my design portfolio</li>
                <li>Read about my experience</li>
                <li>See my contact information</li>
              </ul>
            </SuggestionCard>
          </ErrorContainer>
        </MainSection>
        
        <Footer />
      </ContentWrapper>
    </NotFoundContainer>
  );
};

export default NotFound;
