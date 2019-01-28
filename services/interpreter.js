const {exec} = require('./commander') 

let previous

module.exports = (packet) => {
    const {action, direction, fingers = 1, velocity = 1, distanceX=0, distanceY=0} = packet
    console.log(direction);
    
    if(action == 'SWIPE' && direction == 'UP' && fingers == 3) {
        if(previous != 'PRESS WIN D') {
            previous = 'PRESS WIN TAB'
            return exec('PRESS WIN TAB')
        }
        previous = null;
        return exec('PRESS WIN D')
    }
    if(action == 'SWIPE' && direction == 'DOWN' && fingers == 3) {
        if(previous != 'PRESS WIN TAB') {
            previous = 'PRESS WIN D'
            return exec('PRESS WIN D')
        }
        previous = null;
        return exec('PRESS ESCAPE')
    }
    if(action == 'SWIPE' && direction == 'LEFT' && fingers == 3) {
        return exec('PRESS WIN CTRL RIGHT')
    }
    if(action == 'SWIPE' && direction == 'RIGHT' && fingers == 3) {
        return exec('PRESS WIN CTRL LEFT')
    }
    if(action == 'SCROLL') {
        const scrollDirection = ['UP','DOWN'].includes(direction) ? 'VERTICAL' : 'HORIZONTAL'
        const magnitude = parseInt(Math.abs(Math.max(distanceX, distanceY)) * (['DOWN', 'LEFT'].includes(direction) ? -2 : 2))
        return exec(`SCROLL ${scrollDirection} ${magnitude}`)
    }
    if(action == 'MOVE') {
        const x = parseInt(distanceX) * (direction == 'UP' ? 1 : -1)
        const y = parseInt(distanceY) * (direction == 'LEFT' ? 1 : -1)
        return exec(`MOVE ${x} ${y}`)
    }
    if(action == 'CLICK' && fingers == 1) {
        return exec(`CLICK LEFT`)
    }
    if(action == 'CLICK' && fingers == 2) {
        return exec(`CLICK RIGHT`)
    }
    if(action == 'CLICK' && fingers == 3) {
        return exec(`CLICK MIDDLE`)
    }

};