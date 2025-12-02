'use client';

import React from 'react';
import { IssueTracker } from '@/components/dashboard/task/IssueTracker';

export default function DashboardPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <IssueTracker />
    </div>
  );
}
