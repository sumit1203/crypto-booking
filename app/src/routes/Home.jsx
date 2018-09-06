import React from 'react';
import HotelSection from '../sections/HotelSection';
import HeroSection from '../sections/HeroSection';
import Footer from '../sections/Footer';
import LearnMoreSection from '../sections/LearnMoreSection';
import CollaborationSection from '../sections/CollaborationSection';
import BookingSection from '../sections/Booking';
import MyBookingSection from '../sections/MyBookingSection';
import LifSection from '../sections/LifSection';
import Navbar from '../sections/Navbar';

const Home = () => (
  <div>
    <Navbar />
    <HeroSection />
    <CollaborationSection />
    <HotelSection />
    <BookingSection />
    <MyBookingSection />
    <LifSection />
    <LearnMoreSection />
    <Footer />
  </div>
);

export default Home;
