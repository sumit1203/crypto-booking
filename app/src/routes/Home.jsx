import React from 'react';
import HotelSection from '../components/HotelSection';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import LearnMoreSection from '../components/LearnMoreSection';
import CollaborationSection from '../components/CollaborationSection';
import BookingSection from '../components/BookingSection';
import MyBookingSection from '../components/MyBookingSection';
import LifSection from '../components/LifSection';
import Navbar from '../components/Navbar';
import RoomsSection from '../components/RoomsSection';

const Home = () => (
  <div>
    <Navbar />
    <HeroSection />
    <CollaborationSection />
    <HotelSection />
    <RoomsSection />
    <BookingSection />
    <MyBookingSection />
    <LifSection />
    <LearnMoreSection />
    <Footer />
  </div>
);

export default Home;
