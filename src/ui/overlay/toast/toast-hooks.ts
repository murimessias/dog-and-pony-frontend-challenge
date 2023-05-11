import { create } from 'zustand'

type ToastStoreActions = {
  actions: {
    reset: (open: boolean) => void
    toggle: (open: boolean) => (value: string) => void
  }
}

type ToastStoreState = {
  open: boolean
  message?: string
}

const useToastStore = create<ToastStoreActions & ToastStoreState>((set) => ({
  message: undefined,
  open: false,
  actions: {
    reset: (open) => set(() => ({ open, message: undefined })),
    toggle: (open) => (message) => set(() => ({ open, message })),
  },
}))

export const useToast = () => {
  return useToastStore((state) => ({
    open: state.open,
    message: state.message,
  }))
}

export const useToastActions = () => {
  return useToastStore((state) => state.actions)
}
