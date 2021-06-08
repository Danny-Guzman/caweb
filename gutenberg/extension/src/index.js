import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

registerBlockType( 'caweb-gutenberg-extension/panel', {
    title: 'Panel',
    category: 'caweb',
    icon: <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="37" height="32" viewBox="0 0 37 32">
    <title>caweb</title>
    <path d="M0.443 1.316c-0.074 0.031-0.2 0.184-0.285 0.337-0.137 0.245-0.158 0.98-0.158 4.391v4.105l0.611 0.592h5.701l0.032-1.624c0.032-1.47 0.053-1.654 0.253-1.92 0.485-0.623 0.748-0.694 2.866-0.725l1.918-0.041v-4.554l-0.548-0.633-5.122 0.010c-2.824 0-5.195 0.031-5.269 0.061zM15.481 2.357l-0.306 0.296v3.799h5.301c5.29 0 5.301 0 5.764 0.225 0.811 0.408 0.885 0.643 0.927 2.91l0.042 1.971h5.891l0.253-0.255 0.264-0.245v-8.465l-0.653-0.531h-17.177l-0.306 0.296zM1.149 14.274l-0.253 0.265-0.032 6.852c-0.021 3.778 0 7.066 0.032 7.311 0.042 0.265 0.169 0.541 0.316 0.684l0.253 0.245h5.016c5.143 0 5.301-0.010 5.606-0.398 0.095-0.122 0.127-0.868 0.137-2.696v-2.522h-2.129c-2.255 0-2.824-0.082-3.225-0.439-0.548-0.49-0.548-0.459-0.548-5.177v-4.391h-4.921l-0.253 0.266zM27.188 18.675c0 2.308-0.042 3.809-0.116 4.064-0.148 0.511-0.664 1.042-1.149 1.174-0.211 0.061-2.276 0.102-4.974 0.102h-4.616v2.777c0 3.115 0.032 3.278 0.727 3.727l0.358 0.235h8.209c9.105 0 8.725 0.031 9.157-0.654 0.19-0.306 0.2-0.643 0.2-7.23v-6.913l-0.327-0.357c-0.179-0.204-0.495-0.409-0.706-0.47-0.221-0.061-1.739-0.102-3.572-0.102h-3.193v3.646zM11.381 11.149h10.538v8.271h-10.538v-8.271zM21.919 20.748h-10.538c-0.757 0-1.37-0.594-1.37-1.328v-8.271c0-0.733 0.613-1.327 1.37-1.327h10.538c0.757 0 1.37 0.594 1.37 1.327v8.271c0 0.733-0.613 1.327-1.37 1.327zM12.751 18.093h7.798v-5.616h-7.798v5.616z"></path>
    </svg>,
    example: {
        attributes: {
            heading: 'Panel Heading',
            content: 'Main Content Here'
        },
    },
    attributes: {
        content: {
            type: 'string',
            source: 'text',
            selector: 'p',
        },
    },
    edit( props ){
        const {
            attributes: { heading, content },
            setAttributes,
            className,
        } = props;

        const blockProps = useBlockProps();

        const onChangeHeading = ( newHeading ) => {
            setAttributes( { heading: newHeading } );
        };
        const onChangeContent = ( newContent ) => {
            setAttributes( { content: newContent } );
        };

        return (
            <div class="wp-block panel panel-default">
                <div class="panel-heading">
                    <RichText
                    { ...blockProps }
                    tagName="p"
                    onChange={ onChangeHeading }
                    value={ heading }
                />
                </div>
                <div class="panel-body">
                    <RichText
                        { ...blockProps }
                        tagName="div"
                        onChange={ onChangeContent }
                        value={ content }
                    />
                </div>
            </div>
            );
    },
    save( props ){
        //const blockProps = useBlockProps.save();
        return (<div class="panel"><div class="panel-body"></div></div>);
    }
} );