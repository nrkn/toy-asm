# toy-asm

Toy assembly language

```
cpy $0 0
cpy $1 90000
cpy $2 0
add $2 $0
add $0 1
sub $1 1
jmpz $1 8
jmp 3
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
time 18.50ms
ticks 45,000,300
MIPS 2,431,857

compiled
result 4,049,955,000
time 134.49ms
ticks 45,000,300
MIPS 334,601
native 13.76%

compiled - eval
result 4,049,955,000
time 132.87ms
ticks 45,000,300
MIPS 338,668
native 13.93%

compiled - asm.js
result 4,049,955,000
time 8.47ms
ticks 45,000,300
MIPS 5,311,023
native 218.39%

interpreted - imperative
result 4,049,955,000
time 1049.48ms
ticks 45,000,300
MIPS 42,878
native 1.76%

interpreted - fn
result 4,049,955,000
time 1715.64ms
ticks 45,000,300
MIPS 26,229
native 1.08%
```

nb not comparable to actual
[MIPs](https://en.wikipedia.org/wiki/Instructions_per_second)
