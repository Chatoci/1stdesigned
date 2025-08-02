import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiArrowRight, FiInstagram, FiDribbble, FiClock, FiHeart, FiMessageCircle, FiX, FiStar } from 'react-icons/fi';
import { FaBehance, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageSEO from '../components/PageSEO';
import { fetchFacebookPosts, BlogPost } from '../services/facebookService';
import TrueFocus from './TrueFocus';
import './TrueFocus.css';
import { useLanguage } from '../contexts/LanguageContext';

// Type cast icons to resolve TypeScript issues
const ArrowRightIcon = FiArrowRight as React.ComponentType<any>;
const InstagramIcon = FiInstagram as React.ComponentType<any>;
const BehanceIcon = FaBehance as React.ComponentType<any>;
const DribbbleIcon = FiDribbble as React.ComponentType<any>;
const FacebookIcon = FaFacebook as React.ComponentType<any>;
const WhatsAppIcon = FaWhatsapp as React.ComponentType<any>;
const ClockIcon = FiClock as React.ComponentType<any>;
const HeartIcon = FiHeart as React.ComponentType<any>;
const MessageIcon = FiMessageCircle as React.ComponentType<any>;
const CloseIcon = FiX as React.ComponentType<any>;
const StarIcon = FiStar as React.ComponentType<any>;

// Animations
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const marquee = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0f1419 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
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

const HeroSection = styled.section`
  padding: 7rem 2rem 4rem;
  display: flex;
  align-items: center;
  min-height: 100vh;
  background: transparent;
  
  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    
    & > div:last-child {
      order: -1;
    }
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 4rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    letter-spacing: -0.03em;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  
  p {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 3rem;
    line-height: 1.7;
    max-width: 500px;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      max-width: 100%;
    }
  }
`;

const CTAButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.25rem 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  backdrop-filter: blur(10px);
  flex: 1;
  min-width: 200px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 0.9rem;
    justify-content: center;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    flex: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 8px;
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
  
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

const HeroImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  .hero-image {
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.25rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    
    @media (max-width: 768px) {
      width: 300px;
      height: 300px;
      font-size: 1rem;
    }
    
    @media (max-width: 480px) {
      width: 250px;
      height: 250px;
      font-size: 0.9rem;
    }
  }
  
  .hero-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    animation: shimmer 2s infinite;
  }
  
  .hero-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes lightSweep {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const ShowcaseSection = styled.section`
  padding: 6rem 2rem 4rem;
  @media (max-width: 768px) {
    padding: 4rem 1rem 2rem;
  }
`;

const ShowcaseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ShowcaseHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h2 {
    font-size: 2.5rem;
    font-weight: 900;
    color: #fff;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
    text-shadow: 0 0 20px rgba(255,255,255,0.2);
    @media (max-width: 768px) { font-size: 2rem; }
  }
  p {
    color: rgba(255,255,255,0.8);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
    @media (max-width: 768px) { font-size: 1rem; }
  }
`;

const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const ShowcaseCard = styled.div`
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  transition: all 0.3s;
  position: relative;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 16px 40px rgba(0,0,0,0.13);
    border-color: rgba(255,255,255,0.32);
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%);
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    transition: none;
    animation: sweep 1.2s cubic-bezier(0.4,0.2,0.2,1) forwards;
    animation-play-state: paused;
  }
  &:hover::after {
    animation-play-state: running;
  }
  @keyframes sweep {
    0% { left: -75%; }
    60% { left: 120%; }
    100% { left: 120%; }
  }
`;

const ShowcaseImage = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  @media (max-width: 768px) { height: 120px; font-size: 1.2rem; }
`;

const ShowcaseContent = styled.div`
  padding: 1.5rem;
`;

const ShowcaseTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ShowcaseDesc = styled.p`
  color: rgba(255,255,255,0.8);
  font-size: 0.95rem;
  margin-bottom: 0;
`;

const ShowcaseViewMoreButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 3rem auto 0;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 0.9rem;
  }
`;

const BlogSection = styled.section`
  padding: 6rem 2rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BlogHeader = styled.div`
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled.article`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  
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
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    animation: shimmer 2s infinite;
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 1;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const BlogExcerpt = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const BlogActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const BlogAction = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 6px;
  
  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ViewAllButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 0.9rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
