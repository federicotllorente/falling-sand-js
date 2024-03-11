const LOOP_INTERVAL = 50

const GRID_COLS = 40
const GRID_ROWS = GRID_COLS

const CELL_SIZE = window.innerHeight < window.innerWidth
  ? (window.innerHeight - 16) / GRID_ROWS
  : (window.innerWidth - 16) / GRID_COLS

let grid = []
let int, canvas

function setup() {}

function loop() {}

setup()
int = setInterval(loop, LOOP_INTERVAL)
