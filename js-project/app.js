// JavaScript project with MELI API and axios

let url = "https://api.mercadolibre.com/sites/MLA/search"

const mostrarProductosML = async() => {
    try {
        const response = await axios.get(url, {
            params: {
                q: 'tecnología'
            },
        })
        if (response.status === 200) {
            const data = response.data
            console.log(data)
            return data
        } else if (response.status = 404) {
            console.log('The product cannot be found.')
        } else {
            console.log('Ups.. Something went wrong.')
        }
    } catch (error) {
        console.error(error)
    }
}

const addCardProducts = (data) => {
    data.forEach((product, index) => {
        let lista = document.createElement("div")

        let h3 = document.createElement("h3")
        h3.innerHTML = product.title

        let cardDiv = document.createElement("div")
        cardDiv.className = "card-product"

        let image = document.createElement("img")
        image.src = product.image || product.thumbnail

        let price = document.createElement("p")
        price.innerHTML = (product.prices) ? `${product.prices.prices[0].currency_id} $${product.prices.prices[0].amount}` : `US$ ${product.price}` 

        let buyButton = document.createElement("a")
        buyButton.style.display = "inline"
        buyButton.innerHTML = 'Buy'
        if (product.prices) { buyButton.href = product.permalink }

        let addCartButton = document.createElement("button")
        addCartButton.className = 'cart-button'
        addCartButton.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`
        addCartButton.onclick = function() { addToCart(`${index}`) }

        cardDiv.append(h3)
        cardDiv.append(image)
        cardDiv.append(price)
        cardDiv.append(buyButton)
        cardDiv.append(addCartButton)
        lista.append(cardDiv)   

        document.getElementById("root").append(lista)
    })
}

const showProducts = async () => {
    let productsML = await mostrarProductosML()
    let products = productsML.results
    addCardProducts(products)
}

document.addEventListener('DOMContentLoaded', showProducts)
