<?php
/**
 * Loads CAWeb Alerts.
 *
 * @package CAWeb
 */

caweb_display_alerts();


function caweb_display_alerts( ){
	$alerts = get_option( 'caweb_alerts', array() );
	$customizer_preview = is_customize_preview() ? ' hidden' : '';
	
	if ( empty( $alerts ) ) {
		return;
	}
	
	?>
	<!-- Alert Banners -->
	<?php
	foreach ( $alerts as $a => $data ) {
		$id = $a + 1;
		$status  = $data['status'];
		$display = $data['page_display'];
		
		/* If alert is active and should be displayed */
		$active_alert = in_array( $status, array( 'active', 'on' ), true ) &&
			( ( is_front_page() && 'home' === $display ) || ( 'all' === $display ) );
	
		if ( $active_alert || ! empty( $customizer_preview ) ) {
			$alert_classes = "alert-$id";
			$alert_classes .= ! $active_alert ? " $customizer_preview" : '' ;
			$read_more = ! empty( $data['button'] ) && ! empty( $data['url'] ) && ! empty( $data['text'] );

			if ( isset( $_COOKIE[ "caweb-alert-id-$id" ] ) && sanitize_text_field( wp_unslash( $_COOKIE[ "caweb-alert-id-$id" ] ) ) ) {
				?>
				<div class="alert alert-dismissible alert-banner border-top border-dark <?php print $alert_classes; ?>" style="background-color:<?php print esc_attr( $data['color'] ); ?>;">
					<div class="container">
						<button type="button" class="close caweb-alert-close" data-id="<?php print esc_attr( $id ); ?>" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<?php if ( ! empty( $data['header'] ) ) : ?>
						<span class="alert-level">
	
							<?php if ( ! empty( $data['icon'] ) ) : ?>
								<span class="ca-gov-icon-<?php print esc_attr( $data['icon'] ); ?>" aria-hidden="true"></span>
								<?php
							endif;
							print esc_html( $data['header'] );
							?>
						</span>
						<?php endif; ?>
						<span class="alert-text"><?php print wp_kses( wp_unslash( $data['message'] ), caweb_allowed_html( ) ); ?></span>
							<?php
							if (  ! empty( $customizer_preview ) || $read_more )  :
								$read_more_url    = $data['url'];
								$read_more_target = ! empty( $data['target'] ) ? sprintf( ' target="%1$s"', $data['target'] ) : '';
								$read_more_text   = ! empty( $data['text'] ) ? $data['text'] : '';
								?>
							<a href="<?php print esc_url( $read_more_url ); ?>" class="alert-link btn btn-default btn-xs<?php print ! $read_more ? ' hidden' : ''?>"<?php print esc_attr( $read_more_target ); ?>><?php print esc_attr( $read_more_text ); ?></a>
							<?php endif; ?>
					</div>
				</div>
				<?php
			}
		}
	}
}
