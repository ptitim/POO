var devise = "€";

class Panier{
    constructor(){
        this.tabProduit = [];
    }
    addProduit(produit){
        produit.minusStock();
        this.maj();
    }
    removeProduit(){
        produit.plusStock();
    }
    maj(){
        for (var key in tab) {
            if (object.hasOwnProperty(key)) {
                let tmp = tab[key].getQuantity();
                
            }
        }
    }
    fillTableProduit(tab){
        for(var i = 0; i < tab.length; i++){
            var obj = tab[i];
            this.tabProduit.push(new Produit(obj.prix, obj.name,obj.stock));
        }
    }
}

class Produit{
    constructor(prix,name,stock){
        this.prix = prix;
        this.name = name;
        this.stockinit = stock;
        this.stock = stock;
    }
    minusStock(){
        this.stock--;
    }
    plusStock(){
        this.stock++;
    }
    getQuantity(){
        return this.stockinit - this.stock;
    }
}


class Chargeur{
    constructor(){
        this.data;
        this.mouha;
    }
    static truc(){
        return this;
    }
    writeData(reponse){
        this.data = reponse;
    }
    loadDataJSON(event){
        var recu = event.target.responseText;
        this.writeData(JSON.parse(event.target.responseText));
        panier.fillTableProduit(this.data.truc);
        affich.afgProduits(this.data.truc);
    }
    chargeJSON(url){
        ajax('GET',url,this);
    }
}

class Afg{
    constructor(){

    }
    afgProduits(tab){
        for(var i = 0; i < tab.length; i++){
            var tmp = tab[i];
            var contProduit= create('div',"col-md-2 column productbox");
            contProduit.dataset.produit = tmp.name; 
            contProduit.addEventListener('click',function(){});
            var img = create('img','img-responsive');
            img.src = tmp.source;
            var nomProduit = create('div',"producttitle");
            nomProduit.innerText = tmp.name;
            var quantiti = create('div','producttitle');
            quantiti.innerText = "Quantiti: "+tmp.stock;
            var prixProduit = create('div',"productprice");
            var pullright = create('div',"pull-right");
            var buttonAjout = create('button',"btn btn-danger btn-sm");
            buttonAjout.addEventListener('click',function(){});
            buttonAjout.innerText = "add";
            var prixTexte = create('div','pricetext');
            prixTexte.innerText = tmp.prix.toString() + devise;

            pullright.appendChild(buttonAjout);
            prixProduit.appendChild(pullright);
            contProduit.appendChild(img);
            contProduit.appendChild(nomProduit);
            contProduit.appendChild(quantiti);
            contProduit.appendChild(prixProduit);
            contProduit.appendChild(prixTexte);
            // ajout dans le body
            document.body.appendChild(contProduit);
        }  
    }
    afgPanier(){
        let contPanier = create('div',"col-md-5 coloumn");
        let total = create('p',"panier","total : ");
        this.spanTotal = create('span','afgtotal');
        let tva = create('span',"panier","dont tva");
        this.spanTva = create('span','afgtva');

        total.appendChild(this.spanTotal);
        contPanier.appendChild(total);
        tva.appendChild(rhis.spanTva);
        contPanier.appendChild(tva);
        document.body(contPanier);
    }
    majPanier(produit){
        if(produit.getQuantity == 0){
            
        }
    }
}

var charge;
var panier;
var affich;

function init(){
    var tabProduit = [];
    charge = new Chargeur();
    panier = new Panier();
    affich = new Afg();
    charge.chargeJSON('data.json');
}


function ajax(type,url,obj,send){

  var xhr = new XMLHttpRequest();
  var verif = true;

  if(type == "POST" && url!= ""){
    xhr.open(type,url,true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  }else if(type == "GET" && url != ""){
    xhr.open(type,url,true);
  }else {
    alert("Error ajax type is incorect");
    verif= false;
  }
  if(verif){
    xhr.onloadend = obj.loadDataJSON.bind(obj);
    xhr.send(send);
  }
  return verif;
}

function create(type, classe, texte){
    var tmp = document.createElement(type);
    tmp.className = classe;
    texte != null ? tmp.innerText = texte : null;
    return tmp;
}