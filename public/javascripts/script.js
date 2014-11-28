$(document).ready(function() {
    $("#name_div").hide();
    $(".pagination").hide();
    close = document.getElementById("close");
    setTimeout(function(){
        $('#note').fadeOut();// or fade, css display however you'd like.
    }, 1000);
    $("#name_div").hide();
    setTimeout(function(){
        $('#note').display("none");// or fade, css display however you'd like.
    }, 1000);
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
    $("#name").click(function(event) {
        event.stopPropagation();
        $("#name_div").show();
    });
    $("body").click(function () {
        $("#name_div").hide();
    });
});
close.addEventListener('click', function() {
    note = document.getElementById("note");
    note.style.display = 'none';
}, false);
function delete_flash_msg()
    {
        setTimeout(function(){
        $('#note').hide();
    }, 5000);
}