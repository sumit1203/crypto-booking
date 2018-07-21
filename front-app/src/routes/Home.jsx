import React from 'react';
import HotelSection from '../components/HotelSection';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import LearnMoreSection from '../components/LearnMoreSection';
import CollaborationSection from '../components/CollaborationSection';
import BookingSection from '../components/BookingSection';
import LifSection from '../components/LifSection';
import Navbar from '../components/Navbar';

const Home = () => (
  <div>
    <Navbar />
    <HeroSection />
    <CollaborationSection />
    <HotelSection />
    <BookingSection />
    <LifSection />
    <LearnMoreSection />
    <Footer />
  </div>
);

export default Home;
