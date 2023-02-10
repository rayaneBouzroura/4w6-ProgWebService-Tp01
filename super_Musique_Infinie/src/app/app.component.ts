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
  apiKey : string = "9a8a3facebbccaf363bb9fd68fa37abf";
  monterAlbum : boolean = false;
  //Constructeur (pour les dependance seulement)
  constructor(public http : HttpClient) {

  }
  //methode qui cherche les top albums
  async searchTopAlbum(nomArtist : String): Promise<void>{
    let constructeurDeRequeteAlbum = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+nomArtist+"&api_key="+this.apiKey+"&format=json";
    let topAlbumsResponse = await lastValueFrom(this.http.get<any>(constructeurDeRequeteAlbum));
    //initialize an empty array
    console.log(topAlbumsResponse);
    for (const album of topAlbumsResponse.topalbums.album) {
        //recuperer l'objet image qui a le tag extraLarge (meilleur resolution)
        //creation d'un pseudo objet image qui a deux attribut : size et #text present dans la reponse JSON
        const image = album.image.find((img: { size: string, "#text": string}) => img.size === 'extralarge');
        //recuperer l'adress de l'image si elle existe
        const imageUrl = image ? image["#text"] : '';
        //creation de l'objet album
        let albumCourant : Album = new Album(album.name, album.artist.name, album.playcount, imageUrl , []);
        //remplir l'album de chanson
        this.remplirChanson(albumCourant);
        this.Albums.push(albumCourant);

      }
      this.monterAlbum = true;
    ;
    console.log(await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&artist=Cher&album=Believe&format=json")));

  }
  //method qui recupere le nom
  viderAlbum():void{
    this.Albums = [];
    this.monterAlbum = false;
  }
  async remplirChanson(monAlbum : Album): Promise<void>{
    let constructeurDeRequeteMusic = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key="+this.apiKey+"&artist="+monAlbum.artiste+"&album="+monAlbum.titre+"&format=json";
    let reponse = await lastValueFrom(this.http.get<any>(constructeurDeRequeteMusic));
    let chansons = reponse.album.tracks.track;
    for (const objChansonCourante of chansons) {
      if (objChansonCourante != undefined){
        let chanson = new Chanson(objChansonCourante.name, objChansonCourante.duration);
        monAlbum.chansons.push(chanson);
        console.log("chansons "+ chanson.titre + " ajoute a l'album");
      }

  }





}
montrerChanson(displayedAlbum : Album){
  for(const chanson  of displayedAlbum.chansons){
    alert(chanson.titre);
  }
}
}
//////////CLASSES
//Classe Album
class Album {
  constructor(public titre: string,
              public artiste: string,
              public nbrEcoute : number ,
              public imageUrl :string ,
              public chansons : (Chanson[])) {}
}
//Classe chanson
class Chanson {
  constructor(public titre: string, public duree: number) {}
}
