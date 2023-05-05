import { Controller } from "@hotwired/stimulus"
import Cell from "../life/cell";

//Connects to data-controller="life"

export default class extends Controller {
  static targets = ["canvas"];
  start_button = null;
  connect() {
    this.canvas = this.canvasTarget;
    this.context = this.canvas.getContext("2d");
    this.wight = 144;
    this.height = 96;

    this.start_button = document.getElementById("start_button");

    this.running = false;

    this.mouseHandlers();
    this.grid = [];
    this.initGrid();
    this.draw();
  }
  draw(){
    this.animateGrid();
  }
  animateGrid = () => {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    if (this.running) {
      this.checkNeighbors();
    }
    for (let x = 0; x < this.wight; x++ ) {
      for (let y = 0; y < this.height; y++ ) {
        this.grid[x][y].draw();
      }
    }
    setTimeout(this.animateGrid, 100);
  };
  checkNeighbors(){
    for (let x = 0; x < this.wight; x++ ) {
      for (let y = 0; y < this.height; y++) {
        this.grid[x][y].checkNeighbors(this.grid);
      }
    }
  }


  mouseHandlers() {
    this.mousePressed = false;
    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
  }

  disconnectMouseHandlers() {
    this.mousePressed = false;
    this.canvas.removeEventListener("contextmenu", (event) => {
      enent.preventDefault();
    });
    this.canvas.removeEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.removeEventListener("mouseup", this.mouseUp.bind(this));
    this.canvas.removeEventListener("mousemove", this.mouseMove.bind(this));
  }

  initGrid() {
    for (let x = 0; x < this.wight; x++) {
      this.grid[x] = [];
      for (let y = 0; y < this.height; y++) {
        this.grid[x][y] = new Cell(this.context, x, y);
      }
    }
  }

  mouseDown(event) {
    this.mousePressed = true;
    this.clickLogic(event);
  }
  mouseUp(event) {
    this.mousePressed = false;
    this.clickLogic(event);
  }
  mouseMove(event) {
    if (this.mousePressed) {
      this.clickLogic(event);
    }
  }
  clickLogic(event) {
    const x = Math.floor(event.offsetX / Cell.width);
    const y = Math.floor(event.offsetY / Cell.height);
    this.toggleCellByButton(x, y, event.buttons);
  }
  toggleCellByButton(x, y, buttons){
    if (buttons === 1) {
      this.toggleCell(x, y, true);
    } else if (buttons === 2) {
      this.toggleCell(x, y, false);
    }
  }
  toggleCell(x, y, alive) {
    this.grid[x][y].alive = alive;
    this.sub.post({ grid: this.grid });
  }
  start(event) {
    this.running = ~this.running;
    this.toggleStartButtomText();
  }
  clear(event) {
    this.running = false;
    for (let x = 0; x < this.wight; x++ ) {
      for (let y = 0; y < this.height; y ++) {
        this.grid[x][y].alive = false;
      }
    }
    this.toggleStartButtomText();
  }

  random(event) {
    this.running = false;
    for (let x = 0; x < this.wight; x++ ) {
      for (let y = 0; y < this.height; y++ ) {
        this.grid[x][y].alive = Math.random() > 0.5;
      }
    }
    this.sub.post({ grid: this.grid });
    this.sub.buttonAction("start", false);
  }
  toggleStartButtomText(){
    if (this.running) {
      start_button.innerText = "Stop";
    }
    if (!this.running) {
      start_button.innerText = "Start";
    }

  }
}

