export default class SongModel {
  public id: string;
  public name: string;
  public song: string;
  public thumbnail: string;
  public creator: string;

  private constructor(params: {
    id: string;
    name: string;
    song: string;
    thumbnail: string;
    creator: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.song = params.song;
    this.thumbnail = params.thumbnail;
    this.creator = params.creator;
  }
}