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

    class WaitingBar {
        constructor(tasks = [], color = 'lightblue', height = 4) {
            this.height = height
            this.tasks = tasks
            this.animateTime = this.calculateTime(this.tasks) || 4000
            this.color = color || this.getRandomColor()
            this.bar = this.createLoadingBar(this.color, this.height)
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
            const startTime = Date.now()
            while (tasks.length > 0) {
                this.next()
                if (tasks.length === 0) {
                    return Date.now() - startTime
                }
            }
        }
        animation(element) {
            element.animate([{
                    width: '0%'
                },
                {
                    width: '100%'
                }
            ], {
                duration: 4000,
                easing: "ease",
                iterations: Infinity
            })
        }
        getStyle(element) {
            element.style.position = 'absolute'
            element.style.left = 0 + 'px'
            element.style.top = 0 + 'px'
            element.style.width = 0 + '%'
            element.style.height = this.height + 'px'
            element.style.backgroundColor = this.color
            element.style.boxShadow = '0 2px 2px rgba(0,0,0,.2)'
            return element
        }
    }

    function aWaitingBar(tasks, color, height) {
        return new WaitingBar(tasks, color, height)
    }
    W.aWaitingBar = aWaitingBar
    W.WaitingBar = WaitingBar
})(window, document)
