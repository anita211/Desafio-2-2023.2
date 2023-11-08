
// Faz o fetch das UFs a partir da API do IBGE
async function fetchUFs() {
    const apiUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}
  
// Preenche o elemento select com o menu de UFs
async function populateUFSelect() {
    const selectElement = document.getElementById("uf-select");
  
    try {
        const ufs = await fetchUFs();
        selectElement.innerHTML = "";

        const placeholderOption = document.createElement("option");
        placeholderOption.text = "Selecione uma UF";
        selectElement.appendChild(placeholderOption);

        ufs.forEach((uf) => {
          const option = document.createElement("option");
          option.value = uf.sigla;
          option.text = uf.sigla;
          selectElement.appendChild(option);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
  
// Faz o fetch dos municipios de um UF específico
async function fetchMunicipiosForUF(ufCode) {
    const apiUrl ="https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+ ufCode +"/municipios";
  
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}
  
// Faz o update da lista de municipios de acordo com a UF selecionada
async function updateMunicipioList(ufCode) {
    const municipioList = document.getElementById('municipio-list');
    
    try {
        const municipios = await fetchMunicipiosForUF(ufCode);
        municipioList.innerHTML = '';
  
        municipios.forEach((municipio) => {
            const listItem = document.createElement('p');
            listItem.textContent = municipio.nome;
            municipioList.appendChild(listItem);
        });
    }
    catch (error) {
        console.error("Error:", error);
    }
}
  
// Inicializra o menu de UFs e popular com a UF selecionada
populateUFSelect();
const selectElement = document.getElementById('uf-select');
selectElement.addEventListener('change', function () {
    const selectedUF = selectElement.value;
    if (selectedUF) {
        updateMunicipioList(selectedUF);
    } }
);
  