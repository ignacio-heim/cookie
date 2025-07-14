angular.module('cookieApp', [])
.controller('UserController', function($scope, $http) {
    const apiUsers = 'http://127.0.0.1:8000/api/users';
    const apiLogin = 'http://127.0.0.1:8000/api/login';

    $scope.usuario = {};
    $scope.nuevoUsuario = {};
    $scope.error = '';

    $scope.iniciarSesion = function() {
        $http.post(apiLogin, {
            email: $scope.usuario.email,
            password: $scope.usuario.password
        })
        .then(function(res) {            
            localStorage.setItem('usuario', JSON.stringify(res.data.user));            
            window.location.href = 'galleta.html';
        })
        .catch(function(err) {
            $scope.error = 'Credenciales incorrectas';
        });
    };

    $scope.registrarUsuario = function() {
        $http.post(apiUsers, $scope.nuevoUsuario)
            .then(function(res) {                
                localStorage.setItem('usuario', JSON.stringify(res.data));                
                window.location.href = 'galleta.html';
            })
            .catch(function(err) {
                $scope.error = 'Error al registrarse. ¿Email ya está en uso?';
            });
    };
});