`;

const BlogHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

// Modal Components
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalContent = styled.div<{ isOpen: boolean }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  backdrop-filter: blur(20px);
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.9)'};
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 768px) {
    max-height: 95vh;
    border-radius: 16px;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '🔍 Click to view full size';
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    height: 300px;
    border-radius: 16px 16px 0 0;
  }
`;

// Full Screen Image Modal
const FullScreenOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  padding: 0;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const FullScreenImage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0;
  }
`;

const FullScreenCloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    top: 1rem;
    right: 1rem;
  }
`;

// Popup Components
const PopupOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PopupContent = styled.div<{ isOpen: boolean }>`
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.9)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 16px;
  }
`;

const PopupCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const PopupImage = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  a {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: transform 0.3s ease;
    position: relative;
    
    &:hover {
      transform: scale(1.02);
    }
    
    &::after {
      content: 'Click to visit Facebook';
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    &:hover::after {
      opacity: 1;
    }
  }
  
  img {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 20px;
    
    @media (max-width: 768px) {
      border-radius: 16px;
    }
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ModalDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ModalDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const ModalDetail = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  
  .detail-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  
  .detail-value {
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ModalButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  flex: 1;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 0.85rem;
  }
`;

// Showcase data
const showcaseData = [
  {
    id: 1,
    title: "Brand Identity for Tissue Paper",
    description: "Complete brand identity design including logo, color palette, typography, and visual for a tissue paper advertisement",
    image: "/photo/cc.jpg",
    category: "Brand Identity",
    duration: "3 weeks",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
    client: "Laos Clean Clear.",
    year: "2024"
  },
  {
    id: 2,
    title: "Brochure Design for Scooter",
    description: "The brochure should be designed in a way that is easy to understand and use.",
    image: "/photo/gowei.jpg",
    category: "Brochure Design",
    duration: "2 weeks",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    client: "Gowei Scooter",
    year: "2024"
  },
  {
    id: 3,
    title: "Signage Design for a Haier",
    description: "The signage should be designed in Pi MAi Laos a way that is easy to understand and use.",
    image: "/photo/haier.jpg",
    category: "Signage Design",
    duration: "4 weeks",
    tools: ["Figma", "React", "Styled Components"],
    client: "Haier",
    year: "2025"
  }
];

// Customer Review Section Styled Components
const CustomerReviewSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ReviewHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 1s ease-out;
  
  h2 {
    font-size: 3rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ReviewCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out both;
  position: relative;
  overflow: hidden;
  
  &:nth-child(1) { animation-delay: 0.3s; }
  &:nth-child(2) { animation-delay: 0.6s; }
  &:nth-child(3) { animation-delay: 0.9s; }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.1);
    font-family: serif;
    animation: ${float} 3s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ReviewContent = styled.div`
  margin-bottom: 2rem;
  
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.7;
    font-style: italic;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  
  svg {
    color: #ffd700;
    animation: ${pulse} 2s ease-in-out infinite;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.1s; }
    &:nth-child(3) { animation-delay: 0.2s; }
    &:nth-child(4) { animation-delay: 0.3s; }
    &:nth-child(5) { animation-delay: 0.4s; }
  }
`;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const AuthorInfo = styled.div`
  h4 {
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin: 0;
  }
`;

const ReviewStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  animation: ${fadeInUp} 1s ease-out 1.2s both;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const ReviewStatItem = styled.div`
  text-align: center;
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .stat-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const MarqueeSection = styled.section`
  padding: 2rem 0;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
`;

const MarqueeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  animation: ${marquee} 30s linear infinite;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    gap: 2rem;
    animation-duration: 20s;
  }
`;

const MarqueeLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  &:hover img {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    min-width: 80px;
    height: 40px;
    padding: 0.25rem;
  }
`;

const MarqueeWrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(15, 20, 25, 1), transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(15, 20, 25, 1), transparent);
  }
