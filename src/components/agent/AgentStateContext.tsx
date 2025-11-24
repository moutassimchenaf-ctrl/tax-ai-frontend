'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AgentStateContextType {
    isThinking: boolean;
    setIsThinking: (isThinking: boolean) => void;
    isSpeaking: boolean;
    setIsSpeaking: (isSpeaking: boolean) => void;
}

const AgentStateContext = createContext<AgentStateContextType | undefined>(undefined);

export const AgentStateProvider = ({ children }: { children: ReactNode }) => {
    const [isThinking, setIsThinking] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    return (
        <AgentStateContext.Provider value={{ isThinking, setIsThinking, isSpeaking, setIsSpeaking }}>
            {children}
        </AgentStateContext.Provider>
    );
};

export const useAgentState = () => {
    const context = useContext(AgentStateContext);
    if (context === undefined) {
        throw new Error('useAgentState must be used within an AgentStateProvider');
    }
    return context;
};
