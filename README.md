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
result 4,049,955,000
time 18.63ms
ticks 45,000,300
MIPS 2,415,371

imperative
result 4,049,955,000
time 775.97ms
ticks 45,000,300
MIPS 57,992
native 2.40%

fn
result 4,049,955,000
time 1632.15ms
ticks 45,000,300
MIPS 27,571
native 1.14%
```