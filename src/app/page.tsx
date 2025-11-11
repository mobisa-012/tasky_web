'use client';

import { motion, Variants } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiGithub, FiMessageSquare, FiUser, FiInstagram } from "react-icons/fi";
import { Zap, LayoutDashboard, Lock, Smartphone, Lightbulb, Settings } from 'lucide-react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/lib/firebaseconfig';

const features = [
  {
    icon: <Zap className="w-5 h-5 text-indigo-400" />,
    title: 'Blazing Fast Input',
    description: 'Add tasks, set deadlines, and organize with intuitive keyboard shortcuts.',
  },
  {
    icon: <LayoutDashboard className="w-5 h-5 text-indigo-400" />,
    title: 'Pure Minimalist Design',
    description: 'A distraction-free interface that gets out of your way and lets you work.',
  },
  {
    icon: <Lock className="w-5 h-5 text-indigo-400" />,
    title: 'Built for Privacy',
    description: 'Your tasks and data are always local to your device, no cloud, no tracking.',
  },
  {
    icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
    title: 'Seamless Cross-Platform',
    description: 'Access your tasks on desktop and mobile, perfectly synced.',
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-indigo-400" />,
    title: 'Smart Suggestions',
    description: 'Tasky learns your habits and suggests tasks to keep you productive.',
  },
  {
    icon: <Settings className="w-5 h-5 text-indigo-400" />,
    title: 'Highly Customizable',
    description: 'Tailor themes, fonts, and settings to match your personal workflow.',
  },
];

