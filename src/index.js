class Fg {
  constructor() {
    this.x = 3;
  }

  ads(y) {
    const d = y + 3 + this.x;
    return d;
  }
}
const df = new Fg();

module.exports(df);
