$(document).ready(function() {
    $("#name_div").hide();
    $(".pagination").hide();
    $(".modal").hide();
    $('#search_image').hide();
    upadate_last_div_change_button();
    close = document.getElementById("close");
    setTimeout(function(){
        $('#note').fadeOut();// or fade, css display however you'd like.
    }, 1000);
    $('#textbox1').click(function(){
        $('#img_textbox').hide();
        $('#textbox1').css({"padding":"10px"});
    });
    $("#name_div").hide();
    $("#textbox1").keypress(function (e) {
        if (e.keyCode == 13) {
            var task_name = $(this).val()
            if (task_name.length == 0)
            {
                return false;
            }
            else {
                var formURL = "/tasks/create"
                $.ajax(
                    {
                        url: formURL,
                        type: "POST",
                        data: {
                            task: {
                                task: task_name
                            }
                        },
                        success: function (data, textStatus, jqXHR) {
                            $("#content_area").html(data);
                            $("#textbox1").val("");
                            $(".pagination").hide();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        }
                    });
            }
        }

    });
    function upadate_last_div_change_button()
    {
        $( "hr" ).css( "display", "block" );
        $( "hr:last" ).css( "display", "none" );
        $( "div_task_comment:last" ).css( "border-bottom", "1px solid #ccccc" );
    }

    $("#comment_box").keypress(function (e) {
        if (e.keyCode == 13) {
            var comment = $(this).val()
            var id=$(this).data("task_id")
            if (comment.length == 0)
            {
                return false;
            }
            else {
                var formURL = "  /users/1/tasks/"+id+"/comments"
                $.ajax(
                    {
                        url: formURL,
                        type: "POST",
                        data: {
                            task: {
                                body: comment
                            }
                        },
                        success: function (data, textStatus, jqXHR) {
                            $("#comment_partial_div").html(data);
                            upadate_last_div_change_button();
                            $("#comment_box").val("");
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        }
                    });
            }
        }

    });
    $("#search_box").keypress(function (e) {
        if (e.keyCode == 13) {
            var status=0;
            var status= $('#active').data("status")
            var task_name = $(this).val()
            
            if (task_name.length == 0)
            {
                return false;
            }
            else {
               window.location = '/tasks?search='+task_name+'&status='+status;
            }
        }
     });


    $("#name").click(function(event) {
        event.stopPropagation();
        $("#name_div").show();
    });
    $("body").click(function () {
        $("#name_div").hide();
    });








});

function share_task(task_id) {
    var user_id_share=$('form').serialize()+ '&task_id=' + task_id
    var formURL = "/tasks/share_task"
    $.ajax(
        {
            url: formURL,
            type: "POST",
            data: user_id_share,

            success: function (data, textStatus, jqXHR) {

                $("#share_div_partials").html(data);

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
}
function share_task_name_dispaly(task_id) {
    var formURL = "/tasks/share_name_display"
    $.ajax(
        {
            url: formURL,
            type: "POST",
            data: {
                task: {
                          task_id:task_id
                     }
            },
            success: function (data, textStatus, jqXHR) {
                $("#modal-body").html(data);

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });


}
