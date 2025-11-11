'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Animated Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-4 flex justify-between items-center border-b border-gray-800"
      >
        <Link href="/" passHref legacyBehavior>
          <a className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="w-10 h-10 relative"
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
            <span className="text-2xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200">
              Tasky
            </span>
          </a>
        </Link>
      </motion.nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-20"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10 text-indigo-400"
        >
          Terms & Conditions
        </motion.h1>
        
        {[
          {
            title: "1. Acceptance of Terms",
            content: "By accessing or using Tasky, you agree to be bound by these Terms. If you disagree with any part, please discontinue use immediately."
          },
          {
            title: "2. Data Usage & Personalization",
            content: (
              <>
                <p className="mb-4">To provide and improve our services, Tasky collects and processes certain user data including:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Usage patterns and interaction data</li>
                  <li>Task completion history and preferences</li>
                  <li>Device information for optimization</li>
                </ul>
                <p>This data enables personalized features like intelligent task suggestions, productivity insights, and interface customization. You may opt-out of non-essential data collection in Settings.</p>
              </>
            )
          },
          {
            title: "3. Privacy & Data Protection",
            content: "We implement industry-standard security measures to protect your data. Personal information is never sold to third parties. Anonymous aggregated data may be used for analytical purposes."
          },
          {
            title: "4. User Responsibilities",
            content: "You are responsible for maintaining account confidentiality and all activities under your account. Notify us immediately of any unauthorized use."
          },
          {
            title: "5. Intellectual Property",
            content: "All app content and features are Tasky's property. You may not reverse engineer, modify, or create derivative works without explicit permission."
          },
          {
            title: "6. Service Modifications",
            content: "Tasky reserves the right to modify or discontinue services temporarily or permanently with notice. We may impose limits on certain features."
          },
          {
            title: "7. Limitation of Liability",
            content: "Tasky shall not be liable for any indirect, incidental, or consequential damages arising from service use. Our total liability is limited to amounts paid by you, if any."
          },
          {
            title: "8. Governing Law",
            content: "These Terms shall be governed by the laws of [Your Jurisdiction] without regard to conflict of law principles."
          },
          {
            title: "9. Changes to Terms",
            content: "We may revise these Terms at any time. Continued use after changes constitutes acceptance. Material changes will be notified via email or in-app notice."
          },
          {
            title: "10. Contact Information",
            content: "For questions about these Terms, contact us at legal@taskyapp.com."
          }
        ].map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">{section.title}</h2>
            <div className="text-gray-400">
              {typeof section.content === 'string' ? (
                <p>{section.content}</p>
              ) : (
                section.content
              )}
            </div>
          </motion.section>
        ))}
      </motion.main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="py-10 text-center text-gray-500 border-t border-gray-800"
      >
        <p className="mb-2">Effective Date: {new Date().toLocaleDateString()}</p>
        <Link href="/" className="text-indigo-400 hover:underline">← Back to Home</Link>
      </motion.footer>
    </div>
  );
}