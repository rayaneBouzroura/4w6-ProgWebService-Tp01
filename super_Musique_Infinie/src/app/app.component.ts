import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //initialisation des variables
  title = 'super_Musique_Infinie';
  artist : string = "";
  Chansons : Chanson[] = [];
  Albums : Album[] = [];
  similarArtist : string[] = [];//liste de string vide
  result = false;
  apiKey : string = "e34ebf8561ba7c653a21d1d99a1a0070"

  constructor(public http : HttpClient) {

  }
  async searchArtist(): Promise<void>{
    this.result = true;
  }
  async searchAlbum(): Promise<void>{
  }
  newSearch():void{
    //vider la liste hehehehehehehe
    this.similarArtist.splice(0);
    this.result = false;
  }
}
//Classe Album
class Album {
  constructor(public titre: string, public artiste: string, public chansons: Chanson[]) {}
}
//Classe chanson
class Chanson {
  constructor(public titre: string, public duree: number) {}
}
