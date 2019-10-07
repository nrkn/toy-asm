const add = ( memory, dest, src ) => {
  memory[ dest ] += memory[ src ]
}

const vadd = ( memory, dest, value ) => {
  memory[ dest ] += value
}

const sub = ( memory, dest, src ) => {
  memory[ dest ] -= memory[ src ]
}

const vsub = ( memory, dest, value ) => {
  memory[ dest ] -= value
}

const copy = ( memory, dest, src ) => {
  memory[ dest ] = memory[ src ]
}

const set = ( memory, dest, value ) => {
  memory[ dest ] = value
}

const jmp = ( memory, src ) => {
  return memory[ src ]
}

const vjmp = ( _memory, value ) => {
  return value
}

const jmpz = ( memory, src, dest ) => {
  if( memory[ src ] === 0 ) return memory[ dest ]
}

const vjmpz = ( memory, src, value ) => {
  if( memory[ src ] === 0 ) return value
}

const brk = () => {}

module.exports = {
  add, vadd, sub, vsub,
  copy, set,
  jmp, vjmp, jmpz, vjmpz,
  brk
}