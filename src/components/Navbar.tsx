import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiBriefcase, FiSettings, FiUser, FiMail } from 'react-icons/fi';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

// Type cast icons
const MenuIcon = FiMenu as React.ComponentType<any>;
const CloseIcon = FiX as React.ComponentType<any>;
const HomeIcon = FiHome as React.ComponentType<any>;
const BriefcaseIcon = FiBriefcase as React.ComponentType<any>;
const SettingsIcon = FiSettings as React.ComponentType<any>;
const UserIcon = FiUser as React.ComponentType<any>;
const MailIcon = FiMail as React.ComponentType<any>;
const FacebookIcon = FaFacebook as React.ComponentType<any>;
const WhatsAppIcon = FaWhatsapp as React.ComponentType<any>;

// Styled Components
const Header = styled.header`
  padding: 0.9rem 0;
  background: rgba(6, 24, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
  
  &:hover {
    color: #ffffff;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background: #ffffff;
    transition: width 0.2s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SocialIcon = styled.a`
  width: 32px;
  height: 30px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
`;

// New Mobile Navigation
const MobileMenuButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.75rem;
    transition: all 0.3s ease;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
    }
  }
`;

const MobileNav = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(6, 24, 0, 0.98);
    backdrop-filter: blur(20px);
    z-index: 999;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }
`;

const MobileNavHeader = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const MobileLogo = styled(Link)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.25rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const MobileCloseButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.75rem;
    transition: all 0.3s ease;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
    }
  }
`;

const MobileNavContent = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }
`;

const MobileNavSection = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 2rem;
  }
`;

const MobileNavTitle = styled.h3`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }
`;

const MobileNavLinks = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const MobileNavLink = styled(Link)<{ $active?: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: ${props => props.$active ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
    border: 1px solid ${props => props.$active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
    border-radius: 16px;
    color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      color: #ffffff;
      transform: translateX(8px);
    }
    
    .nav-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'};
    }
  }
`;

const MobileSocialSection = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const MobileLanguageSection = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const MobileLanguageSwitcher = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const MobileLanguageButton = styled.button<{ $active?: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: ${props => props.$active ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
    border: 1px solid ${props => props.$active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
    border-radius: 16px;
    color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    cursor: pointer;
    width: 100%;
    justify-content: flex-start;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      color: #ffffff;
      transform: translateX(8px);
    }
    
    .flag-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
  }
`;

const MobileSocialIcons = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
`;

const MobileSocialIcon = styled.a`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.1);
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(255, 255, 255, 0.15);
    }
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    backdrop-filter: blur(4px);
  }
`;

interface NavbarProps {
  logoText?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoText = "Portfolio" }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'lo') => {
    setLanguage(newLanguage);
    closeMobileMenu();
  };

  return (
    <>
      <Header>
        <HeaderContainer>
          <Logo to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/images/logo.png" alt="Logo" style={{ height: 34, width: 'auto', display: 'block' }} />
          </Logo>
          
          {/* Desktop Navigation */}
          <Nav $isOpen={false}>
            <NavLinks>
              <NavLink to="/" $active={location.pathname === '/'}>{t('nav.home')}</NavLink>
              <NavLink to="/work" $active={location.pathname === '/work'}>{t('nav.work')}</NavLink>
              <NavLink to="/services" $active={location.pathname === '/services'}>{t('nav.services')}</NavLink>
              <NavLink to="/about" $active={location.pathname === '/about'}>{t('nav.about')}</NavLink>
              <NavLink to="/contact" $active={location.pathname === '/contact'}>{t('nav.contact')}</NavLink>
            </NavLinks>
            <LanguageSwitcher />
            <SocialIcons>
              <SocialIcon href="https://www.facebook.com/profile.php?id=61559057724990" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon size={18} />
              </SocialIcon>
            </SocialIcons>
            <SocialIcons>
              <SocialIcon href="https://wa.me/+8562059991574" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
              </SocialIcon>
            </SocialIcons>
          </Nav>
          
          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={toggleMobileMenu}>
            <MenuIcon size={24} />
          </MobileMenuButton>
        </HeaderContainer>
      </Header>

      {/* Mobile Navigation */}
      <Overlay $isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
      <MobileNav $isOpen={isMobileMenuOpen}>
        <MobileNavHeader>
          <MobileLogo to="/" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/images/logo.png" alt="Logo" style={{ height: 32, width: 'auto', display: 'block' }} />
          </MobileLogo>
          <MobileCloseButton onClick={closeMobileMenu}>
            <CloseIcon size={24} />
          </MobileCloseButton>
        </MobileNavHeader>
        
        <MobileNavContent>
          <MobileNavSection>
            <MobileNavTitle>{t('nav.navigation')}</MobileNavTitle>
            <MobileNavLinks>
              <MobileNavLink to="/" $active={location.pathname === '/'} onClick={closeMobileMenu}>
                <div className="nav-icon">
                  <HomeIcon size={20} />
                </div>
                {t('nav.home')}
              </MobileNavLink>
              <MobileNavLink to="/work" $active={location.pathname === '/work'} onClick={closeMobileMenu}>
                <div className="nav-icon">
                  <BriefcaseIcon size={20} />
                </div>
                {t('nav.work')}
              </MobileNavLink>
              <MobileNavLink to="/services" $active={location.pathname === '/services'} onClick={closeMobileMenu}>
                <div className="nav-icon">
                  <SettingsIcon size={20} />
                </div>
                {t('nav.services')}
              </MobileNavLink>
              <MobileNavLink to="/about" $active={location.pathname === '/about'} onClick={closeMobileMenu}>
                <div className="nav-icon">
                  <UserIcon size={20} />
                </div>
                {t('nav.about')}
              </MobileNavLink>
              <MobileNavLink to="/contact" $active={location.pathname === '/contact'} onClick={closeMobileMenu}>
                <div className="nav-icon">
                  <MailIcon size={20} />
                </div>
                {t('nav.contact')}
              </MobileNavLink>
            </MobileNavLinks>
          </MobileNavSection>
          
          <MobileSocialSection>
            <MobileNavTitle>{t('nav.connect')}</MobileNavTitle>
            <MobileSocialIcons>
              <MobileSocialIcon href="https://www.facebook.com/profile.php?id=61559057724990" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FacebookIcon size={24} />
              </MobileSocialIcon>
              <MobileSocialIcon href="https://wa.me/+8562059991574" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={24} />
              </MobileSocialIcon>
            </MobileSocialIcons>
          </MobileSocialSection>

          <MobileLanguageSection>
            <MobileNavTitle>{t('nav.language')}</MobileNavTitle>
            <MobileLanguageSwitcher>
              <MobileLanguageButton onClick={() => handleLanguageChange('en')} $active={language === 'en'}>
                <span className="flag-icon">🇺🇸</span>
                English
              </MobileLanguageButton>
              <MobileLanguageButton onClick={() => handleLanguageChange('lo')} $active={language === 'lo'}>
                <span className="flag-icon">🇱🇦</span>
                Lao
              </MobileLanguageButton>
            </MobileLanguageSwitcher>
          </MobileLanguageSection>
        </MobileNavContent>
      </MobileNav>
    </>
  );
};

export default Navbar; 