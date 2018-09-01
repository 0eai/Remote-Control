const c = require('../constants')

module.exports = function (socket, robot) {
  function moveMouse ({ x, y }) {
    const { x: X, y: Y } = robot.getMousePos()
    robot.moveMouse(X + x, Y + y)
  }

  function scrollMouse ({ x, y }) {
    y = y > 0 ? 1 : -1
    robot.scrollMouse(0, y)
  }

  socket.on(c.MOUSE_MOVE, ({ x, y, scroll }) => {
    if (!scroll) {
      moveMouse({ x, y })
      return
    }
    scrollMouse({ x, y })
  })

  socket.on(c.MOUSE_CLICK, ({ button, double }) => {
    robot.mouseClick(button, double)
  })

  socket.on(c.KEY_PRESS, action => {
    let alt = action.alt
    let ctrl = action.ctrl
    let shift = action.shift
    let command = action.command
    let key = action.key

    if (alt) robot.keyToggle('alt', 'down')
    if (ctrl) robot.keyToggle('control', 'down')
    if (shift) robot.keyToggle('shift', 'down')
    if (command) robot.keyToggle('command', 'down')

    if (key) {
      robot.keyTap(key)
    }

    if (alt) robot.keyToggle('alt', 'up')
    if (ctrl) robot.keyToggle('control', 'up')
    if (shift) robot.keyToggle('shift', 'up')
    if (command) robot.keyToggle('command', 'up')
    return false
  })

  socket.on(c.MOUSE_TOGGLE, ({ button, pressed }) => {
    //robot.mouseToggle(state, button)
  })
   socket.on('text', function(txt){
   console.log('text: ' + txt);
   robot.typeString(txt);
 });
 socket.on('single_key', function(key){
  console.log('single_key: ' + key );
  robot.keyTap(key);
});
}
