<?php

function configuracion_inicial(){

	add_theme_support( 'post-thumbnails' );
	// Tamaño de imagenes
	// add_image_size('acordion', 960, 540, true);

	// Registrar un nuevo Menú
	register_nav_menus(array(
		'principal' => __('Principal'),
	));

    $uri_template = get_bloginfo('template_url');
    wp_enqueue_script( 'angular-js', $uri_template.'/assets/js/angular.min.js', array(), '1.0', true);
    wp_enqueue_script( 'angular-route-js', $uri_template.'/assets/js/angular-route.min.js', array('angular-js'), '1.0', true);
    wp_enqueue_script( 'app-js', $uri_template.'/controller/app.js', array('angular-js'), '1.0', true);

    $wp = array(
    	'url' => home_url(),
        'template_url' => $uri_template
    );
    wp_localize_script( 'app-js', 'wp', $wp );

}

// Esto va a cagar al inicio de la página
add_action( 'init', 'configuracion_inicial' );

add_filter( 'show_admin_bar', '__return_false' );

 ?>
