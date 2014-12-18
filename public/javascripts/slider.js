$(document).ready(function() {
    var p_value=$('#slider').data('progress_id')
    var $slider = $("#slider");
    if ($slider.length > 0) {
        $slider.slider({
            min: 5,
            max: 100,
            value: p_value,
            orientation: "horizontal",
            range: "min"
        });
    }

     function upadate_last_div_change_button()
    {
        $( "hr" ).css( "display", "block" );
        $( "hr:last" ).css( "display", "none" );
        $( "div_task_comment:last" ).css( "border-bottom", "1px solid #ccccc" );
    }
        var WaitCount=0;
	$( "#slider" ).slider({
        change: function( event, ui ) {
            var vol = $( "#slider" ).slider( "option", "value" );
            $('#task_progres_count').html(+vol+"%");
            var task_id=$(this).data("id")
            WaitCount++;
             setTimeout(function(){
                  WaitCount--;
                    if(WaitCount<=0) {
                        var formURL = "   /tasks/update_task_progess"
                        $.ajax(
                            {
                                url: formURL,
                                type: "POST",
                                data: {
                                    task: {
                                        task_range: vol,
                                        task_id:task_id
                                    }
                                },
                                success: function (data, textStatus, jqXHR) {
                                    $("#comment_partial_div").html(data);
                                    upadate_last_div_change_button()

                                },
                                error: function (jqXHR, textStatus, errorThrown) {
					}
				});
			}
		}, 1000);

	  }
	});
 });