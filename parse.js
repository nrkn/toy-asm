const parse = instruction => {
  let [ op, arg1, arg2 ] = instruction.split( ' ' )

  if( arg1 === undefined ) return [ op ]

  if( arg1.startsWith( '$' ) ){
    arg1 = Number( arg1.substring( 1 ) )
  } else {
    arg1 = Number( arg1 )
    op = 'v' + op
  }

  if( arg2 === undefined ){
    return [ op, arg1 ]
  }

  if( arg2.startsWith( '$' ) ){
    arg2 = Number( arg2.substring( 1 ) )
  } else {
    arg2 = Number( arg2 )
    op = 'v' + op
  }

  return [ op, arg1, arg2 ]
}

module.exports = { parse }
