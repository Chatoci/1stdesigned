import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

// Styled Components
const ServicesContainer = styled.div`
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

const ServicesSection = styled.section`
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

const ServicesContainerInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ServicesHeader = styled.div`
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

// Stepper Components
const StepperContainer = styled.div`
  margin-bottom: 4rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const StepperTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const StepperSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    
    &::before {
      display: none;
    }
  }
`;

const StepperStep = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1rem;
    width: 100%;
  }
`;

const StepCircle = styled.div<{ $active?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.$active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

const StepContent = styled.div`
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
    flex: 1;
  }
`;

const StepTitle = styled.h3<{ $active?: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StepDescription = styled.p<{ $active?: boolean }>`
  font-size: 0.85rem;
  color: ${props => props.$active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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

const PricingCard = styled.div<{ $featured?: boolean; $delay?: number }>`
  background: ${props => props.$featured ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.$featured ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  opacity: 0;
  transform: translateY(40px);
  animation: ${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  ${props => props.$delay !== undefined && css`
    animation-delay: ${props.$delay}s;
  `}
  
  ${props => props.$featured && `
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const PricingTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
`;

const PricingPrice = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  .price {
    font-size: 3rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  
  .period {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    .price {
      font-size: 2.5rem;
    }
  }
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const PricingFeature = styled.li`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '✓';
    color: #667eea;
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PricingButton = styled.a`
  width: 100%;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  margin: 0;
  text-align: center;
  text-decoration: none;
  display: block;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }
`;

const MoreDetailsButton = styled(PricingButton)`
  background: rgba(255,255,255,0.05);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
  &:hover {
    background: rgba(255,255,255,0.15);
    color: #fff;
  }
`;

const Services: React.FC = () => {
  const { t, translations } = useLanguage();

  const pricingPlans = [
    {
      title: t('services.plans.artwork.title'),
      price: t('services.plans.artwork.price'),
      period: t('services.plans.artwork.period'),
      features: translations.services.plans.artwork.features
    },
    {
      title: t('services.plans.motionGraphics.title'),
      price: t('services.plans.motionGraphics.price'),
      period: t('services.plans.motionGraphics.period'),
      features: translations.services.plans.motionGraphics.features,
      featured: true
    },
    {
      title: t('services.plans.brochureDesign.title'),
      price: t('services.plans.brochureDesign.price'),
      period: t('services.plans.brochureDesign.period'),
      features: translations.services.plans.brochureDesign.features
    },
    {
      title: t('services.plans.websiteLanding.title'),
      price: t('services.plans.websiteLanding.price'),
      period: t('services.plans.websiteLanding.period'),
      features: translations.services.plans.websiteLanding.features
    },
    {
      title: t('services.plans.packagingDesign.title'),
      price: t('services.plans.packagingDesign.price'),
      period: t('services.plans.packagingDesign.period'),
      features: translations.services.plans.packagingDesign.features
    },
    {
      title: t('services.plans.bannerDesign.title'),
      price: t('services.plans.bannerDesign.price'),
      period: t('services.plans.bannerDesign.period'),
      features: translations.services.plans.bannerDesign.features
    }
  ];

  return (
    <ServicesContainer>
      <ChromaGrid />
      <ContentWrapper>
        <Navbar />
        <ServicesSection>
          <ServicesContainerInner>
            <ServicesHeader>
              <h1>{t('services.title')}</h1>
              <p>{t('services.subtitle')}</p>
            </ServicesHeader>

            <StepperContainer>
              <StepperTitle>{t('services.stepper.title')}</StepperTitle>
              <StepperSteps>
                <StepperStep>
                  <StepCircle $active={true}>1</StepCircle>
                  <StepContent>
                    <StepTitle $active={true}>{t('services.stepper.step1.title')}</StepTitle>
                    <StepDescription $active={true}>{t('services.stepper.step1.description')}</StepDescription>
                  </StepContent>
                </StepperStep>
                <StepperStep>
                  <StepCircle $active={false}>2</StepCircle>
                  <StepContent>
                    <StepTitle $active={false}>{t('services.stepper.step2.title')}</StepTitle>
                    <StepDescription $active={false}>{t('services.stepper.step2.description')}</StepDescription>
                  </StepContent>
                </StepperStep>
                <StepperStep>
                  <StepCircle $active={false}>3</StepCircle>
                  <StepContent>
                    <StepTitle $active={false}>{t('services.stepper.step3.title')}</StepTitle>
                    <StepDescription $active={false}>{t('services.stepper.step3.description')}</StepDescription>
                  </StepContent>
                </StepperStep>
                <StepperStep>
                  <StepCircle $active={false}>4</StepCircle>
                  <StepContent>
                    <StepTitle $active={false}>{t('services.stepper.step4.title')}</StepTitle>
                    <StepDescription $active={false}>{t('services.stepper.step4.description')}</StepDescription>
                  </StepContent>
                </StepperStep>
              </StepperSteps>
            </StepperContainer>

            <PricingGrid>
              {pricingPlans.map((plan, index) => (
                <PricingCard key={index} $featured={plan.featured} $delay={index * 0.12}>
                  <PricingTitle>{plan.title}</PricingTitle>
                  <PricingPrice>
                    <div className="price">{plan.price}</div>
                    <div className="period">{plan.period}</div>
                  </PricingPrice>
                  <PricingFeatures>
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <PricingFeature key={featureIndex}>{feature}</PricingFeature>
                    ))}
                  </PricingFeatures>
                  <ButtonGroup>
                    <PricingButton href="https://m.me/61559057724990" target="_blank" rel="noopener noreferrer">{t('services.buttons.apply')}</PricingButton>
                    <MoreDetailsButton href="https://m.me/61559057724990" target="_blank" rel="noopener noreferrer">{t('services.buttons.moreDetails')}</MoreDetailsButton>
                  </ButtonGroup>
                </PricingCard>
              ))}
            </PricingGrid>
          </ServicesContainerInner>
        </ServicesSection>
        <Footer />
      </ContentWrapper>
    </ServicesContainer>
  );
};

export default Services; 