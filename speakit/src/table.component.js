const Control = require('./control.component.js');
const Button = require('./button.component.js');

class Table extends Control{
  constructor(parentNode, className, tableData, tableHead){
    super(parentNode, 'table', className);
    this.head = new Control (this.node, 'thead');
    this.body = new Control (this.node, 'tbody');
    this.addInteractiveHead(tableData, tableHead)
    this.refreshTable(tableData);
    this.headSortState = [];
    tableHead.forEach(()=>{
      this.headSortState.push('none');
    });
  }

  setSortState(index, tableHead){
    tableHead.forEach((it, i)=>{
      if (i!=index){
        this.headSortState[i]=('none');
        this.arrowList[i].node.style = 'transform: rotateZ(90deg);';
      }
    });
    if (index!=-1){
      switch(this.headSortState[index]){
        case 'none': this.headSortState[index]=('up'); break;
        case 'up': this.headSortState[index]=('down'); break;
        case 'down': this.headSortState[index]=('up'); break;
      }
      return this.headSortState[index];
    }  
    return 'none';
  }

  refreshTable(tableData){
    this.body.node.innerHTML='';
    tableData.forEach((it)=>{
      this.addRow(it);
    });  
  }

  addRow(tableRecord, head){
    let tag = head ? 'th': 'td';
    let parent = head ? this.head.node : this.body.node;
    let tr = new Control(parent, 'tr');
    Object.values(tableRecord).forEach((it)=>{
      new Control(tr.node, tag, '', it.toString());    
    });
  }

  addInteractiveHead(tableData, tableHead){
    this.arrowList = [];
    let head = true;
    let tag = head ? 'th': 'td';
    let parent = head ? this.head.node : this.body.node;
    let tr = new Control(parent, 'tr');
    let table = this;
    Object.values(tableHead).forEach((it, i)=>{
      let th = new Control(tr.node, tag, ''); 
      let button = new Button(th.node,'table_button', it.toString(), false, function(){
        let currentData = tableData.concat([]);
        let state = table.setSortState(i, tableHead);
        currentData.sort((a,b)=>{
          a_=Object.values(a)[i];
          b_=Object.values(b)[i];
          let res;
          if (state == 'up'){
            res = (+(b_<a_))*2-1;
            arrow.node.style = 'transform: rotateZ(0deg);';
          };
          if (state == 'down'){
            res = (+(b_>a_))*2-1;
            arrow.node.style = 'transform: rotateZ(180deg);';
          };
          return res;
        });
        table.refreshTable(currentData);
      });
      var arrow = new Control(button.node, 'div', 'table_sort arrow');  
      arrow.node.style = 'transform: rotateZ(90deg);';
      this.arrowList.push(arrow); 
    });
  }
}

module.exports = Table;