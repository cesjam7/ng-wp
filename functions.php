<?php

function configuracion_inicial(){

	add_theme_support( 'post-thumbnails' );
	// Tamaño de imagenes
	// add_image_size('acordion', 960, 540, true);

	// Registrar un nuevo Menú
	register_nav_menus(array(
		'principal' => __('Principal'),
	));


}

// Esto va a cagar al inicio de la página
add_action( 'init', 'configuracion_inicial' );

 ?>
