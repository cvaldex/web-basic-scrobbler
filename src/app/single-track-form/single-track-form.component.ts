import { Component } from '@angular/core';

import { SingleTrack } from '../single-track';

const scrobblerEndpoint = 'https://5ryd0tcand.execute-api.us-east-1.amazonaws.com/production/post-lastfm-scrobbles';

@Component({
  selector: 'app-single-track-form',
  templateUrl: './single-track-form.component.html',
  styleUrls: ['./single-track-form.component.css']
})
export class SingleTrackFormComponent {

  model = new SingleTrack("", "", "", 420);
  scrobbleResponse = {
      "accepted": "0",
      "ignored": "0",
      "status": "",
      "message": ""
  }

  submitted = false;

  onSubmit() { this.submitted = true;}

  async scrobbleTrack() {
    console.log("Scrobbling request received");
    
    var scrobble = {
      "scrobbles":{
        "artist": this.model.artist,
        "album": this.model.album,
        "tracks":[{"title": this.model.title , "duration": this.model.duration}]
      }
    }
    
    this.scrobbleResponse = await this.postScrobble(scrobble);
    this.submitted = true;
  }

  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
  
  async postScrobble(data: any) {
    console.log(data);

    var response = await fetch(scrobblerEndpoint, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    var jsonData = await response.json();

    return jsonData;
  }
}
