$.fn.passwordbox = function(options) {
    var settings = $.extend({
        length: 10,
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
        var generator = window.getPassword;
        if (!generator) {
            throw new Error("Generator not found")
        }

        var genPass = generator(settings.length, settings.memorable, settings.pattern, settings.prefix);
        input.val(genPass);
    }

    $(document).on("click", ".btn-generate", generate);
}
