const executeFast = (memory, instructions ) => {
  let counter = 0
  let args = instructions[counter]
  let ticks = 1

  while (args[0] !== 'brk') {
    switch (args[0]) {
      case 'add': {
        memory[args[1]] += memory[args[2]]
        counter++
        break
      }

      case 'vadd': {
        memory[args[1]] += args[2]
        counter++
        break
      }

      case 'sub': {
        memory[args[1]] -= memory[args[2]]
        counter++
        break
      }

      case 'vsub': {
        memory[args[1]] -= args[2]
        counter++
        break
      }

      case 'cpy': {
        memory[args[1]] = memory[args[2]]
        counter++
        break
      }

      case 'vcpy': {
        memory[args[1]] = args[2]
        counter++
        break
      }

      case 'jmp': {
        counter = memory[args[1]]
        break
      }

      case 'vjmp': {
        counter = args[1]
        break
      }

      case 'jmpz': {
        if (memory[args[1]] === 0) {
          counter = memory[args[2]]
        } else {
          counter++
        }
        break
      }

      case 'vjmpz': {
        if (memory[args[1]] === 0) {
          counter = args[2]
        } else {
          counter++
        }
        break
      }
    }

    ticks++

    args = instructions[counter]
  }

  return ticks
}

module.exports = { executeFast }