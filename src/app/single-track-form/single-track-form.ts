import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SingleTrack } from '../single-track';

const SCROBBLER_ENDPOINT =
  'https://5ryd0tcand.execute-api.us-east-1.amazonaws.com/production/post-lastfm-scrobbles';

/** Last.fm needs a track length; the form does not expose it, so send a sane default. */
const DEFAULT_DURATION = 420;

export interface ScrobbleResponse {
  accepted: string;
  ignored: string;
  status: string;
  message: string;
}

@Component({
  selector: 'app-single-track-form',
  imports: [FormsModule],
  templateUrl: './single-track-form.html',
  styleUrl: './single-track-form.css',
})
export class SingleTrackForm {
  readonly model = new SingleTrack('', '', '', DEFAULT_DURATION);

  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly response = signal<ScrobbleResponse>({
    accepted: '0',
    ignored: '0',
    status: '',
    message: '',
  });

  copyArtistToAlbum(): void {
    this.model.album = this.model.artist;
  }

  copyAlbumToTitle(): void {
    this.model.title = this.model.album;
  }

  clear(): void {
    this.model.artist = '';
    this.model.album = '';
    this.model.title = '';
  }

  edit(): void {
    this.submitted.set(false);
  }

  async scrobble(): Promise<void> {
    this.sending.set(true);

    const payload = {
      scrobbles: {
        albums: [
          {
            artist: this.model.artist,
            album: this.model.album,
            tracks: [{ title: this.model.title, duration: this.model.duration }],
          },
        ],
      },
    };

    try {
      const res = await fetch(SCROBBLER_ENDPOINT, {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as Partial<ScrobbleResponse>;
      this.response.set({
        accepted: String(data.accepted ?? '0'),
        ignored: String(data.ignored ?? '0'),
        status: data.status ?? (res.ok ? 'ok' : `HTTP ${res.status}`),
        message: data.message ?? '',
      });
    } catch (err) {
      this.response.set({
        accepted: '0',
        ignored: '0',
        status: 'error',
        message: err instanceof Error ? err.message : 'Request failed',
      });
    } finally {
      this.sending.set(false);
      this.submitted.set(true);
    }
  }
}
