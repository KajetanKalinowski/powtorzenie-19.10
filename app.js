async function getItems(){
    const data = await fetch("http://localhost/kkwordpress/wp-json/wc/v3/products",{
        method: "GET",
        headers:{
            Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`
        }
    })
    const json = await data.json()
    console.log(json)
    const body = document.getElementById("body")
    body.innerHTML=" "
    for(let i in json){
    const div = document.createElement("div")
    div.classList.add("divs")
    const h1 = document.createElement("h1")
    const h2 = document.createElement("h2")
    const h3 = document.createElement("h3")
    const h4 = document.createElement("h4")
    h1.innerHTML=json[i].name
    h2.innerHTML=json[i].price+" zł"
    h3.innerHTML="Sprzedano "+json[i].total_sales+" razy!"
    const miejsce = document.createElement("div")
    miejsce.id="wow"
    const wzrost = document.createElement("button")
    wzrost.innerHTML="+10zł"
    const minus = document.createElement("button")
    minus.innerHTML="-10zł"
    const zatw = document.createElement("button")
    zatw.innerHTML="ZATWIERDZ"
    

    wzrost.addEventListener('click',()=>{
        h4.innerHTML="Czy zwiększyć cenę o 10 zł?"
        zatw.addEventListener('click',()=>{
            wzrostCen(json[i].id,json[i].regular_price)        
        })
        
    })
    if(json[i].price>10){
    minus.addEventListener('click',()=>{
        h4.innerHTML="Czy zmiejszyć cenę o 10 zł?"
        zatw.addEventListener('click',()=>{
        minusCen(json[i].id,json[i].regular_price)
        })
    })
}else{
    
    minus.style.color = "red"
    minus.style.backgroundColor = "rgb(39, 39, 39)"
}
zatw.addEventListener('click',()=>{

        
})

    div.appendChild(h1)
    div.appendChild(h2)
    div.appendChild(h3)
    div.appendChild(h4)
    div.appendChild(miejsce)
    div.appendChild(wzrost)
    div.appendChild(minus)
    div.appendChild(zatw)
    body.appendChild(div)


    }

}
async function add(){
    const nazwa = document.getElementById("nazwa").value
    const cena = document.getElementById("cena").value
    const data = await fetch(`http://localhost/kkwordpress/wp-json/wc/v3/products/?name=${nazwa}&regular_price=${cena}`,{
        method:"POST",
        headers:{
            Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`,
        }
    })
    const json = await data.json()
    console.log(json+" dodano")
    window.alert("Dodano: "+nazwa)
    getItems()
}
async function wzrostCen(id,regular_price){
    const data = await fetch(`http://localhost/kkwordpress/wp-json/wc/v3/products/${id}?regular_price=${parseInt(regular_price)+10}`,{
        method:"POST",
        headers:{
            Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`,
        }
    })
    const json = await data.json()
    console.log(json)
    getItems()
}
async function minusCen(id,regular_price){
    const data = await fetch(`http://localhost/kkwordpress/wp-json/wc/v3/products/${id}?regular_price=${parseInt(regular_price)-10}`,{
        method:"POST",
        headers:{
            Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`,
        }
    })
    const json = await data.json()
    console.log(json)
    getItems()
}
getItems()