const { execute } = require( './execute' )
const { executeFast } = require( './execute-fast' )
const { parse } = require( './parse' )

const hrToMs = ( [ s, ns ] ) => s * 1e3 + ns / 1e6

const mips = ( ms, ticks ) => ( 1e6 / ( ms / ticks ) ) / 1e6

const memory = new Uint32Array( 3 )
const times = 9e4

const startNative = process.hrtime()

let i = 0
let length = times
let result = 0

do {
  result += i
  i++
  length--
} while ( length )

const endNative = hrToMs( process.hrtime( startNative ) )

const fakeTicks = times * 5 + 3

console.log( 'native' )
console.log( 'time', `${ endNative.toFixed( 2 ) }ms` )
console.log(
  'fake MIPS',
  Math.floor( mips( endNative, fakeTicks ) ).toLocaleString()
)
console.log( 'result', result )

const program = [
  // 0 - i
  'set 0 0',
  // 1 - length
  `set 1 ${ times }`,
  // 2 - result
  'set 2 0',

  // :loop
  // 3 - result += i
  'add 2 0',
  // 4 - i++
  'vadd 0 1',
  // 5 - length--
  'vsub 1 1',
  // 6 - if length === 0
  'vjmpz 1 8',
  // 7 - else
  'vjmp 3',
  // 8 - break
  'brk'
]

const logMemory = () => console.log( 'memory', Array.from( memory ) )

const compareNative = ( name, fn ) => {
  memory.fill( 0 )

  const start = process.hrtime()
  const ticks = fn()
  const end = hrToMs( process.hrtime( start ) )

  console.log()
  console.log( name )
  console.log( 'time', `${ end.toFixed( 2 ) }ms` )
  console.log( 'ratio:native', ( end / endNative ).toFixed( 2 ) )
  console.log( 'ticks', ticks.toLocaleString() )
  console.log( 'MIPS', Math.floor( mips( end, ticks ) ).toLocaleString() )
  logMemory()
}

const instructions = program.map( parse )

compareNative( 'fn', () => execute( memory, instructions ) )

compareNative( 'imperative', () => executeFast( memory, instructions ) )