$(".pagination").hide();
$(".delete_div").hide();


function image_ok(task_id)
{
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

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
}

function image_done(task_id,user_id)
{

    task_name=task_id
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

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

}
//function password_change()
//{
//    var str1 = $.trim($('#user_new_password').val());
//    var str2 = $.trim($('#user_new_password_confirm').val());
//    if(str1==str2){
//        $.ajax(
//            {
//                url: '/users/changepassword',
//                type: "PUT",
//                data: {
//                    task : {
//                        new_password : str1
//                    }
//                },
//                success: function (data, textStatus, jqXHR) {
//
//                    $("#content_area").html(data);
//
//                },
//                error: function (jqXHR, textStatus, errorThrown) {
//                }
//            });
//
//    }
//    else
//    {
//        alert ("password mismatch")
//    }
//}

function image_up(task_id)
{
    task_name=task_id
    order_id=$(this).data("order_id");
    var formURL = "/tasks/changeorder_up";
    $.ajax(
        {
            url: formURL,
            type: "PUT",
            data: {
                task : {
                    order_id : order_id,
                    task_id:task_name

                }
            },
            success: function (data, textStatus, jqXHR) {

                $("#content_area").html(data);

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

}
//task up image



function image_up(task_id)
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
                    order_id: order_id,
                    task_id:task_name

                }
            },
            success: function (data, textStatus, jqXHR) {

                $("#content_area").html(data);

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

}
$(function(){

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
                img: 'http://i.imgur.com/6RMhx.gif'
            }
        },
        // trigger Masonry as a callback
        function( newElements ) {
            // hide new items while they are loading
            var $newElems = $( newElements ).css({ opacity: 0 });
            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function(){
                // show elems now they're ready
                $newElems.animate({ opacity: 1 });
                $(".delete_div").hide();
                $container.masonry( 'appended', $newElems, true );

            });
        }
    );
});
function delete_req(id)
{
    $("#delete_" + id).show();
}
function delete_task(user_id,id)
    {
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
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });

        return false;

    }
function cancel_delete(id)
{
    $("#delete_"+id).hide();
    return false;
    e.preventDefault();	//STOP default action
}