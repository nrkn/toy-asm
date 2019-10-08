module.exports = ( memory => {
  let counter = 0
  let ticks = 0

  while ( counter >= 0 ) {
    switch ( counter ) {
      case 0: {
        ticks++
        memory[ 0 ] = 0
        counter++
        break
      }

      case 1: {
        ticks++
        memory[ 1 ] = 90000
        counter++
        break
      }

      case 2: {
        ticks++
        memory[ 2 ] = 0
        counter++
        break
      }

      case 3: {
        ticks++
        memory[ 2 ] += memory[ 0 ]
        counter++
        break
      }

      case 4: {
        ticks++
        memory[ 0 ] += 1
        counter++
        break
      }

      case 5: {
        ticks++
        memory[ 1 ] -= 1
        counter++
        break
      }

      case 6: {
        ticks++
        if ( memory[ 1 ] === 0 ) {
          counter = 8
        } else {
          counter++
        }
        break
      }

      case 7: {
        ticks++
        counter = 3
        break
      }

      case 8: {
        ticks++
        counter = -1
        break
      }

    }
  }

  return ticks
} )