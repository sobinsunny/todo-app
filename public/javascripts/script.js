$(document).ready(function(){
    $("#name_div").hide();
    $("#textbox1").keypress(function(e){

        if (e.keyCode == 13) {
            var task_name = $(this).val()

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

//
                        $("#textbox1").val(" ");

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }

                });
        }

    });
    $("#name").click(function () {
        $("#name_div").show();
    });
//    $(".img_close").bind("click",function(e){
//        task_name=$(this).data("id");
//        user_id=$(this).data("user_id");
//        alert(task_name);
//        var formURL = "/users/"+user_id+"/tasks/"+task_name+"";
//
//        $.ajax(
//            {
//                url: formURL,
//                type: "DELETE",
//                data: {
//                    task : {
//                        delete_id : task_name
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
//
//        e.preventDefault();	//STOP default action
//    });
//        $(".img_done").click(function(e){
//            task_name=$(this).data("id");
//            user_id=$(this).data("user_id");
//            alert(task_name);
//            var formURL = "/users/"+user_id+"/tasks/"+task_name;
//
//            $.ajax(
//                {
//                    url: formURL,
//                    type: "PUT",
//                    data: {
//                        task : {
//                            status_id : task_name
//                        }
//                    },
//                    success: function (data, textStatus, jqXHR) {
//
//                        $("#content_area").html(data);
//
//                    },
//                    error: function (jqXHR, textStatus, errorThrown) {
//                    }
//                });
//
//
//            e.preventDefault();	//STOP default action
//        });

});
//$(document).bind(".img_close","click",function(e){
//    task_name=$(this).data("id");
//    user_id=$(this).data("user_id");
//    var formURL = "/users/"+user_id+"/tasks/"+task_name;
//
//    $.ajax(
//        {
//            url: formURL,
//            type: "DELETE",
//            data: {
//                task : {
//                    delete_id : task_name
//                }
//            },
//            success: function (data, textStatus, jqXHR) {
//                $("#content_area").html(data);
//
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//            }
//        });
//
//
//    e.preventDefault();	//STOP default action
//});
//$(document).bind(".img_done","click",function(e){
//    task_name=$(this).data("id");
//    user_id=$(this).data("user_id");
//    alert(task_name);
//    var formURL = "/users/"+user_id+"/tasks/"+task_name;
//
//    $.ajax(
//        {
//            url: formURL,
//            type: "PUT",
//            data: {
//                task : {
//                    status_id : task_name
//                }
//            },
//            success: function (data, textStatus, jqXHR) {
//
//                $("#content_area").html(data);
//
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//            }
//        });
//
//
//    e.preventDefault();
//});
////task up image
//$(document).bind(".img_up","click",function(e){
//    task_name=$(this).data("id");
//    order_id=$(this).data("order_id");
//    var formURL = "/tasks/changeorder_up";
//
//    $.ajax(
//        {
//            url: formURL,
//            type: "PUT",
//            data: {
//                task : {
//                    order_id : order_id,
//                    task_id:task_name
//
//                }
//            },
//            success: function (data, textStatus, jqXHR) {
//
//                $("#content_area").html(data);
//
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//            }
//        });
//
//
//    e.preventDefault();
//});
//    $(document).bind(".img_down","click",function(e){
//    task_name=$(this).data("id");
//    order_id=$(this).data("order_id");
//    var formURL = "/tasks/changeorder_down";
//
//    $.ajax(
//        {
//            url: formURL,
//            type: "PUT",
//            data: {
//                task : {
//                    order_id : order_id,
//                    task_id:task_name
//
//                }
//            },
//            success: function (data, textStatus, jqXHR) {
//
//                $("#content_area").html(data);
//
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//            }
//        });
//
//
//    e.preventDefault();
//});

