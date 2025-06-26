import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SessionStatusBadge from './SessionStatusBadge';

interface Session {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  tutor: string;
  status: 'completed' | 'upcoming' | 'in-progress' | 'cancelled';
}

const SessionTable: React.FC = () => {
  const sessions: Session[] = [
    {
      id: '1',
      subject: 'Mathematics',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '45 min',
      tutor: 'Nora AI',
      status: 'upcoming'
    },
    {
      id: '2',
      subject: 'Physics',
      date: '2024-01-14',
      time: '4:30 PM',
      duration: '60 min',
      tutor: 'Nora AI',
      status: 'completed'
    },
    {
      id: '3',
      subject: 'Chemistry',
      date: '2024-01-13',
      time: '10:00 AM',
      duration: '30 min',
      tutor: 'Nora AI',
      status: 'completed'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-marlin font-semibold text-gray-900">Recent Sessions</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{session.subject}</div>
                      <div className="text-sm text-gray-500">with {session.tutor}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    {session.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    {session.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {session.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SessionStatusBadge status={session.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {session.status === 'upcoming' ? (
                    <Button size="sm">Join</Button>
                  ) : (
                    <Button variant="outline" size="sm">View</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionTable;