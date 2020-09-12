// flappingbird.
// --------------
// background gradient
const gradients = [
        ["#250e33", "#5a2a63", "#bb668b", "#e19595", "#eeb696"],
        ["#ffca9f", "#ff9357", "#ff631f", "#a87bce", "#542883"],
        ["#d5a306", "#02257e", "#8f7638", "#34717f", "#d2d480"],
        ["#e51d1d", "#ff6363", "#ff9f94", "#760024", "#ae2727"],
        ["#e38f8f", "#e34141", "#ffb374", "#a54c4c", "#ffeaea"],
        ["#f2d6e9", "#feae2e", "#ff483f", "#e606be", "#01a4fd"],
        ["#001040", "#083870", "#185088", "#306090", "#5878a0"],
        ["#55613f", "#9aaf73", "#739aaf", "#3b5764", "#ebe0c1"],
        ["#fcbb6d", "#d8737f", "#ab6c82", "#685d79", "#475c7a"],
        ["#030e10", "#1a3a4f", "#22536c", "#49809f", "#61acbd"],
        ["#40b7ff", "#8ac6fd", "#2c85ff", "#0b97ff", "#237fff"],
        ["#fce1e7", "#df94c0", "#aad741", "#c4b32d", "#c19664"],
        ["#5072be", "#69b3f2", "#b6b0db", "#322d57", "#08031b"],
        ["#fff0f0", "#ffe5e5", "#ffe7fd", "#eadefd", "#d0ebf9"],
        ["#4fc2cc", "#b8d2b5", "#e3b49a", "#ee806d", "#d04b59"],
        ["#fbf9ea", "#f6dddd", "#d1c0df", "#9f9cbd", "#787798"],
        ["#ffd0d0", "#000000", "#cdddff", "#ffdfca", "#ffdffe"],
        ["#73c2fb", "#9bddff", "#e5e4e2", "#fffafa", "#c3cde6"],
        ["#fff7db", "#fff794", "#ffc958", "#ffa613", "#46adf1"],
        ["#2e435d", "#9f7287", "#f39da3", "#76b8c0", "#a8dcf3"],
        ["#dfc172", "#d4d4d4", "#8bcacb", "#617177", "#1b1b1c"],
        ["#b29b8e", "#8b7a76", "#80ff95", "#56aeff", "#3c3434"],
        ["#0e0430", "#522f81", "#bbd6fd", "#8b8bdb", "#30255f"],
        ["#1f1e1d", "#8e5492", "#7c658a", "#7d7979", "#f7f4e6"],
        ["#2e2951", "#5a5ba7", "#50b7ea", "#ea5353", "#ffbdbd"],
        ["#acd6ee", "#88a7ee", "#eeb2f1", "#e21d5b", "#572a5a"],
        ["#386678", "#557292", "#7f7aa4", "#ab81a8", "#d18ba1"],
        ["#c277d6", "#ca87d6", "#8bf4f2", "#eada45", "#f4a223"],
        ["#0096fe", "#3badfc", "#59d4ff", "#9debff", "#d0f5fc"],
        ["#57aaf2", "#72c1f2", "#0d2601", "#2e5902", "#ebf222"],
        ["#b8ffb9", "#93eac4", "#75dbd8", "#6dc5df", "#7eaee3"],
        ["#73c2fb", "#87ceeb", "#ffd700", "#ffa001", "#f46a4e"],
        ["#9744be", "#793698", "#9ea9ed", "#ccccff", "#eae0ff"],
        ["#05c3e6", "#f307e2", "#feee05", "#fe9dc6", "#ffffff"],
        ["#000000", "#021145", "#050c6b", "#2a0092", "#3303a9"],
        ["#a470dd", "#8769c3", "#503d90", "#462085", "#260065"],
        ["#fffedf", "#fffac9", "#ffdfc9", "#fdd4c9", "#ffc6c6"],
        ["#1c341f", "#011f1c", "#080a2e", "#ff0000", "#3f0f3c"],
        ["#9e2a57", "#e45370", "#f8996b", "#fbc07a", "#f8d6b3"],
        ["#ba3a4d", "#be9442", "#652548", "#5c91be", "#253e50"],
    ],

    ENTITY = {
        TYPES: {
            DYNAMIC: "DYNAMIC",
            KINEMATIC: "KINEMATIC"
        }
    },

    X = window.innerWidth,
    Y = window.innerHeight

function cramp (num, min, max) {
	if (num < min) {
		return min
	} else if (num > max) {
		return max
	}
	return num
}
function random(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min))
}
function cos(angle) {
    return Math.cos(deg_to_rad(angle))
}
function sin(angle) {
    return Math.sin(deg_to_rad(angle))
}
function deg_to_rad(angle) {
    return Math.PI / 180 * angle
}
function rad_to_deg(angle) {
    return 180 * angle / Math.PI
}
function distance(pointI, pointII) {
    return Math.sqrt(Math.pow(pointII.x - pointI.x, 2) + Math.pow(pointII.y - pointI.y, 2))
}
function poinInCircle(pointI, pointII, radius) {
    return distance(pointI, pointII) < radius
}
function lineInCircle(pointI, pointII, pointIII, radius) {
	var i = distance(pointI, pointIII)
	var ii = distance(pointI, pointIII)
	var iii = distance(pointI, pointII)
	
	if (radius > i || radius > ii)
		return true
	
	var angle1 = Math.atan2( pointII.x - pointI.x, pointII.y - pointI.y ) - Math.atan2(pointIII.x - pointI.x, pointIII.y - pointI.y )
	var angle2 = Math.atan2( pointI.x - pointII.x, pointI.y - pointII.y ) - Math.atan2(pointIII.x - pointII.x, pointIII.y - pointII.y ) 
	
	if (angle1 > Math.PI / 2 || angle2 > Math.PI / 2)
		return false
	
	var s = (i + ii + iii) / 2
	var a = Math.sqrt(s * (s - i) * (s - ii) * (s - iii))
	var h = 2 * (a / iii)
	
	if (h < radius) {
		return true
	} else {
		return false
	}
}

function Canvas(canvas_element, width, height) {
    var deviceRatio_ratio = window.devicePixelRatio
    canvas_element = document.querySelector(canvas_element)
    const context = canvas_element.getContext("2d")
    const backingRatio = ["webkitBackingStorePixelRatio", "mozBackingStorePixelRatio", "msBackingStorePixelRatio", "oBackingStorePixelRatio", "backingStorePixelRatio"].reduce(function (prev, curr) {
        return Object.prototype.hasOwnProperty.call(context, curr) ? context[curr] : 1
    })
    deviceRatio_ratio /= backingRatio
    canvas_element.style.width = width.toString().concat("px")
    canvas_element.style.height = height.toString().concat("px")
    canvas_element.width = Math.round(width * deviceRatio_ratio)
    canvas_element.height = Math.round(height * deviceRatio_ratio)
    context.setTransform(deviceRatio_ratio, 0, 0, deviceRatio_ratio, 0, 0)
    return context
}

CanvasRenderingContext2D.prototype.pill = function CanvasRenderingContext2Dpill(x, y, w, h, radius) {
    w < 2 * radius && (radius =
        w / 2)
    h < 2 * radius && (radius = h / 2)
    this.beginPath()
    this.moveTo(x + radius, y)
    this.arcTo(x + w, y, x + w, y + h, radius)
    this.arcTo(x + w, y + h, x, y + h, radius)
    this.arcTo(x, y + h, x, y, radius)
    this.arcTo(x, y, x + w, y, radius)
    this.closePath()
    return this
}

function changeTheme(color) {
    const shareButton = document.querySelector(".share")
    const notificationButton = document.querySelector(".notification")
    shareButton.style.background = color
    notificationButton.style.background = color
    const metas = document.getElementsByTagName("meta")
    for (const meta of metas) "theme-color" === meta.getAttribute("name") && meta.setAttribute("content", color), "msapplication-TileColor" === meta.getAttribute("name") && meta.setAttribute("content", color)
}

const audioContext = new AudioContext,
    gain = audioContext.createGain()

gain.connect(audioContext.destination)
gain.gain.value = 0.25

function sfx(frequency, duration = 100) {
    if (flappingbird.mute === 0) {
	    gain.gain.value = 0
    } else {
	    gain.gain.value = 0.25
    }
    const oscillator = audioContext.createOscillator()
    oscillator.connect(gain)
    oscillator.type = "sine"
    oscillator.frequency.value = frequency
    oscillator.start()
    return new Promise(function (resolve) {
        setTimeout(function () {
            oscillator.stop()
            resolve()
        }, duration)
    })
}

function v2(xjscomp0, yjscomp0) {
    this.x = xjscomp0
    this.y = yjscomp0
    this.get = function thisget() {
        return {
            x: this.x,
            y: this.y
        }
    }
    this.set = function thisset(x, y) {
        this.x = x
        this.y = y
    }
    this.reset = function thisreset() {
        this.y = 0
        this.x = 0
    }
    this.add = function thisadd(rhs) {
        this.x += rhs.x
        this.y += rhs.y
    }
    this.scale = function thisscale(scalar) {
        return {
            x: this.x / scalar,
            y: this.y / scalar
        }
    }
}

function Bird(paramsjscompointI_width) {
    this.debug = paramsjscompointI_width.debug
    this.type = ENTITY.TYPES.DYNAMIC
    this.image = paramsjscompointI_width.image
    this.width = paramsjscompointI_width.width
    this.height = paramsjscompointI_width.height
    this.radius = paramsjscompointI_width.radius
    this.angle = paramsjscompointI_width.angle
    this.position = paramsjscompointI_width.position
    this.velocity = paramsjscompointI_width.velocity
    this.acceleration = paramsjscompointI_width.acceleration
    this.force = new v2(0, 0)
    this.applyForce = function thisapplyForce(force) {
        this.force.add(force)
    }
    this.getForces = function thisgetForces() {
        return this.force.get()
    }
    this.clearForces = function thisclearForces() {
        this.force.reset()
    }
    this.update = function thisupdate() {
        if (this.lockAngle !== 1) {
	        this.angle += cramp(this.velocity.y / 60 / 360, -0.5 * Math.PI, 0.5 * Math.PI)
        }
        this.frame = this.animation.frames.shift()
        this.animation.frames.push(this.frame)
    }
    this.render = function thisrender() {
        const frame = this.frame,
            image = this.image,
            sprites = this.sprites,
            position = this.position,
            width =
            this.width,
            height = this.height,
            radius = this.radius,
            angle = this.angle
        context.save()
        context.beginPath()
        context.translate(position.x, position.y)
        context.rotate(angle)
        context.translate(-position.x, -position.y)
        context.moveTo(position.x, position.y)
        context.arc(position.x, position.y, radius * 2, 0, 2 * Math.PI)
        if (this.debug) {
	        context.strokeStyle = "#fff"
	        context.lineWidth = 1
	        context.lineTo(position.x + radius, position.y)
	        context.stroke()
        } else {
	        context.clip()
	        context.drawImage(image,
	            sprites[frame].x,
	            sprites[frame].y,
	            width,
	            height,
	            position.x - width / 2,
	            position.y - height / 2,
	            width,
	            height
	        )
        }
        context.closePath()
        context.restore()
    }
    this.sprites = []
    this.animation = {
        frames: [0, 1]
    }
    paramsjscompointI_width = this.width
    const heightjscomp0 = this.height,
        imagejscomp0 = this.image
    for (var w = 0; w < imagejscomp0.width; w += paramsjscompointI_width)
        for (var h = 0; h < imagejscomp0.height; h += heightjscomp0) this.sprites.push({
            x: w,
            y: h
        })
}

function Cloud(params) {
    this.debug = params.debug
    this.type = ENTITY.TYPES.KINEMATIC
    this.size = params.size
    this.displacement = params.displacement
    this.position = params.position
    this.globalAlpha = Math.random() * Math.random() * Math.random()
    this.update = function thisupdate() {
        const size = this.size,
            position = this.position,
            midpoint = size / 2
        position.add(this.displacement)
        if (position.x + size + midpoint < 0) {
	        position.x = X + midpoint
        }
        if (position.x - size + midpoint > X) {
	        position.x = -(size + midpoint)
        }
    }
    this.render = function thisrender() {
        const size = this.size,
            position = this.position,
            globalAlpha = this.globalAlpha,
            midpoint = size / 2
        context.save()
        context.fillStyle = "#fff"
        context.globalAlpha = globalAlpha
        context.beginPath()
        context.moveTo(position.x, position.y + size)
        context.lineTo(position.x + size, position.y + size)
        context.arc(position.x + size, position.y + midpoint, midpoint, .5 * Math.PI, 1.5 * Math.PI, true)
        context.arc(position.x + midpoint,
            position.y, midpoint, 0 * Math.PI, 1 * Math.PI, true)
        context.moveTo(position.x, position.y + size)
        context.arc(position.x, position.y + midpoint, midpoint, .5 * Math.PI, 1.5 * Math.PI, false)
        if (this.debug) {
	        context.globalAlpha = 1
	        context.strokeStyle = "rgba(255, 255, 255, 0.75)"
	        context.stroke()
        } else {
	        context.fill()
        }
        context.closePath()
        context.restore()
    }
}

function Tree(params) {
    this.debug = params.debug
    this.type = ENTITY.TYPES.KINEMATIC
    this.position = params.position
    this.displacement = params.displacement
    this.angle = params.angle
    this.length = (Y - Math.pow(this.depth, 2)) / Math.pow(this.depth, 2) * Math.random() + 1
    this.color1 = "hsl(" + random(0, 360) + ", 80%, 90%)"
    this.color2 = "hsl(" + random(0, 360) + ", 80%, 90%)"
    this.depth = 5
    this.reset = function thisreset() {
        this.length = (Y - Math.pow(this.depth, 2)) / Math.pow(this.depth, 2) * Math.random() + 1
        this.color1 = "hsl(" + random(0, 360) + ", 80%, 90%)"
        this.color2 = "hsl(" + random(0, 360) + ", 80%, 90%)"
    }
    this.update = function thisupdate() {
        const displacement = this.displacement,
            position = this.position,
            midpoint = this.depth * this.depth * 2
        position.add(displacement)
        if (position.x + midpoint < 0 && displacement.x < 0) {
	        position.x = X + midpoint
	        flappingbird.score++
	        this.reset()
        }
        if (position.x > X - midpoint && 0 < displacement.x) {
	        position.x = -midpoint
	        flappingbird.score++
	        this.reset()
        }
    }
    this.render = function thisrender() {
        const bird = flappingbird.bird
        const howFast = deg_to_rad(200)
        const basedepth = this.depth
        function branch(x, y, angle, depth, length, color) {
            if (depth) {
                const x2 = x + cos(angle) * depth * length,
					  y2 = y + sin(angle) * depth * length;
				{
                    var x2jscomp0 = x2,
                        y2jscomp0 = y2
                    
                    var xjscomp0 = x,
	                    yjscomp0 = y
                    
                    context.strokeStyle = color
                    context.lineWidth = 1.5 * depth
                    
                    const i = {
	                    x: xjscomp0,
	                    y: yjscomp0
                    }
                    const ii = {
	                    x: x2jscomp0,
	                    y: y2jscomp0
                    }
                    const {
                        radius: r,
                        position: iii
                    } = bird
					
					if (basedepth === depth) {
						if (bird.isInCollision === 2) {
							// isSpinning.
							if (bird.turnAngle > bird.targetAngle) {
								bird.angle = bird.savedAngle
								bird.isInCollision = 0
								bird.lockAngle = 0
								flappingbird.score++
							} else {
								bird.turnAngle += howFast
								bird.angle = deg_to_rad(bird.turnAngle)
							}
						} else if (bird.isInCollision === 1) {
							// setOffSpinning.
							bird.savedAngle = bird.angle
							bird.targetAngle = bird.savedAngle + 360
							bird.turnAngle = rad_to_deg(bird.angle)
							bird.lockAngle = 1
							bird.isInCollision = 2
						} else if (lineInCircle(i,ii, iii, r) && flappingbird.state == 1) {
							// isColliding.
							bird.isInCollision = 1
						}
					}
                    
                    const isColliding = poinInCircle(i, iii, r)

                    if (debug) {
	                    context.lineWidth = 1
	                    context.save()
	                    context.beginPath()
	                    context.strokeStyle = isColliding ? "rgba(0, 255, 0, 1)" : "rgba(0, 0, 255, 1)"
	                    context.arc(x2jscomp0, y2jscomp0, 2, 2 * Math.PI, 0 * Math.PI)
	                    context.stroke()
	                    context.closePath()
	                    context.restore()
                    }

                    if (isColliding) {
	                    flappingbird.press = false
	                    flappingbird.state = 2
                    }
                    context.beginPath()
                    context.moveTo(x, y)
                    context.lineTo(x2jscomp0, y2jscomp0)
                    context.closePath()
                    context.stroke()
                }

                branch(x2, y2, angle - random(20, 20), depth - 1, length, color)
                branch(x2, y2, angle + random(20, 20), depth - 1, length, color)
            }
        }

        const debug = this.debug,
            length = this.length,
            position = this.position,
            depthjscomp0 = this.depth
        if (length > 5) {
	        branch(position.x, Y, -90, depthjscomp0, length, this.color1)
        }
        if ((Y - Math.pow(this.depth, 2)) / Math.pow(this.depth, 2) + 1 - length > 5) {
	        branch(position.x, 0, -270, depthjscomp0, (Y - Math.pow(this.depth, 2)) / Math.pow(this.depth, 2) + 1 - length, this.color2)
        }
    }
}

function Moon(params) {
    this.debug = params.debug
    this.type = ENTITY.TYPES.KINEMATIC
    this.size = params.size
    this.position = params.position
    this.background = "#af2a34"
    this.globalAlpha = 0.75
    this.phase = 1
    this.update = function thisupdate() {
        this.phase -= 1E-4
        if (this.phase < 0) {
	        this.phase = 1
        }
    }
    this.render = function thisrender() {
        const debug = this.debug,
            position = this.position,
            size = this.size,
            phase = this.phase,
            globalAlpha = this.globalAlpha
        context.save()
        context.globalAlpha = globalAlpha
        context.fillStyle = "#fff"
        context.beginPath()
        context.arc(position.x + size / 2, position.y + size / 2, size / 2, 2 * Math.PI, 0 * Math.PI, true)
        context.fillStyle = "#fff"
        if (debug) {
	         context.globalAlpha = 1
	         context.strokeStyle = "#fff"
	         context.stroke()
         } else {
	         context.fill()
         }
        context.restore()
        context.beginPath()
        context.arc(position.x + (size / 2 - size * phase), position.y + size / 2, size / 2, 2 * Math.PI, 0 * Math.PI, false)
        context.fillStyle = flappingbird.background
        if (debug) {
	        context.globalAlpha = 1
	        context.strokeStyle = "#fff"
	        context.stroke()
        } else {
            context.fill()
        }
    }
}

function Star(params) {
    this.debug = params.debug
    this.type = ENTITY.TYPES.KINEMATIC
    this.radius = params.size
    this.position = params.position
    this.globalAlpha = Math.random() * Math.random() * Math.random()
    this.update = function thisupdate() {}
    this.render = function thisrender() {
        const position = this.position,
            radius = this.radius,
            debug = this.debug,
            globalAlpha = this.globalAlpha
        context.save()
        context.globalAlpha = globalAlpha
        context.fillStyle = "#fff"
        context.beginPath()
        context.moveTo(position.x, position.y)
        context.arc(position.x, position.y, radius, 0, 2 * Math.PI, true)
        if (debug) {
	        context.globalAlpha = 1
	        context.strokeStyle = "#fff"
	        context.stroke()
        } else {
	        context.fill()
        }
        context.closePath()
        context.restore()
    }
}

function Building(paramsjscomp6_x) {
    this.debug = paramsjscomp6_x.debug
    this.type = ENTITY.TYPES.KINEMATIC
    this.size = paramsjscomp6_x.size
    this.displacement = paramsjscomp6_x.displacement
    this.position = paramsjscomp6_x.position
    this.color = paramsjscomp6_x.color
    const sizejscomp0 = this.size,
        halfpointjscomp0 = sizejscomp0 / 2,
        midpointjscomp0 = 2 * sizejscomp0,
        quater = sizejscomp0 / 3
    this.vertices = [{
            x: 0,
            y: sizejscomp0
        }, {
            x: 0,
            y: midpointjscomp0
        }, {
            x: sizejscomp0,
            y: midpointjscomp0
        },
        {
            x: sizejscomp0,
            y: sizejscomp0
        }
    ]
    for (paramsjscomp6_x = sizejscomp0; 0 < paramsjscomp6_x; paramsjscomp6_x -= halfpointjscomp0) {
        let y = random(2, 3) * quater
        this.vertices.push({
            x: paramsjscomp6_x,
            y: y
        })
    }
    this.reset = function thisreset() {
        this.vertices = [{
            x: 0,
            y: sizejscomp0
        }, {
            x: 0,
            y: midpointjscomp0
        }, {
            x: sizejscomp0,
            y: midpointjscomp0
        }, {
            x: sizejscomp0,
            y: sizejscomp0
        }]
        for (let x = sizejscomp0; 0 < x; x -= midpointjscomp0) {
            let y = random(2,
                3) * quater
            this.vertices.push({
                x: x,
                y: y
            })
        }
    }
    this.update = function thisupdate() {
        const size = this.size,
            displacement = this.displacement,
            position = this.position,
            midpoint = size / 2
        position.add(displacement)
        if (position.x + size + midpoint < 0 && displacement.x < 0) {
	        position.x = X + midpoint
        }
        if (position.x - size + midpoint > X && displacement.x > 0) {
	        position.x = -(size + midpoint)
        }
    }
    this.render = function thisrender() {
        const position = this.position,
            vertices = this.vertices,
            color = this.color
        context.save()
        context.globalAlpha = 1
        context.fillStyle = color
        context.beginPath()
        context.moveTo(position.x + vertices[0].x, position.y + vertices[0].y)
        vertices.map(function (vertice) {
            context.lineTo(position.x + vertice.x, position.y + vertice.y)
        })
        context.lineTo(position.x + vertices[0].x, position.y + vertices[0].y)
        if (this.debug) {
	        context.globalAlpha = 1
	        context.strokeStyle = "#fff"
	        context.stroke()
        } else {
	        context.fill()
        }
        context.closePath()
        context.restore()
    }
}

function Forest(size, distance, offset) {
    this.trees = []
    for (let i = 0; i < size; i++) {
        const t = new Tree({
            debug: false,
            size: 100,
            position: new v2(i * distance + offset, 0),
            displacement: new v2(-1.5, 0)
        })
        t.reset()
        this.trees.push(t)
    }
    this.reset = function thisreset() {
        for (let i = 0; i < this.trees.length; i++) {
            let tree = this.trees[i]
            tree.reset()
            tree.position.x = i * distance + offset
        }
    }
    this.update = function thisupdate() {
        this.trees.map(t => t.update())
    }
    this.render = function thisrender() {
        this.trees.map(t => t.render())
    }
}

function Game(params) {
    this.debug = params.debug
    this.width = params.width
    this.height = params.height
    this.gravity = params.gravity
    this.state = this.mute = this.score = 0
    this.entities = []
    const shareButton = document.querySelector(".share")
    const notificationButton = document.querySelector(".notification")
    shareButton.style.display = "flex"
    notificationButton.style.display = "flex"
    const notificationOn = document.querySelector(".notificationOn")
    const notificationOff = document.querySelector(".notificationOff")
    if (this.mute === 1) {
	    this.mute = 0
	    notificationOn.style.display = "none"
	    notificationOff.style.display = "block"
    } else {
	    this.mute = 1
	    notificationOn.style.display = "block"
	    notificationOff.style.display = "none"
    }
    notificationButton.addEventListener("click", (event) => {
	    if (this.mute === 1) {
		    this.mute = 0
		    notificationOn.style.display = "none"
		    notificationOff.style.display = "block"
	    } else {
		    this.mute = 1
		    // move to global
		    sfx(250)
		    notificationOn.style.display = "block"
		    notificationOff.style.display = "none"
	    }
    })
    shareButton.addEventListener("click", function(){
	    if (navigator.share !== undefined) {
		    navigator.share({
			    title: document.title,
			    text: "Am playing flappingbird",
			    url: window.location.href
		    })
	    }
    })
    this.addEntity = function thisaddEntity(entity) {
        this.entities.push(entity)
        return entity
    }
    this.gradient = gradients[random(0, gradients.length - 1)]
    changeTheme(this.gradient[0])
    this.viewport = document.querySelector("#canvas")
    this.context = window.context = new Canvas("#canvas", this.width, this.height)
    this.update = function thisupdate() {
		const entities = this.entities,
			gravity = this.gravity,
			state = this.state
		if (this.press) {
			if (0 === state) {
				this.state = 1
				const shareButton = document.querySelector(".share")
				const notificationButton = document.querySelector(".notification")
				shareButton.style.display = "none"
				notificationButton.style.display = "none"
				// move to globals
				sfx(250, 100)
				.then(() => sfx(500, 200))
				
				const bird = new Bird({
					debug: false,
					width: 60.5,
					height: 54,
					radius: 25,
					angle: 0,
					image,
					position: new v2(X / 4, Y / 2),
					velocity: new v2(0, 0),
					acceleration: new v2(0, 0)
				}),
					forest = new Forest(2, X / 2, X)
				
				for (var ijscomp8_i = 0; 8 > ijscomp8_i; ijscomp8_i++) flappingbird.addEntity(new Building({
					debug: false,
					color: "hsl(" + random(0, 360) + ", 44%, 44%)",
					size: Y / 4,
					displacement: new v2(-.5, 0),
					position: new v2(random(0, X), Y - ((Y / 4) * 2))
				}))
				for (ijscomp8_i = 0; 6 > ijscomp8_i; ijscomp8_i++) flappingbird.addEntity(new Building({
					debug: false,
					color: "hsl(" + random(0, 360) + ", 75%, 84%)",
					size: Y / 8,
					displacement: new v2(-1, 0),
					position: new v2(random(0, X), Y - ((Y/8) * 2))
				}))
				
				this.forest = this.addEntity(forest)
				this.bird = this.addEntity(bird)
			} else if (1 === state) {
				this.bird.applyForce(new v2(0, -60))
			} else if (2 === state) {
				flappingbird.bird.position.y = Y / 2
				flappingbird.bird.velocity.reset()
				flappingbird.bird.angle = flappingbird.score = 0
				this.forest.reset()
				this.state = 1
				flappingbird.bird.isInCollision = 0
				flappingbird.bird.lockAngle = 0
				sfx(250, 100)
				.then(() => sfx(500, 200))
				this.gradient = gradients[random(0, gradients.length - 1)]
				changeTheme(this.gradient[0])
			}
		}
		// clean up
		if (!(1 < state)) {
			for (const entity of entities) entity.type === ENTITY.TYPES.DYNAMIC && (entity.applyForce(gravity), entity.applyForce(entity.acceleration), entity.velocity.add(entity.getForces()), entity.position.add(entity.velocity.scale(60))), entity.update(),
			entity.type === ENTITY.TYPES.DYNAMIC && entity.clearForces()
			1 === state && (this.bird.position.y + this.bird.radius > Y || 0 > this.bird.position.y - this.bird.radius) && (this.state = 2, this.press = false, sfx(250, 200).then(() => sfx(150, 250)))
		}
    }
    this.render = function thisrender() {
        const context = this.context,
            state = this.state,
            width = this.width,
            height = this.height,
            entities = this.entities
        
        const gradient = context.createLinearGradient(X / 2, Y / 3, X / 2, Y)
        this.gradient.map((h, i) => {
            gradient.addColorStop(1 / this.gradient.length * i, h)
        })
        context.fillStyle = this.background = gradient
        context.fillRect(0, 0, width, height)
        
        if (this.press) {
	        if (1 === state) {
		        this.bird.animation.frames.sort()
	        }
        }
        if (this.debug) {
            context.strokeStyle = "rgba(255, 255, 255, 0.5)"
            context.save()
            for (score_w = 0; score_w < this.width; score_w += 50)
                for (hjscomp0 = 0; hjscomp0 < this.height; hjscomp0 += 50) {
	                context.beginPath()
	                context.rect(score_w, hjscomp0, 50, 50)
	                context.stroke()
	                context.closePath()
		            context.restore()
	            }
		}
        
        for (var entityjscompointII_width of entities) {
	        entityjscompointII_width.render()
        }
        
        if (state === 0) {
	        const title = "404"
	        const isTouch = ("ontouchstart" in window)
		    context.font = "150px digit"
		    context.fillStyle = "#eee",
		    { width: entityjscompointII_width} = context.measureText(title)
	        context.fillText(title, (X - entityjscompointII_width) / 2, (Y + 150) / 2)
	        context.font = "50px digit"
	        context.fillText((isTouch ? "Tap" : "press space") + " to play", (X - entityjscompointII_width) / 2, (Y + 225) / 2)
        } else {
            var score_w = this.score
            context.font = "50px digit"
            var hjscomp0 = context.measureText(score_w).width
            context.pill(25, 25, hjscomp0, 50, 10)
            context.fillStyle = 2 === state ? "rgba(255,0,0,0.75)" : "rgba(255, 255, 255, 1)"
            context.fill()
            context.fillStyle = 2 === state ? "rgba(255, 255, 255, 1)" : "#ddd"
            context.fillText(score_w, 25, 68)
        }
    }
}

