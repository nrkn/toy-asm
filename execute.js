const instr = require( './instr' )

const execute = ( memory, instructions ) => {
  let counter = 0
  let args = instructions[ counter ]
  let ticks = 1

  while( args[ 0 ] !== 'brk' ){
    const result = instr[ args[ 0 ] ]( memory, args[ 1 ], args[ 2 ] )
    ticks++

    if( typeof result === 'number' ){
      counter = result
    } else {
      counter++
    }

    args = instructions[ counter ]
  }

  return ticks
}

module.exports = { execute }
