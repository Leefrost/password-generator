(function (root) {

    var charset = "";
    charset += "0123456789";
    charset += "abcdefghijklmnopqrstuvwxyz";
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var defaultLength = 10;
    var localname = root.localPasswordGeneratorName || "getPassword";

    var getGeneratorEntropy = function () {
        var statistics;
        var entropy = Math.log(charset.length) * defaultLength / Math.log(2);
        if (entropy < 70)
            statistics = entropy.toFixed(2);
        else if (entropy < 200)
            statistics = entropy.toFixed(1);
        else
            statistics = entropy.toFixed(0);
    };

    var getPassword = function (opt) {

        var options = $.extend({
            length: defaultLength,
            onlyDigits: false
        }, opt);

        if (options.onlyDigits) {
            charset = "0123456789";
        }

        var password = "";
        for (var i = 0; i < options.length; i++)
            password += charset.charAt(randomInt(charset.length));

        return password;
    };

    function getMathRandomPos(n) {
        var x = Math.floor(Math.random() * n);
        return x;
    }

    function getCryptoRandomPos(n) {
        if (typeof Uint32Array === "function" && "crypto" in root && "getRandomValues" in root.crypto) {
            var x = new Uint32Array(1);
            do root.crypto.getRandomValues(x);
            while (x[0] - x[0] % n > 4294967296 - n);
            return x[0] % n;
        } else {
            return 0;
        }
    }

    function randomInt(n) {
        var x = getMathRandomPos(n);
        x = (x + getCryptoRandomPos(n)) % n;
        return x;
    }

    var container = typeof exports !== 'undefined' ? exports : root;
    container[localname] = getPassword;
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = getPassword;
        }
    }
})(this);