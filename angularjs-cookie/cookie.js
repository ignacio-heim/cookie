angular.module('cookieApp', [])
.controller('CookieController', function($scope, $http) {
    console.log("CookieController cargado");

    const apiUrl = 'http://127.0.0.1:8000/api/cookies';

    $scope.usuario = JSON.parse(localStorage.getItem('usuario')) || {};
    $scope.logueado = !!$scope.usuario.name;
    $scope.imagenGalleta = 'img/galleta-cerrada.jpg';
    $scope.fraseSeleccionada = '';
    $scope.mostrarFormularioFrase = false;
    $scope.datos = {
        nuevaFrase: ''
    };

    if (!$scope.logueado) {
        window.location.href = 'login.html';
        return;
    }

    $http.get(apiUrl).then(function(res) {
        $scope.cookies = res.data;
    });

    $scope.mostrarFraseAleatoria = function() {
        $http.get('http://127.0.0.1:8000/api/cookies/random')
            .then(function(res) {
                $scope.fraseSeleccionada = res.data.frase;
                $scope.imagenGalleta = 'img/galleta-abierta.jpg';
            })
            .catch(function(err) {
                console.error('Error al obtener frase aleatoria', err);
            });
    };

    $scope.agregarFrase = function() {
        $scope.mostrarFormularioFrase = true;
    };

    $scope.enviarFrase = function() {
        console.log("Botón 'Guardar' clickeado");
        console.log($scope.datos.nuevaFrase);
    
        if (!$scope.datos.nuevaFrase) return;
    
        $http.post(apiUrl, {
            frase: $scope.datos.nuevaFrase
        })
        .then(function(res) {
            console.log('Frase agregada:', res.data);            
            $scope.datos.nuevaFrase = '';
            $scope.mostrarFormularioFrase = false;
        })
        .catch(function(err) {
            if (err.status === 409) {
                alert('Esa frase ya existe. Por favor escribí otra.');
            } else if (err.status === 403) {
                alert('No estás autorizado para agregar frases.');
            } else {
                console.error('Error inesperado al guardar la frase:', err);
                alert('Error en el servidor. Intentalo más tarde.');
            }
        });
    };
    

    $scope.cerrarSesion = function() {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    };

});
