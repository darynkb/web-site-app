"use client"

import { useState, useEffect } from "react"
import TabsComponent from "@/app/components/Tabs"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="grid grid-rows-[auto_1fr_20px] items-start justify-items-start min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="w-full flex justify-between items-center mb-4">
        <nav className="flex-grow">
          <TabsComponent />
        </nav>
        <Button variant="outline" size="icon" onClick={toggleDarkMode} className="ml-4">
          {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      </header>
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">Daryn Kenzhebek</h1>
        <h1 className="text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          Welcome 👋 to my digital portfolio! I&apos;m a robotics engineer and
          researcher specializing in tactile sensing, shape recognition, and
          advanced mechanical design. Explore my journey, projects, and
          publications here.
        </h1>
      </main>
    </div>
  );
}