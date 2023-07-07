**Viajes Recomendados API**

La API de Viajes Recomendados es una plataforma que permite a los usuarios realizar diversas operaciones relacionadas con usuarios, viajes, comentarios y votos. Proporciona endpoints que permiten el registro de usuarios, inicio de sesión, creación y actualización de perfiles de usuario, gestión de viajes, comentarios y votos, entre otras funcionalidades. Se basa en el protocolo HTTP y sigue los principios de REST (Representational State Transfer). Utiliza el formato JSON para el intercambio de datos, y se espera que las solicitudes incluyan encabezados adecuados para la autenticación y la manipulación de datos sensibles.

_Instalación:_

1. Clona el repositorio de la API en tu máquina local:
   \*SSH:
   `git@github.com:CarlosFernandezMaza/viajes_recomendados.git`
   \*HTTPS:
   `https://github.com/CarlosFernandezMaza/viajes_recomendados.git`
   \*GitHub CLI:
   `gh repo clone CarlosFernandezMaza/viajes_recomendados`
2. Instala las dependencias ejecutando el siguiente comando:
   `$ npm install`
3. Inicia el servidor de desarrollo con el siguiente comando:
   `$ npm run dev`

**Endpoints**

La API proporciona endpoints para el registro de nuevos usuarios, inicio de sesión, activación de cuenta, actualización de perfiles de usuario y obtención de detalles de usuarios. Es importante tener en cuenta que algunos endpoints requieren autenticación para acceder a ellos. La autenticación se realiza mediante el encabezado "Authorization" en la solicitud, que debe contener un token JWT (JSON Web Token) válido. Este token se obtiene al iniciar sesión correctamente utilizando el endpoint correspondiente.

_Endpoints Usuarios_

Los usuarios pueden registrarse utilizando el endpoint `POST /api/v1/users/registerUser`, donde deben proporcionar información como nombre, apellido, nombre de usuario, dirección de correo electrónico y contraseña. Una vez registrados, los usuarios pueden iniciar sesión utilizando el endpoint `GET /api/v1/users/loginUser`. Además, se puede activar la cuenta de un usuario mediante el endpoint `GET /api/v1/users/activation`, que utiliza un código de activación único proporcionado en la URL.

Los usuarios pueden actualizar su perfil utilizando el endpoint `PATCH /api/v1/users/updateProfile`, donde pueden modificar su nombre, apellido, nombre de usuario, contraseña y biografía. También pueden subir una imagen de perfil utilizando el endpoint `PATCH /api/v1/users/uploadProfileImage`.

Es posible obtener detalles de un usuario en particular mediante el endpoint `GET /api/v1/users/getUserById`, especificando el ID del usuario en la URL.

_Endpoints Viajes_

También permite la gestión de viajes, incluyendo la creación, actualización, eliminación y obtención de detalles de viajes. Los usuarios pueden crear un nuevo viaje utilizando el endpoint `POST /api/v1/trips/createTrip`, proporcionando información como el título del viaje, la fecha de la experiencia, la categoría, la ciudad, el resumen y una descripción detallada.

Los viajes existentes pueden actualizarse utilizando el endpoint `POST /api/v1/trips/updateTripImage`, donde los usuarios pueden subir una nueva imagen para un viaje específico. También es posible eliminar un viaje utilizando el endpoint `DELETE /api/v1/trips/deleteTripById`, especificando el ID del viaje en la URL.

Igualmente ofrece endpoints para obtener detalles de un viaje en particular mediante el endpoint `GET /api/v1/trips/getTripById`. Además, se pueden obtener listas de viajes filtrados utilizando los endpoints `GET /api/v1/trips/getTrips` y `GET /api/v1/trips/getTripsFiltered`, que permiten filtrar por categoría, ciudad y ordenar los resultados.

_Endpoints Comentarios_

Además permite a los usuarios agregar comentarios a los viajes. Los comentarios pueden crearse utilizando el endpoint `POST /api/v1/comentaries/createCommentary`, donde se debe proporcionar el contenido del comentario y un voto. Los usuarios también pueden obtener una lista de comentarios mediante el endpoint `GET /api/v1/comentaries/getComentaries`.

_Endpoints Votos_

Los usuarios pueden emitir votos para los viajes utilizando la API. Se pueden obtener listas de votos por ID de viaje utilizando el endpoint `GET /api/v1/votes/getVotesByIdTrip`. Además, los usuarios pueden crear nuevos votos para un viaje específico utilizando el endpoint `POST /api/v1/votes/newVote`.

Además, la API puede devolver códigos de respuesta HTTP para indicar el resultado de una solicitud. Los códigos de respuesta comunes incluyen:

`200 OK`: Indica que la solicitud se ha procesado correctamente.
`201 Created`: Se utiliza para indicar que se ha creado exitosamente un nuevo recurso.
`400 Bad Request`: Indica un error de solicitud debido a parámetros incorrectos o inválidos.
`401 Unauthorized`: Se devuelve cuando se requiere autenticación y no se proporcionan credenciales válidas.
`403 Forbidden`: Indica que el usuario autenticado no tiene permisos suficientes para acceder al recurso solicitado.
`404 Not Found`: Se devuelve cuando no se encuentra el recurso solicitado.
`500 Internal Server Error`: Indica un error interno en el servidor.