`;

const Home: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowcase, setSelectedShowcase] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useLanguage();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts = await fetchFacebookPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowcaseClick = (showcase: any) => {
    setSelectedShowcase(showcase);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShowcase(null);
  };

  const openFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('showcase-section');
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Auto show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Customer review data with translations
  const reviewData = [
    {
      id: 1,
      content: t('reviews.reviews.0.content'),
      rating: 5,
      author: t('reviews.reviews.0.author'),
      position: t('reviews.reviews.0.position'),
      avatar: t('reviews.reviews.0.avatar')
    },
    {
      id: 2,
      content: t('reviews.reviews.1.content'),
      rating: 5,
      author: t('reviews.reviews.1.author'),
      position: t('reviews.reviews.1.position'),
      avatar: t('reviews.reviews.1.avatar')
    },
    {
      id: 3,
      content: t('reviews.reviews.2.content'),
      rating: 5,
      author: t('reviews.reviews.2.author'),
      position: t('reviews.reviews.2.position'),
      avatar: t('reviews.reviews.2.avatar')
    }
  ];

  return (
    <>
      <PageSEO
        title="Home"
        description="Creative developer and designer portfolio showcasing innovative web projects, 3D experiences, and cutting-edge digital solutions. Expert in React, TypeScript, Three.js, and modern web technologies."
        keywords="portfolio, creative developer, designer, react, typescript, three.js, web development, 3D experiences, digital solutions"
        image="/og-home.jpg"
      />
      <HomeContainer>
        <ChromaGrid />
        <ContentWrapper>
          <Navbar />
          <HeroSection>
            <HeroContent>
              <HeroText>
                <h2>
                  <TrueFocus
                    sentence={t('hero.title')}
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#67e8f9"
                    animationDuration={1}
                    pauseBetweenAnimations={1}
                  />
                </h2>
                <p>
                  {t('hero.subtitle')}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                  <CTAButton onClick={scrollToShowcase}>
                    {t('hero.cta')}
                    <ArrowRightIcon />
                  </CTAButton>
                  <CTAButton onClick={openPopup} style={{ background: 'rgba(103, 232, 249, 0.1)', borderColor: 'rgba(103, 232, 249, 0.3)' }}>
                    Special Offer
                    <ArrowRightIcon />
                  </CTAButton>
                </div>
                <SocialLinks>
                  <SocialIcon href="https://www.facebook.com/profile.php?id=61559057724990" target="_blank" aria-label="Facebook">
                    <FacebookIcon size={20} />
                  </SocialIcon>
                  <SocialIcon href="#" aria-label="Instagram">
                    <InstagramIcon size={20} />
                  </SocialIcon>
                  <SocialIcon href="https://www.behance.net/ace_likhith1" aria-label="Behance" target="_blank">
                    <BehanceIcon size={20} />
                  </SocialIcon>
                  <SocialIcon href="/notfound" aria-label="Dribbble">
                    <DribbbleIcon size={20} target="_blank"/>
                  </SocialIcon>
                  <SocialIcon href="https://wa.me/+8562059991574" aria-label="WhatsApp" target="_blank">
                    <WhatsAppIcon size={20} />
                  </SocialIcon>
                </SocialLinks>
              </HeroText>
              <HeroImage>
                <div className="hero-image">
                  <img src="/images/Ace.jpg" alt="Ace" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                </div>
              </HeroImage>
            </HeroContent>
          </HeroSection>

          <MarqueeSection>
            <MarqueeWrapper>
              <MarqueeContainer>
                <MarqueeLogo>
                  <img src="/cus_logo/jing.png" alt="Jing" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/wulianye.png" alt="Wulianye" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/haier.png" alt="Haier" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/huawei.png" alt="Huawei" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/tecno.png" alt="Tecno" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/gowei.png" alt="Gowei" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/yadea.png" alt="Yadea" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/xinyue.png" alt="Xinyue" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/kingmaker.png" alt="Kingmaker" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/thip.png" alt="Thip" />
                </MarqueeLogo>
                {/* Duplicate logos for seamless scrolling */}
                <MarqueeLogo>
                  <img src="/cus_logo/jing.png" alt="Jing" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/wulianye.png" alt="Wulianye" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/haier.png" alt="Haier" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/huawei.png" alt="Huawei" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/tecno.png" alt="Tecno" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/gowei.png" alt="Gowei" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/yadea.png" alt="Yadea" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/xinyue.png" alt="Xinyue" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/kingmaker.png" alt="Kingmaker" />
                </MarqueeLogo>
                <MarqueeLogo>
                  <img src="/cus_logo/thip.png" alt="Thip" />
                </MarqueeLogo>
              </MarqueeContainer>
            </MarqueeWrapper>
          </MarqueeSection>

          <ShowcaseSection id="showcase-section">
            <ShowcaseContainer>
              <ShowcaseHeader>
                <h2>{t('showcase.title')}</h2>
                <p>{t('showcase.subtitle')}</p>
              </ShowcaseHeader>
              <ShowcaseGrid>
                {showcaseData.map((showcase) => (
                  <ShowcaseCard key={showcase.id} onClick={() => handleShowcaseClick(showcase)} style={{ cursor: 'pointer' }}>
                    <ShowcaseImage>
                      <img src={showcase.image} alt={showcase.title} style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
                    </ShowcaseImage>
                    <ShowcaseContent>
                      <ShowcaseTitle>{showcase.title}</ShowcaseTitle>
                      <ShowcaseDesc>{showcase.description.split('.')[0]}.</ShowcaseDesc>
                    </ShowcaseContent>
                  </ShowcaseCard>
                ))}
              </ShowcaseGrid>
              <ShowcaseViewMoreButton onClick={() => window.open('https://www.behance.net/ace_likhith1', '_blank')}>
                View More on Behance
                <BehanceIcon size={20} />
              </ShowcaseViewMoreButton>
            </ShowcaseContainer>
          </ShowcaseSection>

          {/* Modal */}
          <ModalOverlay isOpen={isModalOpen} onClick={closeModal}>
            <ModalContent isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
              {selectedShowcase && (
                <>
                  <ModalCloseButton onClick={closeModal}>
                    <CloseIcon size={20} />
                  </ModalCloseButton>
                  <ModalImage onClick={openFullScreen}>
                    <img src={selectedShowcase.image} alt={selectedShowcase.title} />
                  </ModalImage>
                  <ModalBody>
                    <ModalTitle>{selectedShowcase.title}</ModalTitle>
                    <ModalDescription>{selectedShowcase.description}</ModalDescription>
                    <ModalDetails>
                      <ModalDetail>
                        <div className="detail-label">Category</div>
                        <div className="detail-value">{selectedShowcase.category}</div>
                      </ModalDetail>
                      <ModalDetail>
                        <div className="detail-label">Duration</div>
                        <div className="detail-value">{selectedShowcase.duration}</div>
                      </ModalDetail>
                      <ModalDetail>
                        <div className="detail-label">Client</div>
                        <div className="detail-value">{selectedShowcase.client}</div>
                      </ModalDetail>
                      <ModalDetail>
                        <div className="detail-label">Year</div>
                        <div className="detail-value">{selectedShowcase.year}</div>
                      </ModalDetail>
                    </ModalDetails>
                    <ModalDetails>
                      <ModalDetail style={{ gridColumn: '1 / -1' }}>
                        <div className="detail-label">Tools Used</div>
                        <div className="detail-value">{selectedShowcase.tools.join(', ')}</div>
                      </ModalDetail>
                    </ModalDetails>
                    <ModalActions>
                      <ModalButton onClick={() => window.open('https://wa.me/+8562059991574', '_blank')}>
                        Discuss Project
                      </ModalButton>
                      <ModalButton onClick={closeModal}>
                        Close
                      </ModalButton>
                    </ModalActions>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </ModalOverlay>

          {/* Full Screen Image Modal */}
          <FullScreenOverlay isOpen={isFullScreenOpen} onClick={closeFullScreen}>
            <FullScreenImage onClick={(e) => e.stopPropagation()}>
              {selectedShowcase && (
                <>
                  <img src={selectedShowcase.image} alt={selectedShowcase.title} />
                  <FullScreenCloseButton onClick={closeFullScreen}>
                    <CloseIcon size={24} />
                  </FullScreenCloseButton>
                </>
              )}
            </FullScreenImage>
          </FullScreenOverlay>

          {/* Popup */}
          <PopupOverlay isOpen={isPopupOpen} onClick={closePopup}>
            <PopupContent isOpen={isPopupOpen} onClick={(e) => e.stopPropagation()}>
              <PopupCloseButton onClick={closePopup}>
                <CloseIcon size={20} />
              </PopupCloseButton>
              <PopupImage>
                <a href="https://www.facebook.com/profile.php?id=61559057724990" target="_blank" rel="noopener noreferrer">
                  <img src="/images/popup.jpg" alt="Popup" />
                </a>
              </PopupImage>
            </PopupContent>
          </PopupOverlay>

          <BlogSection>
            <BlogContainer>
              <BlogHeaderContainer>
                <BlogHeader>
                  <h2>{t('blog.title')}</h2>
                  <p>
                    {t('blog.subtitle')} <a href="https://www.facebook.com/profile.php?id=61559057724990" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none' }}>{t('blog.facebookPage')}</a>
                  </p>
                </BlogHeader>
              </BlogHeaderContainer>
              
              {loading ? (
                <LoadingContainer>
                  {t('blog.loading')}
                </LoadingContainer>
              ) : (
                <>
                  <BlogGrid>
                    {blogPosts.map((post) => (
                      <BlogCard key={post.id}>
                        <BlogImage>
                          {post.image.startsWith('http') || post.image.startsWith('/') ? (
                            <img 
                              src={post.image} 
                              alt={post.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            post.image
                          )}
                        </BlogImage>
                        <BlogContent>
                          <BlogMeta>
                            <div className="meta-item">
                              <FacebookIcon size={14} />
                              {post.author}
                            </div>
                            <div className="meta-item">
                              <ClockIcon size={14} />
                              {post.date}
                            </div>
                          </BlogMeta>
                          <BlogTitle>{post.title}</BlogTitle>
                          <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                          <BlogActions>
                            <BlogAction>
                              <HeartIcon size={14} />
                              {post.likes}
                            </BlogAction>
                            <BlogAction>
                              <MessageIcon size={14} />
                              {post.comments}
                            </BlogAction>
                          </BlogActions>
                        </BlogContent>
                      </BlogCard>
                    ))}
                  </BlogGrid>
                  
                  <div style={{ textAlign: 'center' }}>
                    <ViewAllButton onClick={() => window.open('https://www.facebook.com/profile.php?id=61559057724990', '_blank')}>
                      {t('blog.viewAllPosts')}
                      <FacebookIcon size={18} />
                    </ViewAllButton>
                  </div>
                </>
              )}
            </BlogContainer>
          </BlogSection>

          <CustomerReviewSection>
            <ReviewContainer>
              <ReviewHeader>
                <h2>{t('reviews.title')}</h2>
                <p>{t('reviews.subtitle')}</p>
              </ReviewHeader>
              <ReviewGrid>
                {reviewData.map((review) => (
                  <ReviewCard key={review.id}>
                    <ReviewContent>
                      <p>{review.content}</p>
                    </ReviewContent>
                    <ReviewRating>
                      {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} size={20} />
                      ))}
                    </ReviewRating>
                    <ReviewAuthor>
                      <AuthorAvatar>{review.avatar}</AuthorAvatar>
                      <AuthorInfo>
                        <h4>{review.author}</h4>
                        <p>{review.position}</p>
                      </AuthorInfo>
                    </ReviewAuthor>
                  </ReviewCard>
                ))}
              </ReviewGrid>
              <ReviewStats>
                <ReviewStatItem>
                  <div className="stat-number">50+</div>
                  <div className="stat-label">{t('reviews.stats.projectsCompleted')}</div>
                </ReviewStatItem>
                <ReviewStatItem>
                  <div className="stat-number">98%</div>
                  <div className="stat-label">{t('reviews.stats.clientSatisfaction')}</div>
                </ReviewStatItem>
                <ReviewStatItem>
                  <div className="stat-number">100+</div>
                  <div className="stat-label">{t('reviews.stats.happyClients')}</div>
                </ReviewStatItem>
              </ReviewStats>
            </ReviewContainer>
          </CustomerReviewSection>

          <Footer />
        </ContentWrapper>
      </HomeContainer>
    </>
  );
};

export default Home; 