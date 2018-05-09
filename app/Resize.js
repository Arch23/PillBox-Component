HTMLInputElement.prototype.resize = function(){
    this.addEventListener('input',e => {
        if(this.value.length > 5){
            this.size = this.value.length;
        }else{
            this.size = 5;
        }
    });
}