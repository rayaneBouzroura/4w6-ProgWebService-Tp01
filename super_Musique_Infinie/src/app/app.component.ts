import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  //initialisation des variables
  title = 'super_Musique_Infinie';
  artist : string = "";
  Chansons : Chanson[] = [];
  Albums : Album[] = [];
  //similarArtist : string[] = [];//liste de string vide
  result = false;
  apiKey : string = "9a8a3facebbccaf363bb9fd68fa37abf";
  //Constructeur (pour les dependance seulement)
  constructor(public http : HttpClient) {
    let i : number = 0;
    i++;
  }

  async searchArtist(): Promise<void>{
    let nomArtiste = "2pac";
    console.log("je suis ici");
    //let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+nomArtiste+"r&api_key="+this.apiKey));
    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=2pac&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
    let bol : boolean = false;
  }
  async searchAlbum(): Promise<void>{
    let nomArtiste = "2pac";
    let constructeurDeRequete = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +nomArtiste+"&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json";
    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="   +nomArtiste+"&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));   
  }
  newSearch():void{
    //vider la liste hehehehehehehe
    
    //this.similarArtist.splice(0);
    this.result = false;
  }

  


}
//Classe Album
class Album {
  constructor(public titre: string, public artiste: string, public nbrEcoute : number , public) {}
}
//Classe chanson
class Chanson {
  constructor(public titre: string, public duree: number) {}
}
