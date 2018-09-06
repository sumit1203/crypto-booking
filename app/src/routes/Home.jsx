import React from 'react';
import HotelSection from '../sections/HotelSection';
import HeroSection from '../sections/HeroSection';
import Footer from '../sections/Footer';
import LearnMoreSection from '../sections/LearnMoreSection';
import CollaborationSection from '../sections/CollaborationSection';
import BookingSection from '../sections/Booking';
import LifSection from '../sections/LifSection';
import Navbar from '../sections/Navbar';

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
