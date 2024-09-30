"use client"; // Diretiva do Next.js para indicar que este componente é um Client Component. Isso é necessário para utilizar hooks como useState.

import React, { useState } from 'react'; // Importa o React e o hook useState para gerenciar estados e permitir a interatividade com o DOM.

interface Funcionario { // Definição de uma interface Funcionario.
  nome: string;           // Propriedade nome, representando o nome do funcionário (tipo string).
  tempoEmpresa: number;   // Propriedade tempoEmpresa, indicando o tempo de empresa em anos (tipo number).
  cargo: string;          // Propriedade cargo, indicando o cargo do funcionário (tipo string).
  salario: number;        // Propriedade salario, representando o salário do funcionário (tipo number).
  bonus: number;          // Propriedade bonus, representando o valor do bônus do funcionário (tipo number).
}
// **POO - Encapsulamento:** A interface `Funcionario` encapsula todas as propriedades necessárias para um funcionário. Garante que cada funcionário tenha a mesma estrutura e tipos, isolando e padronizando a manipulação de dados.

const Pagina = () => { // Define o componente funcional 'Pagina' como principal da aplicação.
  // Estado 'funcionarios' que armazena a lista de funcionários. Inicializa com dados salvos no localStorage ou com um array vazio.
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(JSON.parse(localStorage.getItem('funcionarios') || '[]'));
  // **Manipulação do DOM:** Inicializa o estado com valores armazenados no localStorage e converte para uma lista de `Funcionario`.

  // Estado 'nome' para armazenar o valor do campo de nome do formulário.
  const [nome, setNome] = useState('');

  // Estado 'tempoEmpresa' para armazenar o valor do campo de tempo de empresa do formulário.
  const [tempoEmpresa, setTempoEmpresa] = useState('');

  // Estado 'cargo' para armazenar o valor do campo de cargo. Inicializa com "Funcionário Comum".
  const [cargo, setCargo] = useState('Funcionário Comum');

  // Estado 'salario' para armazenar o valor do campo de salário do formulário.
  const [salario, setSalario] = useState('');

  // Função para adicionar um novo funcionário à lista e salvar no localStorage.
  const adicionarFuncionario = () => { 
    // Verifica se os campos obrigatórios estão preenchidos (nome, tempoEmpresa, salario).
    if (nome && tempoEmpresa && salario) {
      // Cria um novo objeto do tipo Funcionario com os dados fornecidos.
      const novoFuncionario: Funcionario = { 
        nome,                                  // Propriedade nome do novo funcionário.
        tempoEmpresa: Number(tempoEmpresa),    // Converte o tempo de empresa de string para número.
        cargo,                                 // Propriedade cargo do novo funcionário.
        salario: Number(salario),              // Converte o salário de string para número.
        bonus: Number(salario) * (             // Calcula o bônus com base no cargo:
          cargo === 'Gerente' ? 0.2            // Bônus de 20% para Gerente.
          : cargo === 'Diretor' ? 0.3          // Bônus de 30% para Diretor.
          : 0.1                                // Bônus de 10% para Funcionário Comum.
        ),
      };
      // **POO - Instanciação de Objeto:** O novo funcionário é instanciado como um objeto que segue a estrutura definida pela interface `Funcionario`.

      // Cria uma nova lista de funcionários com o novo funcionário adicionado.
      const listaAtualizada = [...funcionarios, novoFuncionario]; 
      setFuncionarios(listaAtualizada); // Atualiza o estado 'funcionarios' com a nova lista.

      // Salva a lista atualizada de funcionários no localStorage para persistir os dados.
      localStorage.setItem('funcionarios', JSON.stringify(listaAtualizada));
      // **Manipulação do DOM:** O localStorage é manipulado diretamente para armazenar a lista atualizada de funcionários, garantindo persistência dos dados.

      // Reseta os campos do formulário para valores iniciais.
      setNome('');            // Reseta o campo nome para vazio.
      setTempoEmpresa('');    // Reseta o campo tempoEmpresa para vazio.
      setSalario('');         // Reseta o campo salario para vazio.
      setCargo('Funcionário Comum'); // Reseta o cargo para "Funcionário Comum".
    }
  };

  return (
    <div>
      {/* Cabeçalho da seção de cadastro de funcionários */}
      <h2>Cadastro de Funcionários</h2>

      {/* Formulário para inserir os dados do funcionário */}
      <div className="formulario">
        {/* Campo de entrada de texto para o nome do funcionário */}
        <input
          placeholder="Nome"             // Placeholder que indica ao usuário o que deve ser preenchido.
          value={nome}                    // Valor atual do campo controlado pelo estado 'nome'.
          onChange={(e) => setNome(e.target.value)} // Atualiza o estado 'nome' sempre que o valor do input muda.
        /><br></br> {/* Quebra de linha no formulário */}

        {/* Campo de entrada de texto para o tempo de empresa do funcionário */}
        <input
          placeholder="Tempo de Empresa"  // Placeholder para indicar o que deve ser preenchido.
          value={tempoEmpresa}            // Valor atual do campo controlado pelo estado 'tempoEmpresa'.
          onChange={(e) => setTempoEmpresa(e.target.value)} // Atualiza o estado 'tempoEmpresa' quando o valor do input muda.
        /><br></br> {/* Quebra de linha no formulário */}

        {/* Campo de entrada de texto para o salário do funcionário */}
        <input
          placeholder="Salário"           // Placeholder para indicar o que deve ser preenchido.
          value={salario}                 // Valor atual do campo controlado pelo estado 'salario'.
          onChange={(e) => setSalario(e.target.value)} // Atualiza o estado 'salario' quando o valor do input muda.
        /><br></br> {/* Quebra de linha no formulário */}

        {/* Campo de seleção para escolher o cargo do funcionário */}
        <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
          {/* Opções disponíveis no dropdown */}
          <option>Funcionário Comum</option>
          <option>Gerente</option>
          <option>Diretor</option>
        </select><br></br> {/* Quebra de linha no formulário */}

        {/* Botão que chama a função 'adicionarFuncionario' ao ser clicado */}
        <button onClick={adicionarFuncionario}>Adicionar Funcionário</button>
        {/* **Manipulação do DOM:** O botão, ao ser clicado, executa a função `adicionarFuncionario` que atualiza o estado e o DOM. */}
      </div>

      {/* Cabeçalho da seção de lista de funcionários */}
      <h2>Lista de Funcionários</h2>

      {/* Lista não ordenada para exibir os funcionários */}
      <ul>
        {/* Percorre cada funcionário na lista 'funcionarios' e cria um item de lista para cada um */}
        {funcionarios.map((funcionario, indice) => (
          <li key={indice}> {/* Cada item da lista deve ter uma chave única, aqui usamos o índice do array */}
            {/* Exibe as informações do funcionário */}
            <strong>{funcionario.nome}</strong> {/* Nome do funcionário em negrito */}
            <br></br>Tempo de Empresa: {funcionario.tempoEmpresa} anos {/* Exibe o tempo de empresa */}
            <br></br>{funcionario.cargo} {/* Exibe o cargo */}
            <br></br>Salário: R${funcionario.salario.toFixed(2)} {/* Exibe o salário formatado para duas casas decimais */}
            <br></br>Bônus: R${funcionario.bonus.toFixed(2)} {/* Exibe o bônus formatado para duas casas decimais */}
          </li>
        ))}
      </ul>
      {/* **Manipulação do DOM:** A lista de funcionários é renderizada dinamicamente com base no estado `funcionarios`. Qualquer alteração nesse estado reflete automaticamente no DOM. */}
    </div>
  );
};

export default Pagina; // Exporta o componente 'Pagina' para ser utilizado em outros lugares.
