$.fn.passwordbox = function(options) {
    var settings = $.extend({
        length: 10,
        onlyDigits: false
    }, options);

    var container = $('<div>', {
        class: "password-box-container inner-addon right-addon"
    });

    var input = $(this);
    input.wrap(container)
    input.before($("<i>", {
        class: "fa fa-search btn-generate",
    }));

    function generate() {
        var passwordGenerator = window.getPassword;
        if (!passwordGenerator) {
            throw new Error("Generator not found")
        }

        var newPassword = passwordGenerator(settings.length, settings.onlyDigits);
        input.val(newPassword);
    }

    $(document).on("click", ".btn-generate", generate);
}
