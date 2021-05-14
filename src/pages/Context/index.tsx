import { createContext, useContext, useState } from "react"

interface GlobalContent{
  email: string,
  password: string,
  setEmail:(c: string) => void,
  setPassword:(c: string) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
  email: 'Hello World',
  password: '123456',
  setEmail: () => {},
  setPassword: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)