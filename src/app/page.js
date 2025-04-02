"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, Send, Linkedin, Github, Mail, Globe } from 'lucide-react'
import { motion } from "framer-motion"
import Image from 'next/image'

const suggestedPrompts = [
  "Tell me about yourself",
  "What's your educational background?",
  "What's your work experience?",
  "What are your key projects and research?",
  "What are your skills and publications?"
]

const responses = {
  "Tell me about yourself": {
    text: "I am currently pursuing an **MS in Robotics Engineering** at Nazarbayev University, having completed my **BS in Robotics and Mechatronics** at the same institution. My research and professional journey reflect a strong passion for advancing:\n\n- Tactile sensing\n- Robotics\n- Innovative engineering solutions\n\nBeyond my technical expertise, I enjoy:\n\n1. Mentoring students\n2. Designing energy-efficient vehicles\n3. Working on cutting-edge robotics applications",
    image: "/main.jpg"
  },
  "What's your educational background?": {
    text: "**Nazarbayev University**\n\n**MS in Robotics Engineering** (Expected June 2026)\nGPA: 3.6/4.0 | Class rank: 3/23\n   - Focusing on advanced robotics and AI applications\n - Conducting research in tactile sensing and shape recognition\n\n**BS in Robotics and Mechatronics** (June 2024)\nGPA: 2.8/4.0 | Class rank: 10/21\n   - Specialized in robotics control systems and mechatronics design\n\nDuring my academic journey, I've been actively involved in various robotics projects and research initiatives, which have significantly contributed to my practical skills and theoretical knowledge in the field.",
    image: "/education.jpeg"
  },
  "What's your work experience?": {
    text: "**Tactile Laboratory | Research Assistant** (May 2023 – Present)\n\n- Developed a Reverse Vending Machine using computer vision\n- 3D-printed multi-material honeycomb end-effectors and assisted UR5-based contact and pendulum experiments using velocity control\n- Characterized optical tactile sensor (force estimation, localization, hysteresis) using UR5, developed a ROS data collection pipeline\n- Silicon moulded 2 sets of breast prototypes with different lumps\n- Conducted breast cancer detection experiments with tactile glove\n- Assembled actuators and designed tactile communication devices for the deaf-blind\n\n**Magnum Cash&Carry | Mechatronics Engineer Intern** (Jun 2023 – Jul 2023)\n\n- Contributed to the development of prototype mobile robot for warehouse automation\n- Designed CAD models of pallet lift mechanisms and tested 3D printed components for functionality\n- Worked on PWM, I2C protocols to control Nema17 stepper motors via Arduino with accelerometer and proximity sensors feedback\n\n**BCPDAIFCQWANT | Project Manager & Coding Mentor** (Jun 2022 – Apr 2023)\n\n- Managed two cohorts for Qwant Summer School on web development\n- Mentored high school students on Qwasar.io for advanced coding projects\n\nThese experiences have honed my skills in project management, mentoring, and applying robotics technologies to real-world problems.",
    image: "/lab1.jpg"
  },
  "What are your key projects and research?": {
    text: "**Projects:**\n\n**Shell Eco-Marathon 'Bulan' Team | Chief Mechanical Engineer | Mar 2024 - Feb 2025** \n- Led CAD design and optimization of an energy-efficient prototype EV for competition.\n- Manufactured aluminum chassis and carbon body for the prototype.\n- Coordinated team logistics and ensured compliance with event regulations of the Shell Eco Marathon Asia 2025 in Qatar. \n\n**Meteo Station IoT Device**\n- Designed a remote monitoring system for temperature and humidity in storage rooms\n\n**Research:**\n\n**NUSense: Robust Soft Optical Tactile Sensor (Jul 2024 – Present)\n- Conducted a set of experiments on quantitative estimation of VBTS shear deformation via UR5 manipulator. Currently, designing a sophisticated version of NUSense.\n\n**Shape Recognition Using Planar Snake Robot** (Sep 2023 – Present)\n- Developed a tactile sensor for shape recognition and 3D point cloud reconstruction via snake robot manipulation.\n\n**Tactile Palpation of Breast Prototypes** (Mar 2024 – Present)\n- Utilized a UR5 robot for tactile imaging and pressure profile generation on breast cancer detection.\n\nThese projects and research initiatives demonstrate my expertise in robotics, mechanical design, and innovative sensing technologies.",
    image: "/lab2.jpg"
  },
  "What are your skills and publications?": {
    text: "**Skills:**\n\n- **Programming:** Python, C/C++, Java, JavaScript, MATLAB\n- **Technologies:** Linux, SolidWorks, UR, ROS, DAQ, CUDA, Detectron2, Arduino, KiCad, Git\n\n**Publications:**\n\n1. [**'Honeycomb-Inspired Metamaterial for Tactile Sensors'**](https://doi.org/10.1109/JSEN.2024.3492498) in IEEE Sensors Journal\n2. [**'NUSense: Shear Based Robust Optical Tactile Sensor'**](https://arxiv.org/abs/2410.23516) (Submitted to IEEE IROS 2025)\n\n**Awards:**\n\n- nFactorial Incubator Finalist (2018)\n- ABC Incubation Finalist (2019)\n- CS Peer Tutor at Nazarbayev University (2021)\n- Yessenov Foundation Research Scholarship Award (2024)\n\nThese skills, publications, and awards reflect my dedication to advancing the field of robotics and my commitment to academic excellence.",
    image: "/pub.jpeg"
  }
}

function ResponseComponent({ content, isTyping }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!content?.text) return;
    
    setDisplayedText("")

    if (isTyping) {
      let i = 0
      const intervalId = setInterval(() => {
        if (i < content.text.length) {
          setDisplayedText((prev) => prev + content.text[i])
          i++
        } else {
          clearInterval(intervalId)
        }
      }, 5)
      return () => clearInterval(intervalId)
    } else {
      setDisplayedText(content.text)
    }
  }, [content?.text, isTyping])

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
              {isTyping ? (
                <p className="whitespace-pre-line">{displayedText}</p>
              ) : (
                renderStyledText(displayedText)
              )}
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

export default function Home() {
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

  const handleSubmit = () => {
    if (isTyping || !inputText) return

    setIsTyping(true)
    setCurrentResponse(responses[inputText] || { text: "I'm sorry, I don't have information about that topic.", image: null })
    
    setTimeout(() => {
      setIsTyping(false)
    }, responses[inputText]?.text.length * 5 || 2000)
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
          Welcome 👋 to my digital portfolio(aka DoraGPT)! I&apos;m a robotics engineer and
          researcher specializing in tactile sensing, shape recognition, and
          advanced mechanical design. Explore my journey, projects, and
          publications here.
        </h2>
        <div className="w-full space-y-4">
          <div className="flex space-x-2 items-center">
            <Input 
              type="text" 
              placeholder="Ask me anything..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-grow min-h-[60px]"
              disabled={isTyping}
            />
            <Button className="min-h-[60px]" onClick={handleSubmit} disabled={isTyping || !inputText}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <Button 
                key={index} 
                variant="outline" 
                onClick={() => handlePromptClick(prompt)}
                disabled={isTyping}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
        {currentResponse && (
          <ResponseComponent content={currentResponse} isTyping={isTyping} />
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