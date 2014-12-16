$(".pagination").hide();
$(".delete_div").hide();
$("#name_div").hide();
$(".modal").hide();

$(document).ready(function() {
    upadate_orderchange_button();
    $("#name_div").hide();
    setTimeout(function(){
        $('.alert').fadeOut();// or fade, css display however you'd like.
    }, 5000);

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
    $("#slider").slider({
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
		}, 5000);

	  }
	});

});

var progres_val=$(this).data("progress_id");



    function upadate_orderchange_button() {
    $( ".img_up" ).css( "display", "block" );
    $( ".img_down" ).css( "display", "block" );
    $( ".img_up:first" ).css( "display", "none" );
    $( ".img_down:last" ).css( "display", "none" );
}

function image_ok(task_id) {
    task_name=task_id
    user_id=$(this).data("user_id");
    var formURL = "/users/"+user_id+"/tasks/"+task_name;
    $.ajax(
    {
        url: formURL,
        type: "PUT",
        data: {
            task : {
                status_id : task_name
            }
        },
        success: function (data, textStatus, jqXHR) {

            $("#content_area").html(data);
            $(".pagination").hide();
            scroll_fun();

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function image_done(task_id,user_id) {
    task_name=task_id
    var formURL = "/tasks/"+task_name;

    $.ajax(
        {
        url: formURL,
        type: "PUT",
        data: {
            task : {
                status_id : task_name
            }
        },
        success: function (data, textStatus, jqXHR) {

            $("#content_area").html(data);
            $(".pagination").hide();
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

}



function image_comment_ok(task_id) {
    task_name=task_id
    user_id=$(this).data("user_id");
    var formURL = "/users/"+user_id+"/tasks/"+task_name;
    $.ajax(
        {
            url: formURL,
            type: "PUT",
            data: {
                task : {
                    status_id : task_name
                }
            },
            success: function (data, textStatus, jqXHR) {
                $(".pagination").hide();
                $('#ok').removeClass('img_ok');
                $('#ok').addClass('img_done');
                location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
}

function image_comment_done(task_id,user_id) {
    task_name=task_id
    var formURL = "/tasks/"+task_name;

    $.ajax(
        {
            url: formURL,
            type: "PUT",
            data: {
                task : {
                    status_id : task_name
                }
            },
            success: function (data, textStatus, jqXHR) {

                $(".pagination").hide();
                $('#ok').removeClass('img_done');
                $('#ok').addClass('img_ok');
                location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

}

function image_up(task_id)
{
    task_name=task_id
    var formURL = "/tasks/changeorder_up";
    $.ajax(
    {
    url: formURL,
    type: "PUT",
    data: {
        task : {
                     task_id:task_name
        }
    },
    success: function (data, textStatus, jqXHR) {

        $("#content_area").html(data);
        $(".pagination").hide();
        upadate_orderchange_button();
        scroll_fun();

    },
    error: function (jqXHR, textStatus, errorThrown) {
    }
    });

}
function image_down(task_id)
{
    task_name=task_id
    order_id=$(this).data("order_id");
    var formURL = "/tasks/changeorder_down";
    $.ajax(
        {
        url: formURL,
        type: "PUT",
        data: {
            task : {
                task_id:task_name

            }
        },
        success: function (data, textStatus, jqXHR) {

            $("#content_area").html(data);
            upadate_orderchange_button();
            $(".pagination").hide();
            scroll_fun();

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

}
$(function scroll_fun(){
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
            finishedMsg: 'No more pages to load.'

        }
    },
    function( newElements ) {
        var $newElems = $( newElements ).css({ opacity: 0 });
        $newElems.imagesLoaded(function(){
            $newElems.animate({ opacity: 1 });
            $(".delete_div").hide();
            upadate_orderchange_button();
            $container.masonry( 'appended', $newElems, true );
        });
    });
});
function delete_req(id)
{
    $("#delete_" + id).show();
}
function delete_task(user_id,id) {
    $("#delte_div_"+id).show();
    var formURL = "/users/" + user_id + "/tasks/" + id;
    $.ajax(
        {
            url: formURL,
            type: "DELETE",
            data: {
                task: {
                    delete_id:id
                }
            },
            success: function (data, textStatus, jqXHR) {
                $("#content_area").html(data);
                upadate_orderchange_button();
                window.location="http://localhost:3000/tasks";
                $(this).remove()
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    return false;
}
function cancel_delete(id) {
    $("#delete_"+id).hide();
    return false;
    e.preventDefault();	//STOP default action
}
