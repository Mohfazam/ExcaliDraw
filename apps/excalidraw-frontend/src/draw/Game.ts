import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type PencilPoint = { x: number; y: number };

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      points: PencilPoint[];
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private socket: WebSocket;
  private selectedTool : Tool = "circle";
  private currentPencilPoints: PencilPoint[]= [];

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  getMousePos(e: MouseEvent) {
  const rect = this.canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}


  destroy(){
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(Tool: "circle" | "pencil" | "rect"){
    this.selectedTool = Tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }



  mouseDownHandler = (e) => {

    if(this.selectedTool === "pencil"){
      this.currentPencilPoints = [];
      const {x, y} = this.getMousePos(e);
      this.currentPencilPoints.push({x, y});
    }
    this.clicked = true;

    this.startX = e.clientX;
    this.startY = e.clientY;
  }


  mouseMoveHandler = (e) => {
    if (this.clicked && this.selectedTool === "pencil") {
  const { x, y } = this.getMousePos(e);
  this.currentPencilPoints.push({ x, y });

  this.clearCanvas();  

  
  this.ctx.beginPath();
  this.ctx.moveTo(this.currentPencilPoints[0].x, this.currentPencilPoints[0].y);

  for (let i = 1; i < this.currentPencilPoints.length; i++) {
    const p = this.currentPencilPoints[i];
    this.ctx.lineTo(p.x, p.y);
  }

  this.ctx.stroke();
  this.ctx.closePath();

  return;
}


    if (this.clicked && (this.selectedTool === "rect" || this.selectedTool === "circle")) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255,255,255)";
      //@ts-ignore
      const selectedTool = this.selectedTool;

      if (selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const centerX = this.startX + width / 2;
        const centerY = this.startY + height / 2;
        const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }


  mouseUpHandler = (e) => {

    let shape: Shape | null = null;

    if(this.clicked && this.selectedTool === "pencil"){
       shape = {
        type: "pencil",
        points: this.currentPencilPoints
      };

      this.clicked = false;
      return;
    }

    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    //@ts-ignore
    const selectedTool = this.selectedTool;

    this.clicked = false;


    if (this.selectedTool === "rect") {
      shape = {
        //@ts-ignore
        type: "rect",
        x: this.startX,
        y: this.startY,
        height,
        width,
      };
    } else if(this.selectedTool === "circle"){

      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      shape= {
        //@ts-ignore
        type: "circle",
        radius: radius,
        centerX: this.startX + width/2,
        centerY: this.startY + height/2,
      };
    }

    if(!shape){
      return
    }

    this.existingShapes.push(shape);



    this.socket.send(
      JSON.stringify({
        type: "chat",
        roomId: this.roomId,
        message: JSON.stringify({
          shape,
        }),
      })
    );
  }


  

  

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }




   clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (const shape of this.existingShapes) {

    if (shape.type === "rect") {
    this.ctx.strokeStyle = "rgba(255,255,255)";
    this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }

    else if (shape.type === "circle") {
    this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
    }

    else if (shape.type === "pencil") {
    this.ctx.beginPath();
    this.ctx.moveTo(shape.points[0].x, shape.points[0].y);

    for (let p of shape.points.slice(1)) {
      this.ctx.lineTo(p.x, p.y);
    }

    this.ctx.stroke();
    this.ctx.closePath();
  }
}
    
  }
  
}
