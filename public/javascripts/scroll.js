$(function(){

function upadate_orderchange_button() {
    $( ".img_up" ).css( "display", "block" );
    $( ".img_down" ).css( "display", "block" );
    $( ".img_up:first" ).css( "display", "none" );
    $( ".img_down:last" ).css( "display", "none" );
}

    var $container = $('#content_area');
    $container.imagesLoaded(function(){
        $container.masonry({
            itemSelector: 'div_task',
            columnWidth: 100
        });
    });

    $container.infinitescroll({
            navSelector  : '#page-nav',    // selector for the paged navigation
            nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
            itemSelector : '.div_task',     // selector for all items you'll retrieve
            loading: {
                finishedMsg: 'No more pages to load.',
                img: '/images/scrol.gif'
            }
        },
        // trigger Masonry as a callback
        function( newElements ) {
            // hide new items while they are loading
            var $newElems = $( newElements ).css({ opacity: 0 },"slow");
            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function(){
                // show elems now they're ready
                $newElems.animate({ opacity: 1},"slow");
                $container.masonry( 'appended', $newElems, true );
                upadate_orderchange_button();
            });
        }
    );
});