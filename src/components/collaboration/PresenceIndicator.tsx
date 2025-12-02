'use client';

import React, { useEffect, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/lib/auth';

interface PresenceState {
  [key: string]: {
    user_id: string;
    online_at: string;
    payload: {
      name: string;
      status: string;
    };
  }[];
}

export const PresenceIndicator = () => {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const supabase = createClientComponentClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState<any>();
        const users = Object.values(newState).map(presence => presence[0].payload);
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            name: user.full_name || user.email.split('@')[0],
            status: 'online',
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user, supabase]);

  // If no users (e.g. not logged in or error), show nothing or fallback
  if (onlineUsers.length === 0) return null;

  return (
    <div className="flex items-center -space-x-2">
      {onlineUsers.slice(0, 5).map((u, i) => (
        <HoverCard key={i}>
          <HoverCardTrigger asChild>
            <div className="relative cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0898BB] to-[#06708a] border-2 border-[#0A1628] flex items-center justify-center text-[10px] font-bold text-white shadow-sm group-hover:z-10 transition-all">
                {u.name?.charAt(0).toUpperCase()}
              </div>
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0A1628] ${
                u.status === 'online' ? 'bg-green-500' : 'bg-orange-500'
              }`} />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto p-2 bg-[#0A1628] border border-white/10 text-white text-xs rounded-lg">
            <div className="font-medium">{u.name}</div>
            <div className="text-white/50 capitalize">{u.status}</div>
          </HoverCardContent>
        </HoverCard>
      ))}
      {onlineUsers.length > 5 && (
        <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-[#0A1628] flex items-center justify-center text-[10px] font-bold text-white/40 hover:bg-white/10 hover:text-white cursor-pointer transition-colors">
          +{onlineUsers.length - 5}
        </div>
      )}
    </div>
  );
};
