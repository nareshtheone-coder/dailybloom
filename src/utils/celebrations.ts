/**
 * Celebration & Reward Animations
 * Used when kids complete tasks or answer correctly
 */

export const playConfetti = (count: number = 50) => {
  if (typeof window === 'undefined') return

  const colors = ['🎉', '🎊', '⭐', '🌟', '✨', '🎈', '🎁', '🏆']
  
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti'
    confetti.innerHTML = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.left = Math.random() * 100 + '%'
    confetti.style.top = '-10px'
    confetti.style.position = 'fixed'
    confetti.style.fontSize = '2rem'
    confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`
    confetti.style.zIndex = '9999'
    confetti.style.pointerEvents = 'none'
    
    document.body.appendChild(confetti)
    
    setTimeout(() => confetti.remove(), 4000)
  }
}

export const playCelebrationSound = (type: 'success' | 'perfect' | 'excellent' = 'success') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const now = audioContext.currentTime

  if (type === 'success') {
    // Simple bell sound
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    osc.connect(gain)
    gain.connect(audioContext.destination)
    osc.frequency.value = 800
    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)
    osc.start(now)
    osc.stop(now + 0.5)
  } else if (type === 'perfect') {
    // Ascending notes
    const notes = [523, 659, 784]
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = freq
      const startTime = now + i * 0.15
      gain.gain.setValueAtTime(0.3, startTime)
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4)
      osc.start(startTime)
      osc.stop(startTime + 0.4)
    })
  } else if (type === 'excellent') {
    // Fanfare-like sound
    const notes = [523, 587, 659, 784, 880]
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = freq
      const startTime = now + i * 0.1
      gain.gain.setValueAtTime(0.2, startTime)
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)
      osc.start(startTime)
      osc.stop(startTime + 0.3)
    })
  }
}

export const showCelebrationText = (text: string = '🎉 Great Job!') => {
  const celebration = document.createElement('div')
  celebration.innerHTML = text
  celebration.style.position = 'fixed'
  celebration.style.top = '50%'
  celebration.style.left = '50%'
  celebration.style.transform = 'translate(-50%, -50%)'
  celebration.style.fontSize = '3rem'
  celebration.style.fontWeight = 'bold'
  celebration.style.zIndex = '10000'
  celebration.style.animation = `celebrationPop 1s ease-out forwards`
  celebration.style.pointerEvents = 'none'
  celebration.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)'

  document.body.appendChild(celebration)
  setTimeout(() => celebration.remove(), 1000)
}

export const celebrate = (intensity: 'light' | 'medium' | 'full' = 'medium') => {
  if (intensity === 'light') {
    playCelebrationSound('success')
    showCelebrationText('✨ Good!')
    playConfetti(10)
  } else if (intensity === 'medium') {
    playCelebrationSound('perfect')
    showCelebrationText('🎉 Great Job!')
    playConfetti(30)
  } else {
    playCelebrationSound('excellent')
    showCelebrationText('🎊 Excellent! 🏆')
    playConfetti(50)
  }
}

export const addCelebrationStyles = () => {
  if (document.getElementById('celebration-styles')) return

  const style = document.createElement('style')
  style.id = 'celebration-styles'
  style.innerHTML = `
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }

    @keyframes celebrationPop {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.2);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
      }
    }

    @keyframes clap {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    .celebration-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }

    .firework {
      position: absolute;
      animation: explode 1s ease-out forwards;
    }

    @keyframes explode {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}
