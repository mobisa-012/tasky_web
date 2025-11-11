'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Animated Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-4 flex justify-between items-center border-b border-gray-800"
      >
        <Link href="/" passHref>
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
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-10"
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.p>

        {[
          {
            title: "1. Information We Collect",
            content: (
              <>
                <p className="mb-4">To provide our productivity services, we collect:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Account Data:</strong> Email, name (if provided)</li>
                  <li><strong>Task Data:</strong> Your tasks, deadlines, and project information</li>
                  <li><strong>Usage Data:</strong> How you interact with the app (features used, time spent)</li>
                  <li><strong>Device Data:</strong> Device type, OS version for compatibility</li>
                  <li><strong>Performance Data:</strong> App responsiveness and crash reports</li>
                </ul>
              </>
            )
          },
          {
            title: "2. How We Use Your Information",
            content: (
              <>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain Tasky services</li>
                  <li>Personalize your experience (task suggestions, themes)</li>
                  <li>Improve app performance and features</li>
                  <li>Develop new productivity tools</li>
                  <li>Communicate important service updates</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </>
            )
          },
          {
            title: "3. Data Sharing & Disclosure",
            content: (
              <>
                <p className="mb-4">We do not sell your personal data. Limited sharing occurs with:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Service Providers:</strong> Hosting, analytics, and customer support partners</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In case of merger or acquisition</li>
                </ul>
                <p>All third parties must comply with equivalent privacy standards.</p>
              </>
            )
          },
          {
            title: "4. Data Security",
            content: (
              <>
                <p>We implement:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>End-to-end encryption for task data</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                </ul>
                <p>While we implement robust measures, no electronic transmission is 100% secure.</p>
              </>
            )
          },
          {
            title: "5. Your Data Rights",
            content: (
              <>
                <p>You can:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Access, update, or delete your information</li>
                  <li>Export your task data anytime</li>
                  <li>Opt-out of non-essential data collection</li>
                  <li>Request information about data processing</li>
                </ul>
                <p>Contact privacy@taskyapp.com to exercise these rights.</p>
              </>
            )
          },
          {
            title: "6. Data Retention",
            content: "We retain your data only as long as necessary to provide services or as required by law. Deleted tasks are purged from our systems within 30 days."
          },
          {
            title: "7. Children's Privacy",
            content: "Tasky is not intended for users under 13. We do not knowingly collect data from children."
          },
          {
            title: "8. International Transfers",
            content: "Data may be processed outside your country but always protected under GDPR-style standards regardless of location."
          },
          {
            title: "9. Changes to This Policy",
            content: "We'll notify you of significant changes via email or in-app notice. Continued use constitutes acceptance."
          },
          {
            title: "10. Contact Us",
            content: "For privacy concerns: privacy@taskyapp.com or mail to: Tasky Privacy, 123 Productivity Lane, San Francisco, CA 94107"
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
        <Link href="/" className="text-indigo-400 hover:underline">← Back to Home</Link>
      </motion.footer>
    </div>
  );
}