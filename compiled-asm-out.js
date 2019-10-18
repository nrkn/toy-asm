function CompiledAsm( stdlib, foreign, heap ) {
  'use asm'

  var counter = 0
  var ticks = 0
  var memory = new stdlib.Uint32Array( heap )

  function run() {
    while ( ( counter | 0 ) >= ( 0 | 0 ) ) {
      switch ( counter ) {
        case 0: {
          ticks = ( ticks + 1 ) | 0
          memory[ 0 ] = 0 | 0
          counter = ( counter + 1 ) | 0
          break
        }

        case 1: {
          ticks = ( ticks + 1 ) | 0
          memory[ 1 ] = 90000 | 0
          counter = ( counter + 1 ) | 0
          break
        }

        case 2: {
          ticks = ( ticks + 1 ) | 0
          memory[ 2 ] = 0 | 0
          counter = ( counter + 1 ) | 0
          break
        }

        case 3: {
          ticks = ( ticks + 1 ) | 0
          memory[ 2 ] = ( memory[ 2 ] + memory[ 0 ] ) | 0
          counter = ( counter + 1 ) | 0
          break
        }

        case 4: {
          ticks = ( ticks + 1 ) | 0
          memory[ 0 ] = ( memory[ 0 ] + 1 ) | 0
          counter = ( counter + 1 ) | 0
          break
        }

        case 5: {
          ticks = ( ticks + 1 ) | 0
          memory[ 1 ] = ( memory[ 1 ] - 1 ) | 0
          counter = ( counter + 1 ) | 0
          break
        }

        case 6: {
          ticks = ( ticks + 1 ) | 0
          if ( memory[ 1 ] == 0 ) {
            counter = 8 | 0
          } else {
            counter = ( counter + 1 ) | 0
          }
          break
        }

        case 7: {
          ticks = ( ticks + 1 ) | 0
          counter = 3 | 0
          break
        }

        case 8: {
          ticks = ( ticks + 1 ) | 0
          counter = -1 | 0
          break
        }

      }
    }

    return ticks | 0
  }

  return { run: run }
}

module.exports = { CompiledAsm }