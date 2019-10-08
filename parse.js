const parse = instruction => {
  let [ op, arg1, arg2 ] = instruction.split( /\s+/ ).filter( s => s !== '' )

  if( arg1 === undefined ){
    return [ op ]
  }

  [ op, arg1 ] = parseArg( op, arg1 )

  if( arg2 === undefined ){
    return [ op, arg1 ]
  }

  [ op, arg2 ] = parseArg( op, arg2 )

  return [ op, arg1, arg2 ]
}

const parseArg = ( op, arg ) => {
  if( arg.startsWith( '$' ) ){
    arg = Number( arg.substring( 1 ) )
  } else {
    arg = Number( arg )
    if( !op.startsWith( 'v' ) ) op = 'v' + op
  }

  return [ op, arg ]
}

module.exports = { parse }
