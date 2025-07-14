import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const TestContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 12px;
  z-index: 9999;
  font-family: inherit;
`;

const FontTest: React.FC = () => {
  const { language } = useLanguage();

  return (
    <TestContainer>
      <div>Language: {language}</div>
      <div>Font Test: ສະບາຍດີ (Hello in Lao)</div>
      <div>English Test: Hello World</div>
    </TestContainer>
  );
};

export default FontTest; 