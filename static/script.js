// item selection
$("li").click(function() {
    $(this).toggleClass("selected");
    if ($("li.selected").length === 0) {
        $(".select").removeClass("selected");
    } else {
        $(".select").addClass("selected");
    }
    counter();
});

// all item selection
$(".select").click(function() {
    if ($("li.selected").length === 0) {
        $("li").addClass("selected");
        $(".select").addClass("selected");
    } else {
        $("li").removeClass("selected");
        $(".select").removeClass("selected");
    }
    counter();
});

// number of selected items
function counter() {
    if ($("li.selected").length > 0) {
        $("button").addClass("selected");
    } else {
        $("button").removeClass("selected");
    }
    $("button").attr("data-counter", $("li.selected").length);
}

$(".edit").click(function() {
    debugger;
});