const canvas = document.querySelector("#canvas")
canvas.addEventListener("touchstart", function (event) {
    flappingbird && (flappingbird.press = true)
})

canvas.addEventListener("touchend", function (event) {
    flappingbird && (flappingbird.press = false)
})

document.addEventListener("keydown", function (event) {
    32 === event.keyCode && flappingbird && (flappingbird.press = true)
})

document.addEventListener("keyup", function (event) {
    32 === event.keyCode && flappingbird && (flappingbird.press = false)
})

window.onload = function () {
    const width = window.innerWidth,
        height = window.innerHeight,
        image = window.image = new Image
    image.src = "./spritesheet.png"
    image.onload = function imageonload() {
        function loop() {
            flappingbird.update()
            flappingbird.render()
            requestAnimationFrame(loop)
        }
        const flappingbird = window.flappingbird = new Game({
            debug: false,
            width: width,
            height: height,
            gravity: new v2(0, 10)
        })
        flappingbird.addEntity(new Moon({
            debug: false,
            size: Y / 3,
            position: new v2(X - (Y / 2), Y / 6),
            displacement: new v2(-.5, 0)
        }))
        for (var ijscompointI1_ijscompointI2_i = 0; 10 > ijscompointI1_ijscompointI2_i; ijscompointI1_ijscompointI2_i++) flappingbird.addEntity(new Cloud({
            debug: false,
            size: random(50, 150),
            position: new v2(random(0, X), random(0, Y / 2)),
            displacement: new v2(-.5, 0)
        }))
        for (ijscompointI1_ijscompointI2_i = 0; 15 > ijscompointI1_ijscompointI2_i; ijscompointI1_ijscompointI2_i++) flappingbird.addEntity(new Star({
            debug: false,
            size: random(5, 10),
            position: new v2(random(0, X), random(0, Y / 2))
        }))
        setTimeout(loop)
    }
}