const screenshots = [
  { src: '/dashboard.jpg', alt: 'Tasky Dashboard' },
  { src: '/task.jpg', alt: 'Create a new task' },
  { src: '/habit.jpg', alt: 'Create a new habit' },
  { src: '/journal.jpg', alt: 'Journal your day away' },
  { src: '/recordings.jpg', alt: 'Get all your thoughts in one place' },
  { src: '/record.jpg', alt: 'Record your thoughts' },
  { src: '/settings.jpg', alt: 'Settings and preferences' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)' },
  tap: { scale: 0.98 },
};

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<{
  success: boolean;
  message: string;
} | null>(null);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { id, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [id]: value
  }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: 'Please fill in all required fields'
      });
      return;
    }
  setIsSubmitting(true);
  
  try {
    console.log('Submitting data:', formData);
    const docRef = await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        createdAt: new Date().toISOString(),
        emailSent: false
      });
    console.log('Document written with ID: ', docRef.id);

    setSubmitStatus({
      success: true,
      message: 'Message sent successfully! We will get in touch soon 😊'
    });
    // resettig the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    setSubmitStatus({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    const container = scrollContainerRef.current;
    let scrollInterval: NodeJS.Timeout;
    let isHovering = false;

    const startAutoScroll = () => {
      if (container && !isHovering) {
        scrollInterval = setInterval(() => {
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: container.clientWidth / 2, behavior: 'smooth' });
          }
        }, 4000);
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
      clearInterval(scrollInterval);
    };

    const handleMouseLeave = () => {
      isHovering = false;
      startAutoScroll();
    };

    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      startAutoScroll();

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        clearInterval(scrollInterval);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <Head>
        <title>Tasky | Focus on What Matters</title>
        <meta name="description" content="Tasky: The minimalist productivity app designed for deep focus and effortless task management." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center border-b border-gray-800 sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm"
      >
        <Link href="/" passHref legacyBehavior>
          <a className="flex items-center space-x-2 sm:space-x-3 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="w-8 h-8 sm:w-10 sm:h-10 relative"
            >
              <Image
                src="/logo.png"
                alt="Tasky Logo"
                width={40}
                height={40}
                priority
                className="object-contain"
              />
            </motion.div>
            <motion.span 
              whileHover={{ color: '#818cf8' }}
              className="text-xl sm:text-2xl font-bold text-indigo-400 transition-colors duration-200"
            >
              Tasky
            </motion.span>
          </a>
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-gray-400 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className="hidden sm:flex items-center space-x-4 sm:space-x-6">
          <Link href="#features" passHref legacyBehavior>
            <motion.a 
              whileHover={{ color: '#818cf8' }}
              className="text-gray-400 transition-colors text-sm sm:text-base"
            >
              Features
            </motion.a>
          </Link>
          <Link href="#download" passHref legacyBehavior>
            <motion.a 
              whileHover={{ color: '#818cf8' }}
              className="text-gray-400 transition-colors text-sm sm:text-base"
            >
              Download
            </motion.a>
          </Link>
          <motion.a
            href="#early-access"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-full font-semibold transition-all shadow-lg text-sm sm:text-base"
          >
            Get Early Access
          </motion.a>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden absolute top-16 left-0 right-0 bg-gray-900 border-b border-gray-800 py-4 px-6 flex flex-col space-y-4"
          >
            <Link href="#features" passHref legacyBehavior>
              <motion.a 
                whileHover={{ color: '#818cf8' }}
                className="text-gray-400 transition-colors text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </motion.a>
            </Link>
            <Link href="#download" passHref legacyBehavior>
              <motion.a 
                whileHover={{ color: '#818cf8' }}
                className="text-gray-400 transition-colors text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download
              </motion.a>
            </Link>
            <motion.a
              href="#early-access"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold transition-all shadow-lg text-base text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Early Access
            </motion.a>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <motion.div 
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 top-0 left-0"
          />
          <motion.div 
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 bottom-0 right-0"
          />
        </div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight relative z-10 px-2"
        >
          <motion.span 
            className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          >
            Focus on What Truly Matters
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 relative z-10 px-2"
        >
          Tasky is the <strong>minimalist productivity app</strong> designed to cut out the noise, so you can achieve your goals with clarity and ease.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 relative z-10 px-2"
        >
          <motion.a
            href="#download"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-full font-bold text-sm sm:text-base transition-all shadow-xl hover:shadow-2xl"
          >
            Download for Free
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ 
              backgroundColor: 'rgba(31, 41, 55, 1)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-700 text-gray-300 rounded-full font-bold text-sm sm:text-base transition-all"
          >
            Learn More
          </motion.a>
        </motion.div>

        {/* Screenshot Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-12 sm:mt-16 md:mt-20 relative z-10"
        >
          <div className="text-center mb-6 sm:mb-8">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 mb-2 sm:mb-3"
            >
              See Tasky in Action
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm"
            >
              Explore Tasky's intuitive interface across different views
            </motion.p>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 sm:pb-8 px-2 snap-x snap-mandatory scrollbar-hide"
          >
            <div className="flex space-x-4 sm:space-x-6">
              {screenshots.map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-shrink-0 snap-center w-[260px] xs:w-[280px] sm:w-[320px]"
                >
                  <div className="relative mx-auto bg-gray-800 rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 shadow-xl sm:shadow-2xl border border-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-lg opacity-30 rounded-[2rem] sm:rounded-[2.5rem] pointer-events-none" />
                    
                    {/* Mobile frame */}
                    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-gray-900">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        quality={90}
                        priority={index < 2}
                        className="object-cover"
                        sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 320px"
                      />
                    </div>
                    
                    {/* Mobile notch */}
                    <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-1/3 h-1 sm:h-1.5 bg-gray-900 rounded-b-md z-10"></div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-3 sm:mt-4 text-gray-400 text-xs sm:text-sm"
                  >
                    {screenshot.alt}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="hidden sm:flex justify-center items-center mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm"
          >
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mr-2 text-base"
            >
              ←
            </motion.span>
            <span>Swipe to explore</span>
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
              className="ml-2 text-base"
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-12 px-2"
        >
          Designed for Your Focus
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              className="bg-gray-800 p-5 sm:p-6 rounded-xl border border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/50 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-800 py-12 sm:py-16 md:py-20 mt-8 sm:mt-12 md:mt-16 border-t border-b border-gray-700"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 px-2"
          >
            What Users Are Saying
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "Tasky has completely transformed how I manage my day. It's so clean and genuinely helps me focus.",
                author: "Sarah J.",
                role: "Freelance Designer",
              },
              {
                quote: "Finally, a task app that isn't bloated. Tasky is intuitive, fast, and exactly what I needed for productivity.",
                author: "Mark T.",
                role: "Software Engineer",
              },
              {
                quote: "The minimalist design is a game-changer. I feel less overwhelmed and more in control. Highly recommend!",
                author: "Emily R.",
                role: "Student & Entrepreneur",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="bg-gray-900 p-5 sm:p-6 rounded-xl shadow-lg border border-gray-700 text-left"
              >
                <p className="text-gray-400 text-sm sm:text-base italic mb-3 sm:mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-100 text-xs sm:text-sm">{testimonial.author}</p>
                <p className="text-indigo-400 text-2xs sm:text-xs">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        id="download"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-center bg-gradient-to-b from-gray-900 to-gray-900/80"
      >
        <div className="max-w-5xl mx-auto">
          {/* Animated background elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-600 filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-1/3 right-1/3 w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-purple-600 filter blur-3xl opacity-20"></div>
          </motion.div>

          <motion.div 
            className="relative"
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight px-2"
            >
              <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text">
                Ready to unlock your <br className="hidden xs:inline" /> peak productivity?
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm xs:text-base sm:text-lg text-gray-400 mb-5 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-2"
            >
              Download Tasky today and experience task management reimagined for the modern, focused mind.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 px-2"
            >
              <motion.a
                href="#"
                variants={buttonVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16L7 13h4V8h2v5h4l-5 5z"/>
                </svg>
                Get Started - It's Free
              </motion.a>

              <motion.a
                href="#features"
                whileHover={{ 
                  backgroundColor: 'rgba(31, 41, 55, 1)',
                  y: -2
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="inline-flex items-center justify-center px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 border-2 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-gray-200 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300"
              >
                See How It Works
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-5 sm:mt-7 md:mt-8 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm"
            >
              {['iOS (Coming soon)', 'Android', "Web (Coming Soon)"].map((platform, index) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center text-gray-400"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {platform}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact us */}
      <motion.section
        id="contact"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-800 py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center relative overflow-hidden"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-indigo-900/10 pointer-events-none" />

        {/* Floating particles/animated elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, 30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute rounded-full bg-gradient-to-r ${i % 3 === 0 ? 'from-indigo-500/20 to-purple-500/20' : i % 3 === 1 ? 'from-teal-500/20 to-blue-500/20' : 'from-purple-500/20 to-pink-500/20'} filter blur-md`}
            style={{
              width: `${10 + i * 5}px`,
              height: `${10 + i * 5}px`,
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25" />
              <span className="relative px-4 py-2 text-sm font-medium text-indigo-300 bg-gray-900 rounded-lg">
                Get In Touch
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8 px-2"
          >
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text">
              Let's Build Something Amazing
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 mb-12 sm:mb-16 max-w-2xl mx-auto px-2 text-base sm:text-lg"
          >
            Whether you have questions about Tasky or want to discuss potential collaborations, our team is ready to help.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-100 text-left">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 text-left">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ 
                    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)',
                    backgroundColor: 'rgba(31, 41, 55, 0.8)'
                  }}
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 text-left">
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ 
                    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)',
                    backgroundColor: 'rgba(31, 41, 55, 0.8)'
                  }}
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Phone Field (optional) */}
              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 text-left">
                  Phone Number
                </label>
                <motion.input
                  whileFocus={{ 
                    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)',
                    backgroundColor: 'rgba(31, 41, 55, 0.8)'
                  }}
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 text-left">
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ 
                    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)',
                    backgroundColor: 'rgba(31, 41, 55, 0.8)'
                  }}
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-all resize-none"
                  placeholder="Tell us about your project or question..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={isSubmitting}
                className={`w-full px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl group ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FiMessageSquare className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                </span>
              </motion.button>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm ${
                    submitStatus.success ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}
            </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 sm:space-y-8"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-100 text-left">
                  Contact Information
                </h3>
                
                <div className="space-y-5">
                  <motion.a
                    href="mailto:hello.tasky.app@gmail.com"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0 bg-indigo-500/10 p-2.5 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                      <FiMail className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-gray-400">Email us at</h4>
                      <p className="text-lg text-indigo-300 font-medium">hello.tasky.app@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+15551234567"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0 bg-indigo-500/10 p-2.5 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                      <FiPhone className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-gray-400">Call us at</h4>
                      <p className="text-lg text-indigo-300 font-medium">+254112187873</p>
                      <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am-5pm EAT</p>
                    </div>
                  </motion.a>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-indigo-500/10 p-2.5 rounded-lg">
                      <FiMapPin className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-gray-400">Find us at</h4>
                      <p className="text-lg text-indigo-300 font-medium">Nairobi, Kenya</p>
                      {/* <p className="text-lg text-indigo-300 font-medium">San Francisco, CA 94107</p> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-100 text-left">
                  Connect With Us
                </h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { 
                      name: 'X', 
                      icon: <FiTwitter className="w-6 h-6 text-blue-400" />,
                      color: 'hover:bg-blue-400/10',
                      url: 'https://x.com/kwamboka_012?t=4D3jgTfG4Fhf_yHKurgQZw&s=09'
                    },
                    { 
                      name: 'LinkedIn', 
                      icon: <FiLinkedin className="w-6 h-6 text-blue-500" />,
                      color: 'hover:bg-blue-500/10',
                      url: 'https://www.linkedin.com/in/mobisa-kwamboka-a56691223/'
                    },
                    { 
                      name: 'Instagram', 
                      icon: <FiInstagram className="w-6 h-6 text-pink-300" />,
                      color: 'hover:bg-blue-500/10',
                      url: 'https://www.instagram.com/kwambokamobisa/profilecard/?igsh=cGtqcWhmemd5d3Fi'
                    },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center p-3 rounded-lg ${social.color} transition-colors`}
                      aria-label={`${social.name} profile`}
                    >
                      {social.icon}
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="py-6 sm:py-8 md:py-10 text-center border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.p 
            className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            © {new Date().getFullYear()} Tasky. All rights reserved.
          </motion.p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link href="/terms" passHref legacyBehavior>
              <motion.a
                whileHover={{ 
                  color: '#818cf8',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 transition-colors px-1 sm:px-2 py-1 rounded"
              >
                Terms of Service
              </motion.a>
            </Link>
            
            <span className="hidden sm:inline text-gray-600">•</span>
            
            <Link href="/privacy" passHref legacyBehavior>
              <motion.a
                whileHover={{ 
                  color: '#818cf8',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 transition-colors px-1 sm:px-2 py-1 rounded"
              >
                Privacy Policy
              </motion.a>
            </Link>
            
            <span className="hidden sm:inline text-gray-600">•</span>
            
            <Link href="#contact" passHref legacyBehavior>
              <motion.a
                whileHover={{ 
                  color: '#818cf8',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 transition-colors px-1 sm:px-2 py-1 rounded"
              >
                Contact Us
              </motion.a>
            </Link>
          </div>

          {/* Social links */}
          <motion.div 
            className="flex justify-center space-x-3 sm:space-x-4 mt-3 sm:mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
                href="https://x.com/kwamboka_012?t=4D3jgTfG4Fhf_yHKurgQZw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="Twitter"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <FiTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              
              <motion.a
                href="https://github.com/mobisa-012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="GitHub"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <FiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/mobisa-kwamboka-a56691223/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="LinkedIn"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <FiLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>

              <motion.a
                href="https://mobisaportfolio.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                aria-label="LinkedIn"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <FiUser className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}