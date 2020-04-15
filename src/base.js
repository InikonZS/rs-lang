class Base {
  constructor() {
    this.words = [];
  }

  pushUnuq(rec) {
    if (!this.contains(rec)) {
      this.words.push(rec);
    }
  }

  addFromBaseData(baseData) {
    for (let i = 1; i < baseData.length; i++) {
      for (let j = 0; j < baseData[i].length; j++) {
        const rec = makeRecord(
          baseData[0][i - 1],
          baseData[i][j].word,
          baseData[i][j].translation,
          baseData[i][j].image,
          baseData[i][j].audioSrc,
        );
        this.words.push(rec);
      }
    }
  }

  // chainable
  selectCategory(category) {
    const res = new Base();
    res.words = this.words.filter((it) => it.category == category);
    return res;
  }

  clone() {
    const res = new Base();
    res.words = this.words.concat([]);
    return res;
  }

  getRandomized() {
    const res = new Base();
    res.words = this.words.concat([]);
    res.words.sort(() => Math.random() * 2 - 1);
    return res;
  }

  getFirstN(n) {
    const res = new Base();
    for (let i = 0; i < n; i++) {
      res.words.push(this.words[i]);
    }
    return res;
  }

  getAnyFromCategory() {
    const res = new Base();
    const cat = this.getCategories();
    cat.forEach((it) => {
      res.words.push(this.selectCategory(it).getRandomized().getFirstN(1).words[0]);
    });
    return res;
  }

  // not chainable
  contains(rec) {
    const res = this.words.filter((it) => it.hash == rec.hash);
    return res.length;
  }

  getCategories() {
    let res = this.words.map((it) => it.category);
    res.sort();
    res = res.filter((it, i, arr) => (it != arr[i - 1]) && it);
    return res;
  }
}


function makeRecord(category, word, translation, imageSrc, audioSrc) {
  const imageSrcV = imageSrc || `./assets/images/${word}.jpg`;
  const audioSrcV = audioSrc || `./assets/audio/${word}.mp3`;
  const obj = {};
  obj.hash = `${category} ${word} ${translation}`;
  obj.word = word;
  obj.category = category;
  obj.translation = translation;
  obj.imageSrc = imageSrcV;
  obj.audioSrc = audioSrcV;
  obj.statUp = 0;
  obj.statDown = 0;
  return obj;
}

module.exports = Base;
