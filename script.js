class Item {
    constructor(id, nomeProduto, precoCusto, icone) {
        this.id = id;
        this.nome = nomeProduto; //[cite: 1]
        this.preco = precoCusto; //[cite: 1]
        this.estoque = 10; //[cite: 1]
        this.icone = icone; // Nome dos ícones na biblioteca Lucide Icons
    }

    vender() {
        if (this.estoque > 0) { //[cite: 1]
            this.estoque = this.estoque - 1; //[cite: 1]
            return { 
                sucesso: true, 
                mensagem: `Você vendeu: ${this.nome}. Restam no estoque: ${this.estoque}` 
            };
        } else {
            return { 
                sucesso: false, 
                mensagem: `Aviso: O produto ${this.nome} acabou!` 
            };
        }
    }
}

// Definição dos produtos com os nomes dos ícones Lucide
const produtos = [
    new Item(1, "Caderno", 15, "book"),    // Ícone 'book'[cite: 1]
    new Item(2, "Lápis", 37, "pencil"),   // Ícone 'pencil'[cite: 1]
    new Item(3, "Borracha", 5, "eraser"), // Ícone 'eraser'
    new Item(4, "Mochila", 120, "backpack") // Ícone 'backpack'
];

function renderizarProdutos() {
    const vitrine = document.getElementById("vitrine");
    vitrine.innerHTML = "";

    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card";
        
        card.innerHTML = `
            <div class="produto-img">
                <i data-lucide="${produto.icone}"></i>
            </div>
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
            <p class="estoque" id="estoque-${produto.id}">Estoque: ${produto.estoque}</p>
            <button id="btn-${produto.id}" onclick="processarVenda(${produto.id})">
                Vender ${produto.nome}
            </button>
        `;
        vitrine.appendChild(card);
    });

    // Converte as tags <i data-lucide="..."> para elementos SVG do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function registrarLog(mensagem, tipo) {
    const historico = document.getElementById("historico");
    const itemLog = document.createElement("li");
    
    itemLog.className = tipo === 'sucesso' ? 'log-sucesso' : 'log-erro';
    itemLog.textContent = `[${new Date().toLocaleTimeString()}] ${mensagem}`;
    
    historico.insertBefore(itemLog, historico.firstChild);
}

function processarVenda(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    if (!produto) return;

    const resultado = produto.vender();

    if (resultado.sucesso) {
        document.getElementById(`estoque-${produto.id}`).innerText = `Estoque: ${produto.estoque}`;
        registrarLog(resultado.mensagem, 'sucesso');
    } else {
        document.getElementById(`btn-${produto.id}`).disabled = true;
        document.getElementById(`btn-${produto.id}`).innerText = "Esgotado";
        registrarLog(resultado.mensagem, 'erro');
    }
}

// Inicializa a interface ao carregar
renderizarProdutos();