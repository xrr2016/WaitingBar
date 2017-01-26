(function(window, document) {
    const W = window,
          D = document
    const primary = "#0275d8",
          success = "#5cb85c",
          info = "#5bc0de",
          warning = "#f0ad4e",
          danger = "#d9534f",
          inverse = "#292b2c",
          faded = "#f7f7f7"
    const defaultOptions = {
        height: 3,
        shadow: true,
        loacation: 'top',
        color: danger,
        direction: 'normal',
        timingFunction: 'ease-in'
    }
    class WaitingBar {
        constructor(tasks = [], options) {
            this.options = Object.create(defaultOptions)
            for (let key in this.options) {
                if (options.hasOwnProperty(key)) {
                  this.options[key] = options[key]
                }
              }
            if (this.options.color === 'random') {
                this.options.color = getRandomColor()
            }
            if (typeof tasks === 'function') {
                this.tasks = []
                this.tasks.push(tasks)
            }
            this.tasks = tasks
            this.startTime = Date.now()
            this.finishTime = this.calculateTime(this.tasks)
            this.animateTime = this.finishTime - this.startTime
            this.bar = this.createLoadingBar(this.options.color, this.options.height)
            this.animation(this.bar)
        }
        next() {
            const fn = this.tasks.shift()
                  !!fn && fn()
              return Date.now()
        }
        createLoadingBar(color, height) {
            const bar = D.createElement('div')
            this.getStyle(bar)
            D.body.appendChild(bar)
            return bar
        }
        calculateTime(tasks) {
            while(tasks.length > 0){
              const fn = ((tasks) => {
                const task = tasks.shift()
                !!task && task()
              })(tasks)
            }
            if(tasks.length <= 0){
              return Date.now()
            }
        }
        animation(element) {
          if(element.animate){
              element.animate([
                  { width: '0%' },
                  { width: '100%' }
              ], {
                  duration: this.animateTime,
                  easing: this.options.timingFunction,
                  direction: this.options.direction
              })
          } else {
              this.widen(element,this.animateTime)
          }
        }
        widen(element,time){
          let setWidth = setInterval(() => {
              let width = parseInt(element.style.width,10)
              width++
              element.style.width = width + '%'
              if(element.style.width === '100%'){
                clearInterval(setWidth)
                element.style.display = 'none'
              }
            }, time / 100)
        }
        getStyle(element) {
            element.style.position = 'absolute'
            this.options.loacation === 'top' ? (element.style.top = 0 + 'px') : (element.style.bottom = 0 + 'px')
            element.style.left = 0 + 'px'
            element.style.width = 0 + '%'
            element.style.height = this.options.height + 'px'
            element.style.background = `linear-gradient(to left,${this.options.color},#f4f4f4)`
            element.style.boxShadow = this.options.shadow ? '0 2px 2px rgba(0,0,0,.2)' : null
            return element
        }
    }

    function aWaitingBar(tasks, options) {
        return new WaitingBar(tasks, options)
    }

    function getRandomColor() {
        let color = "#",
            letters = '0123456789ABCDEF'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * letters.length)]
        }
        return color
    }
    W.aWaitingBar = aWaitingBar
    W.WaitingBar = WaitingBar
})(window, document)
