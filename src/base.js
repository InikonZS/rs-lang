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
        loadFromStorage(rec);
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

  getSorted(comparator) {
    const res = new Base();
    res.words = this.words.concat([]);
    res.words.sort(comparator);
    return res;
  }

  getFiltered(comparator) {
    const res = new Base();
    res.words = this.words.concat([]);
    res.words = res.words.filter(comparator);
    return res;
  }

  getFirstN(n) {
    const res = new Base();
    let m = Math.min(n, this.words.length);
    for (let i = 0; i < m; i++) {
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

  saveChanges(rec){
    saveToStorage(rec);
  }
}


function makeRecord(category, word, translation, imageSrc, audioSrc) {
  const imageSrcV = imageSrc || `img/${word}.jpg`;
  const audioSrcV = audioSrc || `audio/${word}.mp3`;
  const obj = {};
  obj.hash = `${category} ${word} ${translation}`;
  obj.word = word;
  obj.category = category;
  obj.translation = translation;
  obj.imageSrc = imageSrcV;
  obj.audioSrc = audioSrcV;
  obj.statUp = 0;
  obj.statDown = 0;
  obj.getPercent = () => {
    let res = 0;
    if ((obj.statDown+obj.statUp)!==0){
      let rel = obj.statUp / (obj.statDown+obj.statUp);
      res = Math.trunc(rel*1000)/10;
    }
    return res;
  }
  return obj;
}

function makeStorageRecord(statUp, statDown){
  const obj = {};
  obj.statUp = statUp;
  obj.statDown = statDown;
  return obj;
}

function saveToStorage(rec){
  let item = JSON.stringify(makeStorageRecord(rec.statUp, rec.statDown));
  localStorage.setItem(rec.hash, item);
}

function loadFromStorage(rec){
  let ls = localStorage.getItem(rec.hash)
  if (ls!==null){
    let item = JSON.parse(ls);
    rec.statUp = item.statUp;
    rec.statDown = item.statDown;
  }
}

module.exports = Base;
