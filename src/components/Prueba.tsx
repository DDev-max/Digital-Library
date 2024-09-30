

export function Pruebas() {

    function encontrarIndiceCoincidencia(texto, palabra, coincidenciaNumero) {
        let indiceActual = 0; //empeza desde el principio
        let contadorCoincidencias = 0;
        
        while (contadorCoincidencias < coincidenciaNumero) {
            indiceActual = texto.indexOf(palabra, indiceActual);
            
            if (indiceActual === -1) {
                return -1; 
            }
            
            contadorCoincidencias++;
            
            if (contadorCoincidencias === coincidenciaNumero) {
                return indiceActual;
            }
            
            indiceActual++;
        }
        
        return -1;
    }
    
    const texto = "JavaScript es un lenguaje de programación. JavaScript se utiliza en el desarrollo web. Me encanta JavaScript.";
    const palabra = "JavaScript";
    const coincidenciaNumero = 2;
    
    const indice = encontrarIndiceCoincidencia(texto, palabra, coincidenciaNumero);
    console.log(indice);
    



    return(
        <>
    
        </>
    )
}

