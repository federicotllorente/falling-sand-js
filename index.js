const LOOP_INTERVAL = 50

const VIEWPORT_MARGIN = 20
const GRID_COLS = 100
const GRID_ROWS = GRID_COLS

const CELL_SIZE = window.innerHeight < window.innerWidth
  ? (window.innerHeight - VIEWPORT_MARGIN) / GRID_ROWS
  : (window.innerWidth - VIEWPORT_MARGIN) / GRID_COLS

const BRUSH_SIZE = 5
const DRAWING_PROB = 0.3

let grid = []
let int, canvas

function create2DArray(cols, rows) {
  let arr = new Array(cols)

  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows)

    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0
    }
  }

  return arr
}

function setup() {
  const app = document.getElementById('app')
  canvas = document.createElement('canvas')
  canvas.width = GRID_ROWS * CELL_SIZE
  canvas.height = GRID_COLS * CELL_SIZE
  app.appendChild(canvas)

  grid = create2DArray(GRID_COLS, GRID_ROWS)
}

function loop() {
  const ctx = canvas.getContext('2d')
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j]
      ctx.fillStyle = `rgb(${cell * 255}, ${cell * 255}, ${cell * 255})`
      ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }
  }

  let nextGrid = create2DArray(GRID_COLS, GRID_ROWS)
  for (let i = 0; i < nextGrid.length; i++) {
    for (let j = 0; j < nextGrid[i].length; j++) {
      const cell = grid[i][j]

      if (cell === 1) {
        let cellBelow = grid[i][j + 1]
        let cellBelowA, cellBelowB

        let dir = Math.random() < 0.5 ? 1 : -1

        if (i - dir >= 0 && i - dir <= GRID_COLS - 1) {
          cellBelowA = grid[i - dir]?.[j + 1]
        }

        if (i + dir >= 0 && i + dir <= GRID_COLS - 1) {
          cellBelowB = grid[i + dir]?.[j + 1]
        }

        if (cellBelow === 0) {
          nextGrid[i][j + 1] = 1
        } else if (cellBelowA === 0) {
          nextGrid[i - dir][j + 1] = 1
        } else if (cellBelowB === 0) {
          nextGrid[i + dir][j + 1] = 1
        } else {
          nextGrid[i][j] = 1
        }
      }
    }
  }
  grid = nextGrid
}

setup()
int = setInterval(loop, LOOP_INTERVAL)

let isPaused = false
let isMouseDown = false

document.addEventListener('mousedown', (event) => {
  if (isPaused) return
  if (event.button === 0) {
    isMouseDown = true
    drawCellFromMouseCoordinates(event)

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
  }
})

function handleMouseUp(_event) {
  if (isPaused) return
  isMouseDown = false
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mousemove', handleMouseMove)
}

function handleMouseMove(event) {
  if (!isMouseDown || isPaused) return
  drawCellFromMouseCoordinates(event)
}

function drawCellFromMouseCoordinates(event) {
  const rect = event.target.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  const cellXbase = Math.floor(mouseX / CELL_SIZE)
  const cellYbase = Math.floor(mouseY / CELL_SIZE)

  const extent = Math.floor(BRUSH_SIZE / 2)
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (Math.random() < DRAWING_PROB) {
        cellX = cellXbase + i
        cellY = cellYbase + j
  
        if (cellX >= 0 && cellX <= GRID_COLS - 1 && cellY >= 0 && cellY <= GRID_ROWS - 1) {
          grid[cellX][cellY] = 1
        }
      }
    }
  }
}

// Start/pause/resume searching when the spacebar is tapped
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    if (!isPaused) {
      clearInterval(int)
      console.log('PAUSED')
      isPaused = true
    } else {
      int = setInterval(loop, LOOP_INTERVAL)
      console.log('RESUMED')
      isPaused = false
    }
  }
})
