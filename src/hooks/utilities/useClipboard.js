import { useState } from 'react'

// type CopiedValue = string | null
// type CopyFn = (text: string) => Promise<boolean> // Return success

const useClipboard = ({ onError, onSuccess } = {}) => {
  const [copiedText, setCopiedText] = useState(null)

  const copy = async text => {
    if (!navigator?.clipboard) {
      onError?.(new Error('Clipboard not supported'))
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      onSuccess?.(text)
      setCopiedText(text)
      return true
    } catch (error) {
      onError?.(error)
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy]
}

export default useClipboard
