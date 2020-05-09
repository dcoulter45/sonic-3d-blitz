var no1 = document.getElementById('no1');
var no2 = document.getElementById('no2');
var no3 = document.getElementById('no3');


var ringCounter = {

  rings: 20,

  init(rings){
    if(rings) this.rings = rings;
    else this.rings = 0;

    this.updateUI();
  },

  increment: function(){

    this.rings ++;
    this.updateUI();
  },

  decrement: function(){

    this.rings = 0;

    this.updateUI();
  },

  updateUI: function(){

    if(this.rings < 10){

      no1.style.opacity = '0';
      no2.style.opacity = '0';
      no3.style.backgroundPosition = '-' + (this.rings*8) + 'px';
    }
    else if(this.rings >= 10){

      no1.style.opacity = '0';
      no2.style.opacity = '1';

      let digits = (""+this.rings).split("");

      no3.style.backgroundPosition = '-' + (digits[1]*8) + 'px';

      no2.style.backgroundPosition = '-' + (digits[0]*8) + 'px';
    }
    else if(this.rings >=100){

      no1.style.opacity = '1';
      no2.style.opacity = '1';

      let digits = (""+this.rings).split("");

      no3.style.backgroundPosition = '-' + (digits[2]*8) + 'px';
      no2.style.backgroundPosition = '-' + (digits[1]*8) + 'px';
      no1.style.backgroundPosition = '-' + (digits[0]*8) + 'px';

      no1.style.opacity = "1";
    }
  }
}
