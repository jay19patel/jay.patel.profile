'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { Button } from '@/components/customUi/Button'
import { Lock, Loader, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const AdminLogin = () => {
  const [pin, setPin] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPin, setShowPin] = useState(false)
  const { login, error: authError } = useAdminAuth()
  const inputRefs = useRef([])

  // Update error when auth context error changes
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newPin = [...pin]
    newPin[index] = value

    setPin(newPin)
    setError('')

    // Auto focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto submit when all 4 digits are entered
    if (index === 3 && value && newPin.every(digit => digit !== '')) {
      handleSubmit(newPin.join(''))
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 4).split('')
        if (digits.length === 4) {
          setPin(digits)
          handleSubmit(digits.join(''))
        }
      }).catch(() => {
        setError('Failed to read clipboard')
      })
    }
  }

  const handleSubmit = async (pinValue = null) => {
    const finalPin = pinValue || pin.join('')
    
    if (finalPin.length !== 4) {
      setError('Please enter all 4 digits')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await login(finalPin)
      
      if (!result.success) {
        setError(result.error || 'Invalid PIN')
        setPin(['', '', '', ''])
        inputRefs.current[0]?.focus()
      }
    } catch (error) {
      setError('Authentication failed. Please try again.')
      setPin(['', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const clearPin = () => {
    setPin(['', '', '', ''])
    setError('')
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Access
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Enter your 4-digit PIN to continue
            </p>
          </div>

          {/* PIN Input */}
          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type={showPin ? "text" : "password"}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-14 h-14 text-2xl font-bold text-center border-2 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-4 transition-all ${
                    error
                      ? 'border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  maxLength={1}
                  disabled={isLoading}
                  aria-invalid={error ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Show/Hide PIN Toggle */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                disabled={isLoading}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPin ? 'Hide PIN' : 'Show PIN'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 flex flex-col items-center">
              <Button
                onClick={() => handleSubmit()}
                disabled={isLoading || pin.some(digit => digit === '')}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  'Access Admin Panel'
                )}
              </Button>

              <button
                type="button"
                onClick={clearPin}
                disabled={isLoading}
                className="w-full py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Clear PIN
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              🔒 Your session will automatically expire after 24 hours for security
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin 