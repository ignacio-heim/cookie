angular.module('cookieApp', [])
.controller('CookieController', function($scope, $http) {
    console.log("CookieController cargado");

    const apiUrl = 'http://127.0.0.1:8000/api/cookies';

    $scope.usuario = JSON.parse(localStorage.getItem('usuario')) || {};
    $scope.logueado = !!$scope.usuario.name;
    $scope.imagenGalleta = 'img/galleta-cerrada.jpg';
    $scope.fraseSeleccionada = '';

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

    $scope.cerrarSesion = function() {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    };
});
