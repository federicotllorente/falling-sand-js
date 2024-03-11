const LOOP_INTERVAL = 1000

const VIEWPORT_MARGIN = 20
const GRID_COLS = 50
const GRID_ROWS = GRID_COLS

const CELL_SIZE = window.innerHeight < window.innerWidth
  ? (window.innerHeight - VIEWPORT_MARGIN) / GRID_ROWS
  : (window.innerWidth - VIEWPORT_MARGIN) / GRID_COLS

let grid = []
let int, canvas

function setup() {
  const app = document.getElementById('app')
  canvas = document.createElement('canvas')
  canvas.width = GRID_ROWS * CELL_SIZE
  canvas.height = GRID_COLS * CELL_SIZE
  app.appendChild(canvas)

  grid = new Array(GRID_COLS)
  for (let i = 0; i < GRID_COLS; i++) {
    grid[i] = new Array(GRID_ROWS)

    for (let j = 0; j < GRID_ROWS; j++) {
      grid[i][j] = 0
    }
  }

  grid[10][15] = 1
}

function loop() {
  const ctx = canvas.getContext('2d')
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j]
      ctx.strokeStyle = 'rgb(255, 255, 255)'
      ctx.lineWidth = 1
      ctx.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      
      ctx.fillStyle = `rgb(${cell * 255}, ${cell * 255}, ${cell * 255})`
      ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }
  }
}

setup()
int = setInterval(loop, LOOP_INTERVAL)
