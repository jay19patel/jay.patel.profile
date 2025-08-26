"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/customUi/Button"
import { useRouter } from "next/navigation"

const CodeTerminal = () => {
  const router = useRouter()
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [displayedCode, setDisplayedCode] = useState([])
  const [isTyping, setIsTyping] = useState(true)

  // Developer-related code snippets with realistic terminal commands
  const codeLines = [
    "# I'm a passionate software developer who graduated in 2023. I specialize in creating modern web applications and digital solutions that solve real-world problems.My journey in tech started with curiosity and has evolved into a career focused on building innovative software.",
    "",
    "$ whoami",
    "jay_patel",
    "$ cat profile.json",
    "{",
    '  "role": "Software Developer",',
    '  "location": "Valsad, Gujarat, India",',
    '  "interest": "Making innovative ideas into digital solutions & having fun with tech education",',
    "}",
    "$ npm run deploy",
    "✓ Ready to build amazing things! 🚀",
    "# I believe in continuous learning and staying updated with the latest technologies. My goal is to create software that makes a positive impact and provides excellent user experiences."
  ]

  const typeSpeed = 15 // milliseconds per character (very fast)
  const lineDelay = 100 // delay between lines (very fast)

  useEffect(() => {
    if (!isTyping) return

    const timer = setTimeout(() => {
      if (currentLine < codeLines.length) {
        const currentLineText = codeLines[currentLine]
        
        if (currentChar < currentLineText.length) {
          // Type character by character
          setDisplayedCode(prev => {
            const newCode = [...prev]
            if (!newCode[currentLine]) {
              newCode[currentLine] = ''
            }
            newCode[currentLine] = currentLineText.substring(0, currentChar + 1)
            return newCode
          })
          setCurrentChar(prev => prev + 1)
        } else {
          // Line completed, move to next line after delay
          setTimeout(() => {
            setCurrentLine(prev => prev + 1)
            setCurrentChar(0)
          }, lineDelay)
        }
      } else {
        // All lines completed
        setIsTyping(false)
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [currentLine, currentChar, isTyping])

  // Reset animation every 30 seconds
  useEffect(() => {
    const resetTimer = setTimeout(() => {
      setCurrentLine(0)
      setCurrentChar(0)
      setDisplayedCode([])
      setIsTyping(true)
    }, 30000)

    return () => clearTimeout(resetTimer)
  }, [displayedCode])

  const getLineColor = (line) => {
    if (!line) return 'text-transparent' // Handle undefined/empty lines
    if (line.startsWith('# ')) return 'text-gray-500' // Comments
    if (line.startsWith('$ ')) return 'text-green-400' // Commands
    if (line.startsWith('✓')) return 'text-blue-400' // Success messages
    if (line === 'jay_patel') return 'text-yellow-300' // Responses
    if (line.includes('"name"') || line.includes('"role"')) return 'text-purple-400' // Key properties
    if (line.includes('🚀')) return 'text-red-400' // Special messages
    if (line.startsWith('On branch') || line.includes('origin/main')) return 'text-cyan-400' // Git info
    if (line.includes('{') || line.includes('}')) return 'text-gray-300' // Brackets
    if (line === '') return 'text-transparent' // Empty lines
    return 'text-gray-300' // Default
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto mb-6"
    >
      {/* Terminal Window */}
      <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm font-mono ml-4">jay@developer:~</span>
          </div>
          <div className="text-gray-500 text-xs">Terminal</div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-base min-h-[400px] bg-gray-900">
          <div className="space-y-1">
            {displayedCode.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${getLineColor(line)} leading-relaxed`}
              >
                <span>{line}</span>
                {index === currentLine && isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-white bg-white w-2 inline-block ml-1"
                  >
                    _
                  </motion.span>
                )}
              </motion.div>
            ))}
            
            {/* Show cursor on current line if still typing */}
            {isTyping && currentLine < codeLines.length && !displayedCode[currentLine] && (
              <motion.div className="text-green-400">
                <span>$ </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-white bg-white w-2 inline-block"
                >
                  _
                </motion.span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Code Elements and Button */}
      <div className="mt-6 flex flex-col items-center space-y-6">

        {/* More About Me Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <Button 
            onClick={() => router.push('/about')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            More About Me
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CodeTerminal