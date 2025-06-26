import React from 'react';
import { motion } from 'framer-motion';
import SessionTable from '@/components/dashboard/SessionTable';
import { Button } from '@/components/ui/button';
import { Plus, History } from 'lucide-react';
import { Link } from 'react-router';

const SessionHistory: React.FC = () => {
  return (
    <motion.div 
      className="max-w-7xl mx-auto p-6 pt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div>
          <h1 className="text-3xl font-marlin font-bold text-gray-900 mb-2 flex items-center gap-3">
            <History className="w-8 h-8 text-blue-500" />
            Session History
          </h1>
          <p className="text-gray-600">
            View and manage all your learning sessions with Nora AI
          </p>
        </div>
        
     
      </motion.div>

      {/* Session Table */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SessionTable />
      </motion.div>
    </motion.div>
  );
};

export default SessionHistory;