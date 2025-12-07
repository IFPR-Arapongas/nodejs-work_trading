const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("entries")

    const formData = new FormData(form)
    const { nome, email, idade, cidade, informacoes} = Object.fromEntries(formData.entries())

    console.log(nome, idade)


    const div = document.createElement('div')
    div.classList.add('card')

    const pnome = document.createElement('p')
    pnome.textContent = `Nome: ${nome}`

    const pemail = document.createElement('p')
    pemail.textContent = `Email: ${email}`

    const pidade = document.createElement('p')
    pidade.textContent = `Idade: ${idade}`

    const pcidade = document.createElement('p')
    pcidade.textContent = `Cidade: ${cidade}`

    const pinformacoes = document.createElement('p')
    pinformacoes.textContent = `Informações: ${informacoes}`

    
    const button = document.createElement('button')
    button.textContent = 'Remover'

    button.addEventListener('click', (e) => {
        e.target.parentElement.remove()
    })

    div.append(pnome, pemail, pidade, pcidade, pinformacoes)

    document.querySelector('.info').append(div)
})