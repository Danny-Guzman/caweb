<?php
// Template Name: Search Results Page

get_header();
$keyword = $_GET['q'];
?>
<body <?php body_class('primary') ?>  >
<?php get_template_part('partials/content', 'header') ?>
<style>
        #nav-item-search, .mobile-controls .toggle-search {
            display:none;
        }
       .mobile-controls .mobile-header-icons  {
            display: block;
            height: 61px;
            width: 100%;
            cursor: default;
       }

       .non_divi_builder.title_not_displayed .main-primary {
       		padding-top: 0;
       }

		.section-search {
			width: 100%;
		}
    </style>

<div id="page-container">
<div id="et-main-area">


	<main class="main-primary">
        <!--Search result section-->
        <div class="section section-default section-search">
            <div class="container search-results-header">
                <!--Uncomment if you prefer to use original google search box. Be advided that original custom search box is not meeting WCAG accessibility standards. -->
                <!--<gcse:searchbox-only resultsUrl="/serp.html" enableAutoComplete="true"></gcse:searchbox-only>-->
				
                <form id="Search" class="pos-rel" action="<?php echo esc_url(site_url('serp')); ?>">
                    <span class="sr-only" id="SearchInput">Custom Google Search</span>
                    <input type="text" value="<?php echo esc_attr($keyword);?>" id="q" name="q" aria-labelledby="SearchInput" placeholder="Custom Search" class="w-100 height-50 border-0 p-x-sm" />
                    <button type="submit" class="pos-abs gsc-search-button right-0 top-0 width-50 height-50 border-0"><span class="ca-gov-icon-search font-size-30" aria-hidden="true"></span><span class="sr-only">Submit</span></button>
                </form>

            </div>
        </div>
        <div class="section">
            <div class="container">
				<h1>Search Results for: <?php echo esc_attr($keyword);?></h1>
                <gcse:searchresults-only></gcse:searchresults-only>
            </div>
        </div>
    </main>


</div>
</div>
<?php get_footer(); ?>

</body>
</html>
