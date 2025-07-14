angular.module('cookieApp', [])
.controller('CookieController', function($scope, $http) {
    const apiUrl = 'http://127.0.0.1:8000/api/cookies';
    const apiUsers = 'http://127.0.0.1:8000/api/users';
    const apiLogin = 'http://127.0.0.1:8000/api/login';

    $scope.cookies = [];
    $scope.usuario = {};
    $scope.nuevoUsuario = {};
    $scope.logueado = false;
    $scope.error = '';
    $scope.imagenGalleta = 'img/galleta-cerrada.jpg';
    
        
    $http.get(apiUrl).then(function(res) {
        $scope.cookies = res.data;
    });

    $scope.iniciarSesion = function() {
        console.log('Clic en Iniciar Sesión');
        $http.post(apiLogin, {
            email: $scope.usuario.email,
            password: $scope.usuario.password
        })
        .then(function(res) {
            console.log('Login exitoso:', res.data);
            let nombre = res.data.user.name;
            $scope.usuario.name = nombre.charAt(0).toUpperCase() + nombre.slice(1);
            $scope.logueado = true;
        })
        .catch(function(err) {
            $scope.error = 'Credenciales incorrectas';
            console.error(err);
        });
    };

    $scope.registrarUsuario = function() {
        $http.post(apiUsers, $scope.nuevoUsuario)
            .then(function(res) {
                console.log('Usuario registrado:', res.data);
                $scope.logueado = true;
                $scope.error = '';
            })
            .catch(function(err) {
                $scope.error = 'Error al registrarse. ¿Email ya está en uso?';
                console.error(err);
            });
    };

    $scope.mostrarFraseAleatoria = function() {
        if (!$scope.logueado) {
            $scope.error = 'Primero debes iniciar sesión.';
            return;
        }

        const total = $scope.cookies.length;
        const indice = Math.floor(Math.random() * total);
        $scope.fraseSeleccionada = $scope.cookies[indice].frase;
        $scope.imagenGalleta = 'img/galleta-abierta.jpg';
    };

    $scope.cerrarSesion = function() {
        $scope.usuario = {};
        $scope.logueado = false;
        $scope.fraseSeleccionada = '';
        $scope.imagenGalleta = 'img/galleta-cerrada.jpg';
        $scope.error = '';
    };

});
