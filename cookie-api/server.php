<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// Si el archivo solicitado existe en la carpeta public, que el servidor lo sirva directamente
if ($uri !== '/' && file_exists(__DIR__.'/public'.$uri)) {
    return false;
}

// Si no existe archivo, pasar la solicitud a index.php de Laravel
require_once __DIR__.'/public/index.php';
