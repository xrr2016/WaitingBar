// const manyThings = [
//     function thing01() {
//         console.log('start 01')
//         setTimeout(() => {
//             console.log('Use 1000ms')
//         }, 1000)
//     },
//     function thing02() {
//         console.log('start 02')
//         setTimeout(() => {
//             console.log('Use 2000ms')
//         }, 2000)
//     },
//     function thing03() {
//         console.log('start 03')
//         setTimeout(() => {
//             console.log('Use 3000ms')
//         }, 3000)
//     },
//     function thing04() {
//         console.log('start 04')
//         setTimeout(() => {
//             console.log('Use 2500ms')
//         }, 2500)
//     },
//     function thing05() {
//         console.log('start 05')
//         setTimeout(() => {
//             console.log('Use 3500ms')
//         }, 3500)
//     }
// ]

function next(things) {
    const fn = things.shift()
    setTimeout(() => {
        fn && fn()
    }, 0)
}
function calculateTotalTime(things) {
  let totalTime = 0
  for(let i = 0; i < things.length;i++){
    const startTime = Date.now()
    things[i]()
    totalTime += (Date.now() - startTime)
  }
  return totalTime
}
// console.log(calculateTotalTime(manyThings))
