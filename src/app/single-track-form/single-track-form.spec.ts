import { TestBed } from '@angular/core/testing';

import { SingleTrackForm } from './single-track-form';

describe('SingleTrackForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTrackForm],
    }).compileComponents();
  });

  it('creates the component', () => {
    const { componentInstance } = TestBed.createComponent(SingleTrackForm);
    expect(componentInstance).toBeTruthy();
  });

  it('copies the artist into the album', () => {
    const { componentInstance } = TestBed.createComponent(SingleTrackForm);
    componentInstance.model.artist = 'Radiohead';

    componentInstance.copyArtistToAlbum();

    expect(componentInstance.model.album).toBe('Radiohead');
  });

  it('copies the album into the title', () => {
    const { componentInstance } = TestBed.createComponent(SingleTrackForm);
    componentInstance.model.album = 'In Rainbows';

    componentInstance.copyAlbumToTitle();

    expect(componentInstance.model.title).toBe('In Rainbows');
  });

  it('clears the three fields', () => {
    const { componentInstance } = TestBed.createComponent(SingleTrackForm);
    componentInstance.model.artist = 'Radiohead';
    componentInstance.model.album = 'In Rainbows';
    componentInstance.model.title = 'Nude';

    componentInstance.clear();

    expect(componentInstance.model.artist).toBe('');
    expect(componentInstance.model.album).toBe('');
    expect(componentInstance.model.title).toBe('');
  });
});
