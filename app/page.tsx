'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [animation, setAnimation] = useState<string[]>([])

  const handleClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0')
    } else if (value === '=') {
      try {
        const result = eval(display).toString()
        setDisplay(result)
        checkForAnimations(result)
      } catch (error) {
        setDisplay('Error')
      }
    } else {
      setDisplay(prev => (prev === '0' ? value : prev + value))
    }
  }

  const checkForAnimations = (result: string) => {
    const animations = []
    const num = parseFloat(result)

    if (result.includes('3') || num % 3 === 0) {
      animations.push('nabeAtsu')
    }

    if (num === 106 || num === 130) {
      animations.push('incomeWall')
    }

    setAnimation(animations)
  }

  useEffect(() => {
    if (animation.length > 0) {
      const timer = setTimeout(() => {
        setAnimation([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [animation])

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <div className="mb-4 text-right text-4xl font-bold text-black h-16 flex items-center justify-end bg-gray-200 rounded px-2 overflow-x-auto">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`${
                btn === 'C' ? 'col-span-4 bg-red-500 hover:bg-red-600' :
                btn === '=' ? 'bg-green-500 hover:bg-green-600' :
                'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded transition duration-200`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {animation.includes('nabeAtsu') && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            className="fixed top-1/4 text-4xl font-bold text-fuchsia-500"
            style={{ fontSize: '36px' }}
          >
            世界のナベアツ！！
          </motion.div>
        )}
        {animation.includes('incomeWall') && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            className="fixed left-1/2 transform -translate-x-1/2 text-5xl font-bold text-stone-700"
            style={{ fontSize: '48px' }}
          >
            年収の壁
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}