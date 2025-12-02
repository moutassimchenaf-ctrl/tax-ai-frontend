'use client';

import React from 'react';
import { Bell, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'mention',
    user: 'Sarah Designer',
    message: 'mentioned you in',
    target: 'TIT-102',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'status',
    user: 'Alex Dev',
    message: 'moved to Done',
    target: 'TIT-101',
    time: '1h ago',
    read: true,
  },
  {
    id: '3',
    type: 'urgent',
    user: 'System',
    message: 'High priority issue assigned',
    target: 'TIT-105',
    time: '3h ago',
    read: true,
  },
];

export const NotificationsPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0A1628]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-[#0A1628] border border-white/10 rounded-xl shadow-2xl mr-4">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="font-semibold text-white">Notifications</h3>
          <button className="text-xs text-[#0898BB] hover:text-[#06708a]">Mark all read</button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${!notif.read ? 'bg-white/[0.02]' : ''}`}
            >
              <div className="flex gap-3">
                <div className="mt-1">
                  {notif.type === 'mention' && <MessageSquare className="w-4 h-4 text-blue-400" />}
                  {notif.type === 'status' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  {notif.type === 'urgent' && <AlertCircle className="w-4 h-4 text-red-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90">
                    <span className="font-medium">{notif.user}</span> {notif.message} <span className="text-[#0898BB]">{notif.target}</span>
                  </p>
                  <span className="text-xs text-white/40 mt-1 block">{notif.time}</span>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-[#0898BB] mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-white/10 text-center">
          <button className="text-xs text-white/40 hover:text-white transition-colors">View all notifications</button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
