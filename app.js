let novidades = [
    {
        titulo: "Livro 1",
        descricao: "Descrição do livro 1. Aproveite este lançamento incrível!",
        imagem: "https://via.placeholder.com/300x200"
    },

    {
        titulo: "Livro 2",
        descricao: "Descrição do livro 2. Uma leitura imperdível!",
        imagem: "https://via.placeholder.com/300x200"
    },

    {
        titulo: "Livro 3",
        descricao: "Descrição do livro 3. Garanta já o seu exemplar!",
        imagem: "https://via.placeholder.com/300x200"
    }
];

let minhaLista = [
    {
        titulo: "Meu Livro 1",  
        descricao: "Descrição do Meu Livro 1. Um clássico que você não pode perder.",
        imagem: "https://via.placeholder.com/300x200"
       },
       {
         titulo: "Meu Livro 2",
         descricao: "Descrição do Meu Livro 2. Um sucesso entre os leitores.",
         imagem: "https://via.placeholder.com/300x200"
       },
       {
         titulo: "Meu Livro 3",
         descricao: "Descrição do Meu Livro 3. Para quem ama aventuras!",
         imagem: "https://via.placeholder.com/300x200"
       }
     ];


     function gerarCards(lista, containerId) {
        const container = document.getElementById(containerId);
        lista.forEach(item => {
          const card = document.createElement('div');
          card.className = 'col-md-4';
          card.innerHTML = `
            <div class="card bg-dark text-white h-100">
              <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${item.titulo}</h5>
                <p class="card-text">${item.descricao}</p>
                <button class="btn btn-danger w-100 mt-auto" onclick="addToCart('${item.titulo}')">Comprar</button>
              </div>
            </div>
          `;
          container.appendChild(card);
        });
      }
 
      // Gerar os cards para as duas seções
      gerarCards(novidades, 'card-container-novidades');
      gerarCards(minhaLista, 'card-container-minha-lista');

      let navbar = document.querySelector('.navbar');

      window.addEventListener('scroll', ()=>{
        if(window.scrollY > 50){
            navbar.classList.add('scrolled');
        } else{
            navbar.classList.remove('scrolled');
        }
      })

      let cart = []; // Inicializa o array do carrinho

      const cartCount = document.getElementById('cart-count');
      const cartItems = document.getElementById('cart-items');
      const finalizeOrder = document.getElementById('finalize-order');
      
      // Função para adicionar ao carrinho
      function addToCart(itemTitle) {
        cart.push(itemTitle); // Adiciona o título do item ao carrinho
        updateCartUI(); // Atualiza a interface do carrinho
      }
      
      
      // Atualiza a interface do carrinho
      function updateCartUI() {
        // Atualiza o contador de itens
        cartCount.textContent = cart.length;
      
        // Limpa a lista de itens no dropdown
        cartItems.innerHTML = '';
      
        // Adiciona cada item ao dropdown
        cart.forEach((item, index) => {
          const listItem = document.createElement('li');
          listItem.className = 'dropdown-item d-flex justify-content-between align-items-center';
          listItem.innerHTML = `
            <span>${item}</span>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remover</button>
          `;
          cartItems.appendChild(listItem);
        });
      
        // Mensagem se o carrinho estiver vazio
        if (cart.length === 0) {
          cartItems.innerHTML = '<li class="dropdown-item">Seu carrinho está vazio.</li>';
          finalizeOrder.disabled = true; // Desabilita o botão "Finalizar Pedido"
        } else {
          finalizeOrder.disabled = false; // Habilita o botão "Finalizar Pedido"
        }
      }
      
      // Remove item do carrinho
      function removeFromCart(index) {
        cart.splice(index, 1); // Remove o item pelo índice
        updateCartUI(); // Atualiza a interface
      }
      
      // Finalizar pedido
      finalizeOrder.addEventListener('click', () => {
        if (cart.length > 0) {
          alert('Redirecionando para a página de pagamento...');
          window.location.href = '/pagamento.html'; // Atualize para sua URL de pagamento
        }
      });

      document.addEventListener('DOMContentLoaded', () => {
        // Inicializa o dropdown manualmente
        const cartDropdownButton = document.getElementById('cartDropdown');
        const cartDropdown = new bootstrap.Dropdown(cartDropdownButton);
      
        // Alternar o menu ao clicar no botão
        cartDropdownButton.addEventListener('click', () => {
          cartDropdown.toggle();
        });
      });
