(function(window, document) {
    const W = window,
          D = document
    const colors = {
      "primary" : "#0275d8",
      "success" : "#5cb85c",
      "info" : "#5bc0de",
      "warning" : "#f0ad4e",
      "danger" : "#d9534f",
      "inverse" : "#292b2c",
      "faded" : "#f7f7f7",
    }
    class WaitingBar {
        constructor(things = [], color, height = 14) {
            this.height = height
            this.things = things
            this.color = color || this.getRandomColor()
            this.createLoadingBar(this.color,this.height)
        }
        createLoadingBar(color, height) {
            const bar = D.createElement('div')
            this.getStyle(bar)
            D.body.appendChild(bar)
        }
        getRandomColor() {
            let color = "#",
                letters = '0123456789ABCDEF'
            for (let i = 0; i < 6; i++) {
                color += letters[Math.round(Math.random() * letters.length)]
            }
            return color
        }
        calculateTime(things) {
            const startTime = Date.now()
            while (things.length > 0) {
              const fn = things.shift()
              fn && fn()
            }
            const endTime = Date.now()
            return endTime - startTime
        }
        animate(element){

        }
        next(){

        }
        getStyle(element) {
            element.style.position = 'absolute'
            element.style.top = 0 + 'px'
            element.style.left = 0 + 'px'
            element.style.backgroundColor = this.color
            element.style.height = this.height + 'px'
            element.style.width = 100 + 'px'
            return element
        }
    }
    function aWaitingBar(things, color, height) {
        return new WaitingBar(things, color, height)
    }
    W.aWaitingBar = aWaitingBar
    W.WaitingBar = WaitingBar
})(window, document)
