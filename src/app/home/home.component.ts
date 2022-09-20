import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = "This is a home page";
  heros = [
    "john",
    "johny liverrrr",
    "dorby nestona",
    "popayester margen",
    "boby deol",
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
