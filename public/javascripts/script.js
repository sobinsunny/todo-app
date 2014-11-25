$(document).ready(function() {
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

//
                            $("#textbox1").val("");

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        }

                    });
            }
        }

    });

    $("#name").click(function(event){

        event.stopPropagation();
        $("#name_div").show();
    });
    $("body").click(function () {
        $("#name_div").hide();
    });
});