// WebSocket utilities for real-time features
import { io, Socket } from 'socket.io-client'
import { createContext, useContext, useEffect, useState } from 'react'

export interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.WS_URL || 'ws://localhost:3001', {
      transports: ['websocket'],
      upgrade: true,
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
      console.log('Socket connected')
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Socket disconnected')
    })

    newSocket.on('error', (error) => {
      console.error('Socket error:', error)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit('join-room', roomId)
    }
  }

  const leaveRoom = (roomId: string) => {
    if (socket) {
      socket.emit('leave-room', roomId)
    }
  }

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      joinRoom,
      leaveRoom,
    }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within SocketProvider')
  }
  return context
}

// Real-time collaboration hooks
export const useCollaboration = (documentId: string) => {
  const { socket, isConnected } = useSocket()
  const [collaborators, setCollaborators] = useState<string[]>([])

  useEffect(() => {
    if (socket && isConnected) {
      socket.emit('join-document', documentId)

      socket.on('user-joined', (userId: string) => {
        setCollaborators(prev => [...prev, userId])
      })

      socket.on('user-left', (userId: string) => {
        setCollaborators(prev => prev.filter(id => id !== userId))
      })

      socket.on('document-update', (data: any) => {
        // Handle real-time document updates
        console.log('Document update received:', data)
      })

      return () => {
        socket.emit('leave-document', documentId)
        socket.off('user-joined')
        socket.off('user-left')
        socket.off('document-update')
      }
    }
  }, [socket, isConnected, documentId])

  const sendUpdate = (data: any) => {
    if (socket && isConnected) {
      socket.emit('document-update', { documentId, data })
    }
  }

  return { collaborators, sendUpdate }
}

// Notification system
export const useNotifications = () => {
  const { socket, isConnected } = useSocket()
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    if (socket && isConnected) {
      socket.on('notification', (notification: any) => {
        setNotifications(prev => [...prev, notification])
      })

      return () => {
        socket.off('notification')
      }
    }
  }, [socket, isConnected])

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
  }

  return { notifications, markAsRead }
}