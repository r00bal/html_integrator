

class ErrorStore {
    constructor(){
     if(! ErrorStore.pandoraBox){
       this._errors = [];
       ErrorStore.pandoraBox = this;
     }
return ErrorStore.pandoraBox
   }

     add = (item) => {
     this._errors.push(item);
   }

   get = () => {
     return this._errors.map(e => e);
   }
}

const pandoraBox = new ErrorStore();
Object.freeze(pandoraBox);

export default pandoraBox;
