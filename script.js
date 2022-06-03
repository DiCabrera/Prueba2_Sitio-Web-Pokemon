const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//VALIDACIÓN
function validar() {
    var nombre = document.formulario.txt_nombre.value
    var edad = document.formulario.num_edad.value
    var telefono = document.formulario.txt_telefono.value
    var rut = document.formulario.txt_rut.value
    //VALIDAR NOMBRE
    if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres")
        document.formulario.txt_nombre.focus()
        return false;
    }
    
    if (edad<10 || edad>110) {
        alert("Por ingrese una edad valida")
        document.formulario.num_edad.focus()
        return false;
    }

    //VALIDAR RUT
    if (rut.length < 9 || rut.length > 10 || rut.indexOf('-') === -1) {
        alert("Rut invalido")
        document.formulario.txt_rut.focus()
        return false;
    }

    //VALIDAR NÚMERO DE TELÉFONO
    if (telefono.substring(0, 1) != "9" || telefono.length != 9) {
        alert("El número que ingresó no es correcto, verifique que comience con 9 y sea un número valido")
        document.formulario.txt_telefono.focus()
        return false;
    }
    
}

//function mostrarInfo() {
//    window.open("http://127.0.0.1:5500/info.html", '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
 // }

function mostrar(){
    alert(nombre);
    alert(edad);
}


//EVENTOS ONCLICK
const searchPokemonPlanta = event => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
}

const searchPokemonAgua = event => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/squirtle`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
}

const searchPokemonFuego = event => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/charmander`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
}

//GENERAR CARD
const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

//GENERAR TIPOS
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}
//GENERAR INFORMACIÓN DE ESTADISTICAS
const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}