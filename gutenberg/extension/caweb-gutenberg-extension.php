<?php 
/**
 * CAWeb Gutenberg Extension Plugin
 *
 * @package CAWebGutenbergExtension
 *
 * @wordpress-plugin
 * Plugin Name: CAWeb Gutenberg Extension
 * Plugin URI:
 * Description: CAWeb Gutenberg Blocks
 * Version:     1.0.0
 * Author:      Danny Guzman
 * Author URI:
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: caweb-gutenberg-extension
 *
 */

 
define( 'CAWEB_GUTENBERG_EXT_DIR', str_replace( '\\', '/', __DIR__ . '/' ) );
define( 'CAWEB_GUTENBERG_EXT_URL', site_url( preg_replace( '/(.*)\/wp-content/', '/wp-content', CAWEB_GUTENBERG_EXT_DIR ) ) );

add_action( 'init', 'caweb_gutenberg_init' );
add_filter( 'block_categories', 'caweb_gutenberg_block_category', 10, 2);

/**
 * CAWeb Gutenberg Init
 *
 * @return void
 */
function caweb_gutenberg_init() {
 
    // automatically load dependencies and version
    $asset_file = include( CAWEB_GUTENBERG_EXT_DIR . 'build/index.asset.php');
 
	$editor_css = caweb_get_min_file( "/css/cagov-v5.5-oceanside.css" );
    wp_register_style( 'caweb-gutenberg-extension-styles', $editor_css );

    wp_register_script(
        'caweb-gutenberg-extension-scripts',
        CAWEB_GUTENBERG_EXT_URL . 'build/index.js',
        $asset_file['dependencies'],
        $asset_file['version']
    );
 
    
    register_block_type( 'caweb-gutenberg-extension/panel', array(
        'api_version' => 2,
        'editor_script' => 'caweb-gutenberg-extension-scripts',
        'editor_style' => 'caweb-gutenberg-extension-styles'
    ) );
 
}

/**
 * CAWeb Gutenberg Block Category
 *
 * @param  mixed $categories
 * @param  mixed $post
 * @return void
 */
function caweb_gutenberg_block_category( $categories, $post ) {
	return array_merge(
		array(
			array(
				'slug' => 'caweb',
				'title' => __( 'CAWeb', 'caweb-gutenberg-extension' ),
			),
		),
        $categories
	);
}
