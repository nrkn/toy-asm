const compileAsm = instructions => `
function compiled( stdlib, foreign, heap ){
  'use asm'

  var counter = 0
  var ticks = 0
  var memory = new stdlib.Uint32Array(heap)

  function run(){
    while( ( counter|0 ) >= (0|0) ){
      switch( counter ){
        ${
          instructions.map(
            ( instr, i ) =>
              `    case ${ i }: {
                    ticks = (ticks + 1)|0${ compileInstr( instr ) }}
              `
          ).join( '\n' )
        }
      }
    }

    return ticks | 0
  }

  return { run: run }
}
`

const compileInstr = ( [ op, arg1, arg2 ] ) => {
  switch ( op ) {
    case 'add': {
      return `
          memory[${ arg1 }] = (memory[${ arg1 }] + memory[${ arg2 }])|0
          counter = (counter + 1)|0
          break
      `
    }

    case 'vadd': {
      return `
          memory[${ arg1 }] = (memory[${ arg1 }] + ${ arg2 })|0
          counter = (counter + 1)|0
          break
      `
    }

    case 'sub': {
      return `
          memory[${ arg1 }] = (memory[${ arg1 }] - memory[${ arg2 }])|0
          counter = (counter + 1)|0
          break
      `
    }

    case 'vsub': {
      return `
          memory[${ arg1 }] = (memory[${ arg1 }] - ${ arg2 })|0
          counter = (counter + 1)|0
          break
      `
    }

    case 'cpy': {
      return `
          memory[${ arg1 }] = memory[${ arg2 }]|0
          counter = (counter + 1)|0
          break
      `
    }

    case 'vcpy': {
      return `
          memory[${ arg1 }] = ${ arg2 }|0
          counter = (counter + 1)|0
          break
      `
    }

    case 'jmp': {
      return `
          counter = memory[${ arg1 }]|0
          break
      `
    }

    case 'vjmp': {
      return `
          counter = ${ arg1 }|0
          break
      `
    }

    case 'jmpz': {
      return `
          if (memory[${ arg1 }] == 0) {
            counter = memory[${ arg2 }]|0
          } else {
            counter = (counter + 1)|0
          }
          break
      `
    }

    case 'vjmpz': {
      return `
          if (memory[${ arg1 }] == 0) {
            counter = ${ arg2 }|0
          } else {
            counter = (counter + 1)|0
          }
          break
      `
    }

    case 'brk': {
      return `
          counter = -1|0
          break
      `
    }
  }
}

module.exports = { compileAsm }