import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [ './home-page.component.css' ]
})
export class HomePageComponent  {
  gesture:String = "";
  playing:boolean = false;
  double:boolean = false;
  moves:string[] = ["Rock", "Paper", "Scissors"];
  playerMove:string = "";
  computerMove:string = "";
  result:string = "";
  scores:number[] = [0, 0];
  
  constructor() {}

  ngOnInit(): void {}

  prediction(event:PredictionEvent) {
    this.gesture = event.getPrediction();
    if (this.gesture == "Two Open Hands") {
      this.playing = true;
    }
    if (this.gesture == "Two Closed Hands") {
      this.reset();
    }
    if (this.gesture == "Closed Hand" && this.playing) {
      this.playerMove = "Rock";
      this.play()
    }
    if (this.gesture == "Open Hand" && this.playing) {
      this.playerMove = "Paper";
      this.play();
    }
    if (this.gesture == "Hand Pointing" && this.playing) {
      this.playerMove = "Scissors";
      this.play();
    }
    if (this.gesture == "One Open One Closed" && this.playing) {
      this.double = true;
      this.playerMove = "Rock + Paper";
      this.play();
    }
    if (this.gesture == "One Open One Pointing" && this.playing) {
      this.double = true;
      this.playerMove = "Paper + Scissors";
      this.play();
    }
    if (this.gesture == "One Closed One Pointing" && this.playing) {
      this.double = true;
      this.playerMove = "Rock + Scissors";
      this.play();
    }
  }

  play() {
    if (this.double) {
      this.computerMove = this.generateComputerDouble();
    }
    else {
      this.computerMove = this.generateComputerMove();
    }
    if (this.playerMove == this.computerMove) {
      this.result = "Tie";
    }
    else if (this.playerMove == "Rock" && this.computerMove == "Scissors" ||
             this.playerMove == "Paper" && this.computerMove == "Rock" ||
             this.playerMove == "Scissors" && this.computerMove == "Paper" ||
             this.playerMove == "Rock + Paper" && this.computerMove == "Paper + Scissors" ||
             this.playerMove == "Paper + Scissors" && this.computerMove == "Rock + Scissors" ||
             this.playerMove == "Rock + Scissors" && this.computerMove == "Rock + Paper") {
              
              this.result = "You Won";
              this.scores[0]++;
             }
    else {
      this.result = "You Lost";
      this.scores[1]++;
    }
    this.playing = false;
    this.double = false;
  }

  generateComputerMove() {
    let random = Math.floor(Math.random() * this.moves.length);
    return this.moves[random];
  }

  generateComputerDouble() {
    let uniqueMoves = ["Rock", "Paper", "Scissors"];
    let index = Math.floor(Math.random() * uniqueMoves.length);
    let move1 = uniqueMoves[index];
    uniqueMoves.splice(index, 1);
    let move2 = uniqueMoves[Math.floor(Math.random() * uniqueMoves.length)];
    let doubleMoves = move1 + " + " + move2;

    if (doubleMoves == "Paper + Rock") {doubleMoves = "Rock + Paper"}
    if (doubleMoves == "Scissors + Rock") {doubleMoves = "Rock + Scissors"}
    if (doubleMoves == "Scissors + Paper") {doubleMoves = "Paper + Scissors"}
    return doubleMoves;
  }

  reset() {
    this.playing = false;
    this.double = false;
    this.playerMove = "";
    this.computerMove = "";
    this.result = "";
    this.scores = [0, 0];
  }

  changeImage(move:string) {
    let imgSrc = "../assets/";
    if (move == "") {imgSrc += "blank.png"}
    if (move == "Rock") {imgSrc += "rock.png"}
    if (move == "Paper") {imgSrc += "paper.png"}
    if (move == "Scissors") {imgSrc += "scissors.png"}
    if (move == "Rock + Paper") {imgSrc += "rockpaper.png"}
    if (move == "Paper + Scissors") {imgSrc += "paperscissors.png"}
    if (move == "Rock + Scissors") {imgSrc += "rockscissors.png"}
    return imgSrc;
  }
}
