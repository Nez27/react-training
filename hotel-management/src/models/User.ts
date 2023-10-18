export default class User {
  constructor(
    public id: string,
    public name: string,
    public identifiedCode: string,
    public address: string,
    public phone: string,
    public roomId: string
  ) {
    this.id = id;
    this.name = name;
    this.identifiedCode = identifiedCode;
    this.address = address;
    this.phone = phone;
    this.roomId = roomId;
  }
}
