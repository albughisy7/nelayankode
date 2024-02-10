// Function ubah tinggi element
function changeHeight() {
    var t_post = $(".post-title").innerHeight();
    var t_main = $(".main-content").height();
    var hasil = t_main - t_post;
    $(".content").height(hasil);

    var t_code = $(".code").innerHeight();
    var t_code_c = t_code - 60;
    $(".code-c").height(t_code_c);
}

changeHeight();

window.addEventListener("resize", changeHeight);

var resizer = document.querySelector(".resizer"),
    sidebar = document.querySelector(".content-left");

function initResizerFn(resizer, sidebar) {
    // track current mouse position in x var
    var x, w;

    function rs_mousedownHandler(e) {
        x = e.clientX;

        var sbWidth = window.getComputedStyle(sidebar).width;
        w = parseInt(sbWidth, 10);

        document.addEventListener("mousemove", rs_mousemoveHandler);
        document.addEventListener("mouseup", rs_mouseupHandler);
    }

    function rs_mousemoveHandler(e) {
        var dx = e.clientX - x;

        var cw = w + dx; // complete width
        var content = $(".content").width() - 300;

        if (cw < content && cw > 200) {
            sidebar.style.width = `${cw}px`;
        }
        sidebar.style.userSelect = "none";
    }

    function rs_mouseupHandler() {
        // remove event mousemove && mouseup
        document.removeEventListener("mouseup", rs_mouseupHandler);
        document.removeEventListener("mousemove", rs_mousemoveHandler);
        sidebar.style.userSelect = "auto";
    }

    resizer.addEventListener("mousedown", rs_mousedownHandler);
}

initResizerFn(resizer, sidebar);

// MENAMPILKAN OUTPUT
function run() {
    let htmlCode = $("#c-html").val();
    let cssCode = "<style>" + $("#c-css").val() + "</style>";
    let jsCode = $("#c-js").val();
    let output = document.getElementById("output");

    output.contentDocument.body.innerHTML = cssCode + htmlCode;

    output.contentWindow.eval(jsCode);
}

// MENGATUR TAB PADA TEXTAREA
$(".code").on("keydown", ".code-c", function (e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.value =
            this.value.substring(0, start) + "\t" + this.value.substring(end);

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;
    }
});

run();

$(".code-c").keyup(function () {
    run();
});
