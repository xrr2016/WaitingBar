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
    const options = {
            color : 'lightblue',
            height : 2,
            direction : 'foward',
            loacation : 'top',
            timingFunction : 'ease',
            shadow : true
          }
    class WaitingBar {
        constructor(tasks = [], options = options) {
            this.options = options
            if(this.options.color === 'random'){
              this.options.color = this.getRandomColor()
            }
            this.tasks = [...tasks]
            this.startTime = Date.now()
            this.animateTime = this.calculateTime(this.tasks) || 4000
            this.bar = this.createLoadingBar(this.options.color, this.options.height)
            this.animation(this.bar)
        }
        next() {
            const fn = this.tasks.shift()
            setTimeout(() => {
                fn && fn()
            }, 0)
        }
        createLoadingBar(color, height) {
            const bar = D.createElement('div')
            this.getStyle(bar)
            D.body.appendChild(bar)
            return bar
        }
        getRandomColor() {
            let color = "#",
                letters = '0123456789ABCDEF'
            for (let i = 0; i < 6; i++) {
                color += letters[Math.round(Math.random() * letters.length)]
            }
            return color
        }
        calculateTime(tasks) {
            while (tasks.length > 0) {
                this.next()
                if (tasks.length === 0) {
                    return Date.now() - this.startTime
                }
            }
        }
        animation(element) {
            element.animate([
                { width: '0%'},
                { width: '100%' }
            ], {
                duration: 4000,
                easing: this.options.timingFunction,
                direction :this.options.direction,
                iterations: Infinity
            })
        }
        getStyle(element) {
            element.style.position = 'absolute'
            this.options.loacation === 'top' ? (element.style.top = 0 + 'px'):(element.style.bottom = 0+'px')
            element.style.left = 0 + 'px'
            element.style.width = 0 + '%'
            element.style.height = this.options.height + 'px'
            element.style.backgroundColor = this.options.color
            element.style.boxShadow = this.options.shadow ? '0 2px 2px rgba(0,0,0,.2)' : null
            return element
        }
    }
    function aWaitingBar(tasks, options) {
        return new WaitingBar(tasks,options)
    }
    W.aWaitingBar = aWaitingBar
    W.WaitingBar = WaitingBar
})(window, document)
