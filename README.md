# toy-asm

Toy assembly language

```
set 0 0
set 1 90000
set 2 0
add 2 0
vadd 0 1
vsub 1 1
vjmpz 1 8
vjmp 3
brk
```

```json
[ 90000, 0, 4049955000 ]
```

## benchmark

Super, super unscientific. Not run long enough, only uses a few instructions etc

### native

```js
let i = 0
let length = times
let result = 0

do {
  result += i
  i++
  length--
} while ( length )
```

### results

On i7-3770:

```
native
time 4.49ms
fake MIPS 100,245
result 4049955000

fn
time 49.00ms
ratio:native 10.92
ticks 450,003
MIPS 9,183
memory [ 90000, 0, 4049955000 ]

imperative
time 8.39ms
ratio:native 1.87
ticks 450,003
MIPS 53,619
memory [ 90000, 0, 4049955000 ]
```