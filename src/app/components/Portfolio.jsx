"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, Send } from 'lucide-react'
import { motion } from "framer-motion"
import Image from 'next/image'

function ResponseComponent({ content, isTyping, onDone }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!content?.text) return;

    if (!isTyping) {
      setDisplayedText(content.text)
      return
    }

    let i = 0
    setDisplayedText("")
    const intervalId = setInterval(() => {
      i++
      setDisplayedText(content.text.slice(0, i))
      if (i >= content.text.length) {
        clearInterval(intervalId)
        onDone()
      }
    }, 5)
    return () => clearInterval(intervalId)
  }, [content, isTyping, onDone])

  const renderStyledText = (text) => {
    if (!text) return null;

    const lines = text.split('\n')
    return lines.map((line, index) => {
      if (!line) return <br key={index} />;

      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4">{renderStyledText(line.slice(2))}</li>
      }

      if (line.match(/^\d+\. /)) {
        // Check if line contains a markdown link
        if (line.includes('[') && line.includes(']') && line.includes('(') && line.includes(')')) {
          const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/)
          if (linkMatch) {
            const [fullMatch, text, url] = linkMatch
            const parts = line.split(fullMatch)
            return (
              <li key={index} className="ml-4">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {text.replace(/\*\*/g, '')}
                </a>
                {parts[1]}
              </li>
            )
          }
        }
        return <li key={index} className="ml-4">{line.slice(line.indexOf(' ') + 1)}</li>
      }

      // Handle markdown links in regular text
      if (line.includes('[') && line.includes(']') && line.includes('(') && line.includes(')')) {
        const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/)
        if (linkMatch) {
          const [fullMatch, text, url] = linkMatch
          const parts = line.split(fullMatch)
          return (
            <p key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {text.replace(/\*\*/g, '')}
              </a>
              {parts[1]}
            </p>
          )
        }
      }

      // Handle bold text
      return <p key={index}>
        {line.split('**').map((part, i) =>
          i % 2 === 0 ? part : <strong key={i}>{part}</strong>
        )}
      </p>
    })
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {content?.image && (
            <div className="w-full md:w-1/3">
              <Image
                src={content.image}
                alt="Response illustration"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          )}
          <div className={`${content?.image ? 'w-full md:w-2/3' : 'w-full'}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Formatting is applied while typing, like ChatGPT, not only after */}
              {renderStyledText(displayedText)}
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-black dark:bg-white ml-1 animate-blink"></span>
              )}
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Portfolio({ intro, sections }) {
  const [darkMode, setDarkMode] = useState(true)
  const [inputText, setInputText] = useState("")
  const [currentResponse, setCurrentResponse] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [bgColor, setBgColor] = useState("#ffffff")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      setBgColor("#0a0a0a")
    } else {
      document.documentElement.classList.remove('dark')
      setBgColor("#ffffff")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handlePromptClick = (prompt) => {
    if (!isTyping) {
      setInputText(prompt)
    }
  }

  const handleTypingDone = useCallback(() => setIsTyping(false), [])

  const handleSubmit = () => {
    if (isTyping || !inputText) return

    const query = inputText.trim().toLowerCase()
    const section = sections.find((s) => s.prompt.toLowerCase() === query)
    setIsTyping(true)
    setCurrentResponse(section || { text: "I'm sorry, I don't have information about that topic.", image: null })
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-between p-8 pb-20 font-[family-name:var(--font-geist-sans)] text-black dark:text-white transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-3xl mx-auto">
        <div className="w-full flex justify-between mb-4">
          <div className="w-full items-center flex gap-5" >
            <h1 className="text-4xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">Daryn Kenzhebek</h1>
            <Image
              src="/logo.jpg"
              alt="DoraGPT"
              height={100}
              width={50}
              className="rounded-full object-cover"
            />
          </div>
          <Button variant="outline" size="icon" onClick={toggleDarkMode} className="ml-4">
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>

        <h2 className="text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {intro}
        </h2>
        <div className="w-full space-y-4">
          <div className="flex space-x-2 items-center">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-grow min-h-[60px]"
              disabled={isTyping}
            />
            <Button className="min-h-[60px]" onClick={handleSubmit} disabled={isTyping || !inputText}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <Button
                key={section.prompt}
                variant="outline"
                onClick={() => handlePromptClick(section.prompt)}
                disabled={isTyping}
              >
                {section.prompt}
              </Button>
            ))}
          </div>
        </div>
        {currentResponse && (
          <ResponseComponent content={currentResponse} isTyping={isTyping} onDone={handleTypingDone} />
        )}
      </main>
      <footer className="mt-12 w-full max-w-3xl mx-auto">
        <div className="flex justify-center items-center p-6">
          <div className="flex space-x-4 text-neutral-600 dark:text-neutral-400">
            <a href="https://www.linkedin.com/in/daryn-kenzhebek7182/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              LinkedIn
            </a>
            <span>|</span>
            <a href="mailto:darynkb2002@gmail.com" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              Email
            </a>
            <span>|</span>
            <a href="https://github.com/darynkb" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-800 dark:hover:text-neutral-200">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
