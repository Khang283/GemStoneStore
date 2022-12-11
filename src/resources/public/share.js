function ConvertToVND(a){
    
    for(let i=0;i<a.length;i++){
        let price_value = a[i].dataset.value;
        let value = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price_value);
        a[i].innerHTML=value;
    }
}

// let price = document.querySelectorAll('.price_format');
// for (let i = 0; i < price.length; i++) {
//     let price_value=price[i].dataset.value;
//     console.log(price_value);
//     let value_new = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(price_value);
//     price[i].innerHTML = value_new;
// }