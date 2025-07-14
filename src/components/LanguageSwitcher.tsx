import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

// Type cast icons
const ChevronDownIcon = FiChevronDown as React.ComponentType<any>;
const GlobeIcon = FiGlobe as React.ComponentType<any>;

const LanguageSwitcherContainer = styled.div`
  position: relative;
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

const LanguageButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 80px;
  justify-content: space-between;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    color: #ffffff;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
    min-width: 70px;
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 120px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    right: 0;
    min-width: 100px;
  }
`;

const LanguageOption = styled.button<{ $active: boolean }>`
  width: 100%;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border: none;
  color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: ${props => props.$active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
  
  &:first-child {
    margin-bottom: 0.25rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.75rem;
  }
`;

const LanguageFlag = styled.span`
  font-size: 1rem;
  line-height: 1;
`;

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLanguage: 'en' | 'lo') => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getCurrentLanguageDisplay = () => {
    switch (language) {
      case 'en':
        return { flag: '🇺🇸' };
      case 'lo':
        return { flag: '🇱🇦' };
      default:
        return { flag: '🌐' };
    }
  };

  const currentLang = getCurrentLanguageDisplay();

  return (
    <LanguageSwitcherContainer ref={dropdownRef}>
      <LanguageButton onClick={toggleDropdown} aria-label="Select language">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GlobeIcon size={14} />
          <LanguageFlag>{currentLang.flag}</LanguageFlag>
        </div>
        <ChevronDownIcon 
          size={12} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </LanguageButton>
      
      <DropdownMenu $isOpen={isOpen}>
        <LanguageOption
          $active={language === 'en'}
          onClick={() => handleLanguageChange('en')}
        >
          <LanguageFlag>🇺🇸</LanguageFlag>
        </LanguageOption>
        <LanguageOption
          $active={language === 'lo'}
          onClick={() => handleLanguageChange('lo')}
        >
          <LanguageFlag>🇱🇦</LanguageFlag>
        </LanguageOption>
      </DropdownMenu>
    </LanguageSwitcherContainer>
  );
};

export default LanguageSwitcher; 