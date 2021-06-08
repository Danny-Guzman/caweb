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

/**
 * CAWeb Gutenberg Init
 *
 * @return void
 */
function caweb_gutenberg_init() {
 
    // automatically load dependencies and version
    $asset_file = include( CAWEB_GUTENBERG_EXT_DIR . 'build/index.asset.php');
 
    wp_register_script(
        'caweb-gutenberg-extension',
        CAWEB_GUTENBERG_EXT_URL . 'build/index.js',
        $asset_file['dependencies'],
        $asset_file['version']
    );
 
    
    register_block_type( 'caweb-gutenberg-extension/panel', array(
        'api_version' => 2,
        'editor_script' => 'caweb-gutenberg-extension',
    ) );
 
}