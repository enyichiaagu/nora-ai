import React from 'react';
import { motion } from 'framer-motion';
import SessionTable from '@/components/dashboard/SessionTable';
import { Button } from '@/components/ui/button';
import { Plus, History } from 'lucide-react';
import { Link } from 'react-router';

const SessionHistory: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-marlin font-bold text-gray-900 mb-2 flex items-center gap-3">
              <History className="w-8 h-8 text-blue-500" />
              Session History
            </h1>
            <p className="text-gray-600">
              View and manage all your learning sessions with Nora AI
            </p>
          </div>
          
          <Link to="/dashboard/session/create">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Session
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <History className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-blue-600">32.5</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="h-6 w-6 text-blue-600">⏱️</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="h-6 w-6 text-purple-600">📅</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Session Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SessionTable />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SessionHistory;