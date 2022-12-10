function ConvertToVND(a){
    for(let i=0;i<=a.length;i++){
        let value = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a[i].dataset.value);
        a[i].innerHTML=value;
    }
}