import { ThemeProvider } from "./components/ThemeProvider" // Pakai ./ karena sejajar
import { LanguageProvider } from "./src/context/LanguageContext" // Jika folder context sudah dibuat
import Navbar from "./components/navbar"
import "./globals.css"
import Formbutton from "./components/Formbutton"
import DevBadge from "./components/DevBadge"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <Formbutton />
            <DevBadge />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}