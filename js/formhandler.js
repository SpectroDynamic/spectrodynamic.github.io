$(document).ready(function () {
    $('form#contact-form').submit(function () {
        $('form#contact-form .error').remove();
        var hasError = false;
        $('.requiredField').each(function () {
            if (jQuery.trim($(this).val()) == '') {
                var labelText = $(this).prev('label').text();
                $(this).parent().append('<span class="error">You forgot to enter your ' + labelText + '</span>');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test(jQuery.trim($(this).val()))) {
                    var labelText = $(this).prev('label').text();
                    $(this).parent().append('<span class="error">You entered an invalid ' + labelText + '</span>');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });
        if (!hasError) {
            $('form#contact-form input.submit').fadeOut('normal', function () {
                $(this).parent().append('');
            });
            var showCount = 0;
            var data = getFormData(); // get the values submitted in the form
            var url = this.action; //
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                // console.log(xhr.status, xhr.statusText)
                // console.log(xhr.responseText);
                if(showCount == 0){
                    var htmlMessage = "";
                    if (xhr.status == "200") {
                        $("div#contact-section h2").html("Thank you for contacting!");
                        htmlMessage = '<div class="alert alert-success"><h2><strong>Thank you ' + data.name + '</strong> for contacting us!<br/>We have received your message and will get back to you soon!</h2></div>'
                    } 
                    else {
                        htmlMessage = '<div class="alert alert-danger"><h2>Unable to send the message.<br/>Please try again later!</h2></div>';
                    }
                    $('form#contact-form').slideUp("fast", function () {
                        $(this).before(htmlMessage);
                    });
                    showCount++;
                }
                return;
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }).join('&')
            xhr.send(encoded);
        }
        return false;
    });
});

// get all data in form and return object
function getFormData() {
    var elements = document.getElementById("contact-form").elements; // all form elements
    var fields = Object.keys(elements).map(function (k) {
        if (elements[k].name !== undefined) {
            return elements[k].name;
            // special case for Edge's html collection
        } else if (elements[k].length > 0) {
            return elements[k].item(0).name;
        }
    }).filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    var data = {};
    fields.forEach(function (k) {
        data[k] = elements[k].value;
        var str = ""; // declare empty string outside of loop to allow
        // it to be appended to for each item in the loop
        if (elements[k].type === "checkbox") { // special case for Edge's html collection
            str = str + elements[k].checked + ", "; // take the string and append 
            // the current checked value to 
            // the end of it, along with 
            // a comma and a space
            data[k] = str.slice(0, -2); // remove the last comma and space 
            // from the  string to make the output 
            // prettier in the spreadsheet
        } else if (elements[k].length) {
            for (var i = 0; i < elements[k].length; i++) {
                if (elements[k].item(i).checked) {
                    str = str + elements[k].item(i).value + ", "; // same as above
                    data[k] = str.slice(0, -2);
                }
            }
        }
    });
    console.log(data);
    return data;
}