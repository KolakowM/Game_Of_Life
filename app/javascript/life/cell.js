export default class Cell {
    static width = 10;
    static height = 10;
    static aliveColor = "#101bed"
    static unaliveColor = "#e51313"

    constructor(context, gridX, gridY, alive = false) {
        this.context = context;

        this.gridX = gridX;
        this.gridY = gridY;
        this.alive = alive;
    }

    draw() {
        this.context.fillStyle = this.alive ? Cell.aliveColor : Cell.unaliveColor;
        this.context.fillRect(
            this.gridX * Cell.width,
            this.gridY * Cell.height,
            Cell.width,
            Cell.height
        );
    }


    checkNeighbors(grid) {
        const neighbors = this.getNeighbors(grid);
        const aliveNeighbors = neighbors.filter((cell) => cell.alive).length;
        if (this.alive) {
            if (aliveNeighbors < 2 || aliveNeighbors > 3 ){
                this.alive = false;
            }
        } else {
            if (aliveNeighbors === 3) {
                this.alive = true;
            }
        }
    }

    getNeighbors(grid){
        const neighbors = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) {
                    continue;
                }
                const neighborX = this.gridX + x;
                const neighborY = this.gridY + y;
                if (
                    neighborX >= 0 &&
                    neighborX < grid.length &&
                    neighborY >= 0 &&
                    neighborY < grid[0].length
                ) {
                    neighbors.push(grid[neighborX][neighborY]);
                }
            }
        }
        return neighbors;
    }

}

