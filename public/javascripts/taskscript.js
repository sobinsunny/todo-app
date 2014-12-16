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
