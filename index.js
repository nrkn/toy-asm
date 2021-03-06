const { execute } = require( './execute' )
const { executeFast } = require( './execute-fast' )
const { parse } = require( './parse' )
const { compile } = require( './compile' )
const { CompiledAsm } = require( './compiled-asm-out' )
const compiledNoEval = require( './compiled-out' )

const hrToMs = ( [ s, ns ] ) => s * 1e3 + ns / 1e6

const logTime = ms => console.log( 'time', `${ ms.toFixed( 2 ) }ms` )
const logMips = ( ms, ticks ) => console.log(
  'MIPS',
  Math.floor( ticks / ms ).toLocaleString()
)

const memory = new Uint32Array( 3 )
const loopLength = 9e4
const benchTimes = 100

const program = [
  // 0 - i
  'cpy $0 0',
  // 1 - length
  `cpy $1 ${ loopLength }`,
  // 2 - result
  'cpy $2 0',

  // :loop
  // 3 - result += i
  'add $2 $0',
  // 4 - i++
  'add $0 1',
  // 5 - length--
  'sub $1 1',
  // 6 - if length === 0
  'jmpz $1 8',
  // 7 - else
  'jmp 3',
  // 8 - break
  'brk'
]

// fake - estimated based on asm ticks
const nativeTicks = loopLength * 5 + 3

let ticks = 0
let result

const native = () => {
  let i = 0
  let length = loopLength
  let result = 0

  do {
    result += i
    i++
    length--
  } while ( length )

  return result
}

const start = process.hrtime()

for ( let i = 0; i < benchTimes; i++ ) {
  result = native()

  ticks += nativeTicks
}

const msNative = hrToMs( process.hrtime( start ) )

console.log( 'native' )
console.log( 'result', result.toLocaleString() )
logTime( msNative )
console.log( 'ticks', ticks.toLocaleString() )
logMips( msNative, ticks )

const compareNative = ( name, ex ) => {
  let ticks = 0
  const start = process.hrtime()

  for ( let i = 0; i < benchTimes; i++ ) {
    ticks += ex( memory, instructions )
  }

  const ms = hrToMs( process.hrtime( start ) )

  console.log()
  console.log( name )
  console.log( 'result', memory[ 2 ].toLocaleString() )
  logTime( ms )
  console.log( 'ticks', ticks.toLocaleString() )
  logMips( ms, ticks )
  console.log( 'native', `${ ( 100 / ( ms / msNative ) ).toFixed( 2 ) }%` )
}

const instructions = program.map( parse )

const compiled = compile( instructions )

const compareCompiledEvalNative = () => {
  let ticks = 0
  const start = process.hrtime()

  for ( let i = 0; i < benchTimes; i++ ) {
    ticks += eval.call( null, compiled )( memory )
  }

  const ms = hrToMs( process.hrtime( start ) )

  console.log()
  console.log( 'compiled - eval' )
  console.log( 'result', memory[ 2 ].toLocaleString() )
  logTime( ms )
  console.log( 'ticks', ticks.toLocaleString() )
  logMips( ms, ticks )
  console.log( 'native', `${ ( 100 / ( ms / msNative ) ).toFixed( 2 ) }%` )
}

const heap = new ArrayBuffer( 0x10000 )
const stdlib = { Uint32Array }
const lib = new CompiledAsm( stdlib, null, heap )

const compareCompiledAsmNative = () => {
  let ticks = 0
  const start = process.hrtime()

  for ( let i = 0; i < benchTimes; i++ ) {
    ticks += lib.run()
  }

  const ms = hrToMs( process.hrtime( start ) )

  console.log()
  console.log( 'compiled - asm.js' )
  console.log( 'result', memory[ 2 ].toLocaleString() )
  logTime( ms )
  console.log( 'ticks', ticks.toLocaleString() )
  logMips( ms, ticks )
  console.log( 'native', `${ ( 100 / ( ms / msNative ) ).toFixed( 2 ) }%` )
}

const compareCompiledNative = () => {
  let ticks = 0
  const start = process.hrtime()

  for ( let i = 0; i < benchTimes; i++ ) {
    ticks += compiledNoEval( memory )
  }

  const ms = hrToMs( process.hrtime( start ) )

  console.log()
  console.log( 'compiled' )
  console.log( 'result', memory[ 2 ].toLocaleString() )
  logTime( ms )
  console.log( 'ticks', ticks.toLocaleString() )
  logMips( ms, ticks )
  console.log( 'native', `${ ( 100 / ( ms / msNative ) ).toFixed( 2 ) }%` )
}

compareCompiledNative()
compareCompiledEvalNative()
compareCompiledAsmNative()

compareNative( 'interpreted - imperative', executeFast )
compareNative( 'interpreted - fn', execute )
