"use client"
import React, { createContext, useContext, useState } from 'react'

// Tipe data bahasa
type Language = 'id' | 'en'

// Buat Context
const LanguageContext = createContext({
  lang: 'id' as Language,
  setLang: (lang: Language) => {},
})

// Provider untuk membungkus aplikasi
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('id')
  
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook agar komponen lain bisa memanggil status bahasa
export const useLanguage = () => useContext(LanguageContext)