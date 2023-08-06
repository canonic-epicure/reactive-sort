import { CalculableBox } from "@bryntum/chronograph/src/chrono2/data/CalculableBox.js"

const size = 10

const arr = new Array(size).fill(0).map((_, i) => {
    const box : CalculableBox<number> = CalculableBox.new({
        calculation () : number {
            const ownValue = this.readProposedOrPrevious()

            if (el.idx === 0) return ownValue

            const predecessor       = arr[ el.idx - 1 ].box
            // returns the biggest value from all predecessors actually
            const predecessorValue  = predecessor.read()

            // if predecessor is greater
            if (predecessorValue > ownValue) {
                // swap our value with value of predecessor
                predecessor.write(ownValue)
                this.write(predecessorValue)

                return predecessorValue
            } else {
                // otherwise all good
                return ownValue
            }
        }
    })

    box.write(i)

    const el = {
        idx : 0,
        randomPos : Math.random() * size,
        box
    }

    return el
})

// sort randomly
arr.sort((a, b) => a.randomPos - b.randomPos)

// assigning indexes
for (let i = arr.length - 1; i >= 0; i--) arr[ i ].idx = i

console.log("Before sort:", arr.map(el => el.box.readProposedOrPrevious()))

const result = new Array(size)

// reading from right to left - important
for (let i = arr.length - 1; i >= 0; i--) result[ i ] = arr[ i ].box.read()

console.log("After sort:", result)
console.log("Sorted: ", result.every((el, i) => i === 0 ? true : el > result[ i - 1 ]))
