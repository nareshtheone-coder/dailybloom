import { createContext, useContext, type ReactNode } from 'react'
import { useAdManagerState, type AdManagerState } from './useAdManager'

const AdManagerContext = createContext<AdManagerState | null>(null)

export interface AdManagerProviderProps {
  children: ReactNode
}

export function AdManagerProvider({ children }: AdManagerProviderProps) {
  const value = useAdManagerState()

  return <AdManagerContext.Provider value={value}>{children}</AdManagerContext.Provider>
}

export function useAdManager(): AdManagerState {
  const context = useContext(AdManagerContext)
  if (!context) {
    throw new Error('useAdManager must be used within an AdManagerProvider')
  }
  return context
}
