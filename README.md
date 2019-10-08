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

On i7-3770

```
native
result 4,049,955,000
time 18.38ms
ticks 45,000,300
MIPS 2,448,849

compiled
result 4,049,955,000
time 118.78ms
ticks 45,000,300
MIPS 378,854
native 15.47%

compiled - eval
result 4,049,955,000
time 148.47ms
ticks 45,000,300
MIPS 303,103
native 12.38%

imperative
result 4,049,955,000
time 785.37ms
ticks 45,000,300
MIPS 57,297
native 2.34%

fn
result 4,049,955,000
time 1605.42ms
ticks 45,000,300
MIPS 28,030
native 1.14%
```

nb not comparable to actual [MIPs](https://en.wikipedia.org/wiki/Instructions_per_second)