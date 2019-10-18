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
time 18.05ms
ticks 45,000,300
MIPS 2,493,036

compiled
result 4,049,955,000
time 117.83ms
ticks 45,000,300
MIPS 381,903
native 15.32%

compiled - eval
result 4,049,955,000
time 140.02ms
ticks 45,000,300
MIPS 321,386
native 12.89%

interpreted - imperative
result 4,049,955,000
time 779.52ms
ticks 45,000,300
MIPS 57,728
native 2.32%

interpreted - fn
result 4,049,955,000
time 1627.38ms
ticks 45,000,300
MIPS 27,651
native 1.11%
```

nb not comparable to actual
[MIPs](https://en.wikipedia.org/wiki/Instructions_per_second)
