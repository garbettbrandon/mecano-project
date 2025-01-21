# TypeGame

TypeGame es una aplicación web que permite a los usuarios practicar y mejorar su velocidad de escritura. La aplicación mide el tiempo, los errores, las palabras por minuto (WPM) y los caracteres por minuto (CPM) mientras el usuario escribe un párrafo aleatorio.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de archivos:

### Archivos

- **index.html**: Contiene la estructura HTML de la aplicación.
- **styles.css**: Contiene los estilos CSS para la aplicación.
- **typing.js**: Contiene la lógica JavaScript para la funcionalidad de la aplicación.
- **package.json**: Contiene las dependencias y scripts necesarios para ejecutar la aplicación.
- **.gitignore**: Lista de archivos y directorios que Git debe ignorar.

## Cómo Ejecutar la Aplicación

### Prerrequisitos

- Node.js y npm deben estar instalados en tu sistema.

### Pasos

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   
2. Instala las dependencias:
   ```sh
   npm install
   
3. Ejecuta la aplicación en modo desarrollo:
   ```sh
   npm run dev

4. Abre tu navegador y navega al localhost para ver la aplicación en funcionamiento.


## Arquitectura
La aplicación está construida utilizando HTML, CSS y JavaScript. La lógica principal de la aplicación se encuentra en el archivo typing.js, que maneja la carga de párrafos, la lógica de temporización, el seguimiento de errores y la actualización de las estadísticas de escritura.

### Componentes Principales
- HTML: Proporciona la estructura básica de la aplicación.
- CSS: Define el estilo y la apariencia de la aplicación.
- JavaScript: Maneja la lógica de la aplicación, incluyendo la selección de párrafos aleatorios, el seguimiento del tiempo y los errores, y la actualización de las estadísticas de escritura.

### Funcionalidades
- Carga de Párrafos: La función loadParagraph carga un párrafo aleatorio para que el usuario lo escriba.
- Inicialización de Escritura: La función initTyping maneja la lógica de escritura, incluyendo la verificación de errores y la actualización de las estadísticas.
- Temporizador: La función initTimer maneja la cuenta regresiva del tiempo.
- Reinicio del Juego: La función resetGame reinicia el juego con un nuevo párrafo y estadísticas.
- Guardado de Puntuaciones: La función saveScore guarda las puntuaciones en localStorage.
- Mostrar Rankings: La función showRankings muestra los rankings guardados.
- Reiniciar Rankings: La función resetRankings reinicia los rankings guardados.

## Contribuir
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

- Haz un fork del repositorio.
- Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
- Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
- Sube tus cambios a la rama (git push origin feature/nueva-funcionalidad).
- Abre un Pull Request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Autores
Consulta el archivo CONTRIBUTORS.md para ver la lista de contribuidores.
  
