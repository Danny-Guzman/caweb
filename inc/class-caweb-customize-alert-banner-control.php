<?php
/**
 * CAWeb Customizer Alert Banner Control
 *
 * @link https://developer.wordpress.org/reference/classes/WP_Customize_Control/
 * @package CAWeb
 */

if ( class_exists( 'WP_Customize_Control' ) ) {
	/**
	 * CAWeb_Customize_Alert_Banner_Control
	 */
	class CAWeb_Customize_Alert_Banner_Control extends WP_Customize_Control {
		public $is_expanded = false;
		public $header = 'Label';
		public $message = ''; 
		public $display_on = 'home';
		public $banner_color = '#FFFFFF';
		public $read_more = true;
		public $read_more_text = '';
		public $read_more_url = '';
		public $read_more_target = true;
		public $icon = 'important';
		public $status = null; 
		public $alert_id = -1;
		public $type = 'alert_banner';

		/**
		 * __construct
		 *
		 * @param  WP_Customize_Manager $manager
		 * @param  string $id
		 * @param  array $args
		 * @return void
		 */
		function __construct( $manager, $id, $args = array() ){
			parent::__construct( $manager, $id, $args );

			$this->alert_id = str_replace( 'caweb_alert_banner_', '', $this->id);
		}

		/**
		 * Render an Alert Banner.
		 *
		 * @link https://developer.wordpress.org/reference/classes/wp_customize_control/render_content/
		 * @return void
		 */
		public function render_content() {
			$collapse = $this->is_expanded ? ' show' : '';
			$collapse_icon = $this->is_expanded ? '' : ' dashicons-arrow-right';

			$main_input = sprintf( '<input type="hidden" name="%1$s" id="%1$s" data-customize-setting-link="%1$s" />', $this->id );
			$add_alert = sprintf('<a data-target="caweb-toggle-alert-%1$s" class="text-decoration-none text-reset caweb-toggle-alert">%2$s <span class="text-secondary align-baseline dashicons dashicons-arrow-down%3$s"></span></a>', $this->alert_id, $this->header, $collapse_icon );
			$alert_status = sprintf('<input type="checkbox" data-alert="%1$s" id="alert-status-%2$s" name="alert-status-%2$s"%3$s%4$s>', 
				$this->id,
				$this->alert_id,
				null !== $this->status ? ' data-toggle="toggle" data-onstyle="success" data-size="sm"' : '', 
				null === $this->status || in_array( $this->status, array('on', 'active'), true ) ? ' checked="checked"' : ''
			);
			$remove_button = sprintf( '<button data-alert="%1$s" class="caweb-remove-alert btn btn-danger btn-sm">Remove</button>', $this->id);
			$main_options = "$main_input$add_alert$alert_status$remove_button";

			$main_div = sprintf( '<div id="caweb-toggle-alert-%1$s" class="collapse%2$s">%3$s%4$s%5$s%6$s%7$s%8$s</div>', 
				$this->alert_id,
				$collapse,
				$this->render_alert_banner_header(),
				$this->render_alert_banner_message(),
				$this->render_alert_banner_display_on(),
				$this->render_alert_banner_color(),
				$this->render_alert_banner_read_more(),
				$this->render_alert_banner_icon()
			);

			printf( '%1$s%2$s', $main_options, $main_div );
		}

		/**
		 * Refresh the parameters passed to the JavaScript via JSON.
		 *
		 * @link https://developer.wordpress.org/reference/classes/wp_customize_control/to_json/
		 * @return void
		 */
		public function to_json() {
			parent::to_json();
			$this->json['header'] = $this->header;
			$this->json['message'] = $this->message;
			$this->json['display_on'] = $this->display_on;
			$this->json['banner_color'] = $this->banner_color;
			$this->json['read_more'] = $this->read_more;
			$this->json['read_more_text'] = $this->read_more_text;
			$this->json['read_more_url'] = $this->read_more_url;
			$this->json['read_more_target'] = $this->read_more_target;
			$this->json['icon'] = $this->icon;
			$this->json['status'] = $this->status;
			$this->json['alert_id'] = $this->alert_id;
		}
		
		/**
		 * An Underscore (JS) template for this control’s content (but not its container).
		 *
		 * @link https://developer.wordpress.org/reference/classes/wp_customize_control/content_template/ 
		 * @return void
		 */
		public function content_template(){
			?>

				<input type="text" name="caweb_alert_banner_1" id="caweb_alert_banner_1" data-customize-setting-link="caweb_alert_banner_1" />
				<div>
					<label>Title</label>
					<input data-alert="caweb_alert_banner_1" type="text" id="alert-header-1" name="alert-header-1" />
				</div>
			<?php
		}
		
		private function render_alert_banner_header(){
			$value = ! empty( $this->header ) ? sprintf(' value="%1$s"', $this->header ) : '';
			$label = sprintf('<label for="alert-header-%1$s" class="customize-control-title">Title</label>', $this->alert_id );
			$input = sprintf('<input data-alert="%1$s" type="text" placeholder="Label" id="alert-header-%2$s" name="alert-header-%2$s"%3$s/>', $this->id, $this->alert_id, $value );

			return sprintf('<div>%1$s%2$s</div>', $label, $input );
		}

		private function render_alert_banner_message(){
			$label = sprintf( '<label for="alert-message-%1$s" class="customize-control-title">Message</label>', $this->alert_id );
			$textarea = sprintf('<textarea data-alert="%1$s" id="alert-message-%2$s" name="alert-message-%2$s" class="w-100">%3$s</textarea>', $this->id, $this->alert_id, $this->message );

			return sprintf('<div>%1$s%2$s</div>', $label, $textarea );
		}

		private function render_alert_banner_display_on(){
			$home_page = sprintf( '<input data-alert="%1$s" id="alert-display-home-%2$s" name="alert-display-%2$s" type="radio" value="home"%3$s/><label for="alert-display-home-%2$s">Home Page Only</label>', $this->id, $this->alert_id, 'home' === $this->display_on ? ' checked="checked"' : '' );
			$all_pages = sprintf( '<input data-alert="%1$s" id="alert-display-all-%2$s" name="alert-display-%2$s" type="radio" value="all"%3$s/><label for="alert-display-all-%2$s">All Pages</label>', $this->id, $this->alert_id, 'all' === $this->display_on ? ' checked="checked"' : '' );

			return sprintf('<div role="radiogroup"><span class="customize-control-title">Display On</span>%1$s%2$s</div>', $home_page, $all_pages );
		}

		private function render_alert_banner_color(){
			$label = sprintf('<label for="alert-banner-color-%1$s" class="customize-control-title">Banner Color</label>', $this->alert_id );
			$input = sprintf('<input data-alert="%1$s" class="w-25" type="color" id="alert-banner-color-%2$s" name="alert-banner-color-%2$s" value="%3$s"/>', $this->id, $this->alert_id, $this->banner_color );
			
			return sprintf('<div>%1$s%2$s</div>', $label, $input );
		}

		private function render_alert_banner_read_more(){
			$read_more = sprintf( '<div><input id="alert-read-more-%1$s" name="alert-read-more-%1$s" class="toggle-read-more-options" type="checkbox" data-alert="%2$s"%3$s/><label class="d-inline customize-control-title" for="alert-read-more-%1$s">Read More Button</label></div>', $this->alert_id, $this->id, $this->read_more ? ' checked="checked"' : '' );
			$read_more_text = sprintf('<div><label for="alert-read-more-text-%1$s" class="customize-control-title">Read More Button Text</label><input type="text" id="alert-read-more-text-%1$s" name="alert-read-more-text-%1$s" value="%2$s" data-alert="%3$s" /></div>', $this->alert_id, $this->read_more_text, $this->id );
			$read_more_url = sprintf('<div><label for="alert-read-more-url-%1$s" class="customize-control-title">Read More Button URL</label><input type="text" id="alert-read-more-url-%1$s" name="alert-read-more-url-%1$s" value="%2$s" data-alert="%3$s"/></div>', $this->alert_id, $this->read_more_url, $this->id );
			$open_in_new_tab = sprintf('<div><input type="checkbox" id="alert-read-more-target-%1$s" name="alert-read-more-target-%1$s" data-alert="%2$s"%3$s/><label for="alert-read-more-target-%1$s" class="d-inline customize-control-title">Open Link in New Tab</label></div>', $this->alert_id, $this->id, $this->read_more_target ? ' checked="checked"' : '' );

			return sprintf( '%1$s<div id="alert-read-more-options-%2$s" class="collapse%3$s">%4$s%5$s%6$s</div>', 
				$read_more, 
				$this->alert_id,
				$this->read_more ? ' show' : '' , 
				$read_more_text, 
				$read_more_url, 
				$open_in_new_tab 
			);
		}

		private function render_alert_banner_icon(){
			return caweb_icon_menu(
				array(
					'select'       => $this->icon,
					'name'         => 'alert-icon-' . $this->alert_id,
					'header'       => 'Icon',
					'header_class' => array( 'customize-control-title', 'd-inline' ),
					'input_attrs' => array('data-alert' => $this->id ),
				)
			);
		}
	}
}

