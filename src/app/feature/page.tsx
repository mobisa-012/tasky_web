'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebaseconfig';
import Image from 'next/image';
import Link from 'next/link';

export default function RequestFeature() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    feature: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.feature) {
      setStatus({ success: false, message: 'Please fill all fields.' });
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...form,
        createdAt: new Date().toISOString()
      });

      setStatus({ success: true, message: 'Feature request sent! Thank you!' });
      setForm({ name: '', email: '', feature: '' });
    } catch (err) {
      setStatus({ success: false, message: 'Something went wrong. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      {/* NAVBAR (copied from privacy policy) */}
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

      {/* MAIN CONTENT */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-6 py-20"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10 text-indigo-400"
        >
          Request a Feature
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mb-10"
        >
          Have a feature idea that would make Tasky even better? Tell us!
        </motion.p>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-2 text-gray-300">Your Name</label>
              <input
                id="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-gray-300">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Feature */}
            <div>
              <label className="block mb-2 text-gray-300">Feature Request</label>
              <textarea
                id="feature"
                value={form.feature}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe the feature you'd love to see in Tasky..."
              />
            </div>

            {/* Button */}
            <motion.button
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feature Request'}
            </motion.button>
          </form>

          {status && (
            <p
              className={`mt-4 text-sm ${
                status.success ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {status.message}
            </p>
          )}
        </motion.div>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="py-10 text-center text-gray-500 border-t border-gray-800"
      >
        <Link href="/" className="text-indigo-400 hover:underline">
          ← Back to Home
        </Link>
      </motion.footer>
    </div>
  );
}
