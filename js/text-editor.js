function makeTextBold() {
    document.execCommand('bold', false, null);
}

function makeTextItalic() {
    document.execCommand('italic', false, null);
}

function makeTextUnderline() {
    document.execCommand('underline', false, null);
}

function alignTextLeft() {
    document.execCommand('justifyLeft', false, null);
}

function alignTextCenter() {
    document.execCommand('justifyCenter', false, null);
}

function alignTextRight() {
    document.execCommand('justifyRight', false, null);
}

function changeTextColor(color) {
    var editor = document.getElementsByClassName("editor")[0];
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var span = document.createElement("span");
        span.style.color = color;
        span.appendChild(range.extractContents());
        range.insertNode(span);
    }
    editor.focus();
}