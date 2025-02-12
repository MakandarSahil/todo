import React from 'react'

const TextToSpeech = () => {
  const handleClick = () => {
    const text = "Hello, Suyash Kanda Chor"

    const value = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(value)
  }
  return (
    <div>

      <button onClick={handleClick}>Speek</button>
    </div>
  )
}

export default TextToSpeech