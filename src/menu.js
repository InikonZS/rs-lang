const Base = require('./base.js');
const Button = require('./button.js');
const Card = require('./card.js');



class Menu{
  constructor (parentNode, targetNode, base){
    //this.currentBase = new Base();
    let drawCards = (targetNode, base, click)=> {
      this.currentBase = base;
      targetNode.innerHTML="";
      base.words.forEach((it)=>{
        new Card(targetNode, it, click);
      });  
    }

    this.main = new Button (parentNode, '', 'main', ()=>{
      targetNode.innerHTML="";
      this.currentBase = base.getAnyFromCategory();
      this.currentBase.words.forEach((it)=>{
        new Card(targetNode, it, ()=>{
          drawCards(targetNode, base.selectCategory(it.category));
        }); 
      });
    });

    this.categories = [];
    base.getCategories().forEach((it) => {
      let el = new Button (parentNode, '', it, ()=>{
        drawCards(targetNode, base.selectCategory(it));
        console.log(this.currentBase);
      });
      this.categories.push(el);
    });

    this.random = new Button (parentNode, '', 'random', ()=>{
      drawCards(targetNode, base.getRandomized().getFirstN(8));
    });

    this.diffucult = new Button (parentNode, '', 'difficult', ()=>{
      targetNode.innerHTML="";
      base.getRandomized().getFirstN(8).words.forEach((jt)=>{
        new Card(targetNode, jt) 
      });
    });

    this.statistic = new Button (parentNode, '', 'statistic', ()=>{
    });

  }
}

module.exports = Menu;