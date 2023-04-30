const getPatternLength = () => {
    let increasingLength = true
    let patternLength = 3
      while (increasingLength) {
        let roll = Math.random()
        if (roll < 0.5 && patternLength < 7) {
          patternLength += 1
        } else {
          increasingLength = false
        }
      }
    return patternLength
  }

export const generatePattern = () => {
    let generatedPattern: number[] = []
    const patternLength = getPatternLength()
    
    for (let i = 0; i < patternLength; i++) {
      const checkNumber = () => {
        generatedPattern[i] = Math.ceil(Math.random() * 4)
        if (generatedPattern[i-1] === generatedPattern[i]) {
          checkNumber()
        }
      }
      checkNumber()
    }
    return generatedPattern
  }