import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'super_Musique_Infinie';
  artist : string = "";
  similarArtist : string[] = [];//liste de string vide
  result = false;
  apiKey : string = "e34ebf8561ba7c653a21d1d99a1a0070"

  constructor(public http : HttpClient) {

  }
  async searchArtist(): Promise<void>{
    //oublie pas le route de l'api
    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+this.artist+"&api_key="+this.apiKey+"&format=json"))
    //log in la console
    console.log("------l'objet parent")
    console.log(x);
    console.log("------l'objet enfant array")
    console.log(x.similarartists);
    console.log("------premiere element de l'array")
    console.log(x.similarartists.artist[0]);
    console.log("------nom du premiere element de l'array")
    console.log(x.similarartists.artist[0].name);
    //push vers le tableau
    console.log("liste de tout les artistes")
    for(let artist of x.similarartists.artist){
      console.log(artist.name);
      this.similarArtist.push(artist.name);
    }

    this.result = true;

	// La requête HTTP devra être ajoutée ici

  }
  newSearch():void{
    //vider la liste hehehehehehehe
    this.similarArtist.splice(0);
    this.result = false;
  }
}
