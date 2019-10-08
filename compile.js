const compile = ( instructions, memoryExpr ) => `
let counter = 0
const memory = ${ memoryExpr }

while( counter >= 0 ){
  switch( counter ){
    ${
      instructions.map(
        ( instr, i ) =>
          `    case ${ i }: {${ compileInstr( instr ) }}`
      ).join( '\n' )
    }
  }
}

return memory
`

const compileInstr = ( [ op, arg1, arg2 ] ) => {
  switch ( op ) {
    case 'add': {
      return `
          memory[${ arg1 }] += memory[${ arg2 }]
          counter++
          break
      `
    }

    case 'vadd': {
      return `
          memory[${ arg1 }] += ${ arg2 }
          counter++
          break
      `
    }

    case 'sub': {
      return `
          memory[${ arg1 }] -= memory[${ arg2 }]
          counter++
          break
      `
    }

    case 'vsub': {
      return `
          memory[${ arg1 }] -= ${ arg2 }
          counter++
          break
      `
    }

    case 'copy': {
      return `
          memory[${ arg1 }] = memory[${ arg2 }]
          counter++
          break
      `
    }

    case 'set': {
      return `
          memory[${ arg1 }] = ${ arg2 }
          counter++
          break
      `
    }

    case 'jmp': {
      return `
          counter = memory[${ arg1 }]
          break
      `
    }

    case 'vjmp': {
      return `
          counter = ${ arg1 }
          break
      `
    }

    case 'jmpz': {
      return `
          if (memory[${ arg1 }] === 0) {
            counter = memory[${ arg2 }]
          } else {
            counter++
          }
          break
      `
    }

    case 'vjmpz': {
      return `
          if (memory[${ arg1 }] === 0) {
            counter = ${ arg2 }
          } else {
            counter++
          }
          break
      `
    }

    case 'brk': {
      return `
          counter = -1
          break
      `
    }
  }
}

module.exports = { compile }