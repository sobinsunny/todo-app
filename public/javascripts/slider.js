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
        var WaitCount=0;
	$( "#slider" ).slider({
        change: function( event, ui ) {
            var vol = $( "#slider" ).slider( "option", "value" );
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
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
					}
				});
			}
		}, 500);

	  }
	});
 });