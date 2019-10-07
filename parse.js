const parse = instruction => {
  const [ op, ...argSegs ] = instruction.split( ' ' )
  const args = argSegs.map( Number )

  return [ op, ...args ]
}

module.exports = { parse }

// todo - parse - $x to num, if 2nd arg is not address, call `v${ op }`
const program2 = [
  // 0 - i
  'set $0 0',
  // 1 - length
  'set $1 10',
  // 2 - result
  'set $2 0',

  // :loop
  // 3 - result += i
  'add $2 $0',
  // 4 - increment i
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