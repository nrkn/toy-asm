const instr = require( './instr' )

const execute = ( memory, instructions ) => {
  let counter = 0
  let [ op, ...args ] = instructions[ counter ]
  let ticks = 1

  while( op !== 'brk' ){
    const result = instr[ op ]( memory, ...args )
    ticks++

    if( typeof result === 'number' ){
      counter = result
    } else {
      counter++
    }

    [ op, ...args ] = instructions[ counter ]
  }

  return ticks
}

module.exports = { execute }
