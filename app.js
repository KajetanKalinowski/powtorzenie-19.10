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
    h1.innerHTML=json[i].name
    h2.innerHTML=json[i].price+" zł"
    const miejsce = document.createElement("div")
    miejsce.id="wow"
    const wzrost = document.createElement("button")
    wzrost.innerHTML="+10zł"
    const minus = document.createElement("button")
    minus.innerHTML="-10zł"

    wzrost.addEventListener('click',()=>{
        wzrostCen(json[i].id,json[i].regular_price)
    })
    if(json[i].price>10){
    minus.addEventListener('click',()=>{
        minusCen(json[i].id,json[i].regular_price)
    })
}else{
    
    minus.style.color = "red"
    minus.style.backgroundColor = "rgb(39, 39, 39)"
}

    div.appendChild(h1)
    div.appendChild(h2)
    div.appendChild(miejsce)
    div.appendChild(wzrost)
    div.appendChild(minus)
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