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
let length = 9e5
let result = 0

do {
  result += i
  i++
  length--
} while ( length )
```

### results

On [i7-3770](https://en.wikipedia.org/wiki/Instructions_per_second#Timeline_of_instructions_per_second):

```
native
time 4.25ms
fake MIPS 105,838
{ i: 90000, length: 0, result: 4049955000 }

fn
time 49.00ms
MIPS 9,182
memory [ 90000, 0, 4049955000 ]
ticks 450,003
ratio:native 11.53

imperative
time 8.11ms
MIPS 55,509
memory [ 90000, 0, 4049955000 ]
ticks 450,003
ratio:native 1.91
```