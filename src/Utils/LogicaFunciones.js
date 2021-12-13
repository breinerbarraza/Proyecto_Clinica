function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
  
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }
  
  function calcularComisionFinal(array_, arreglo_de_referidos){
      for(let x in arreglo_de_referidos){
        if(arreglo_de_referidos[x].comision === ""){
          continue;
        }
        array_.push(arreglo_de_referidos[x].comision);
      }
      let total_comision_final = array_.join(',');
      total_comision_final = total_comision_final.split(',').map(Number);
      total_comision_final = total_comision_final.reduce((accumulator, curr) => accumulator + curr);
      return total_comision_final;
}

export{
    formatMoney,
    calcularComisionFinal
}