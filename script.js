var audio = new Audio('error.wav');
var audio1 = new Audio('otp.wav');
submit.addEventListener('click', () => {
    if (email.value !== '') {
        submit.value = 'Please Wait...'
        const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        checkEmail = valid.test(email.value);
        if (checkEmail) {
            const obj = {
                'email': email.value
            }
            const jsonobj = JSON.stringify(obj);
            var url = 'http://localhost/php/otp%20login/raj.php'
            var raj = {
                method: "post",
                Headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonobj
            }
            fetch(url, raj).then((value) => {
                return value.json();
            }).then((result) => {
                console.log(result.status);
                if (result.status == true) {
                    audio1.play();
                    otp.type = 'number'
                    submit.type = 'hidden'
                    verify.type = 'button'
                    email.readOnly = true;
                    error.innerHTML = result.message
                    error.style.color = '#00B241'
                } else {
                    error.innerHTML = result.message
                    error.style.color = 'red'
                    email.style.border = 'solid red 1.5px'
                    email.classList.add('error')
                    submit.value = 'Send OTP'
                    audio.play();
                }
            })
        } else {
            error.innerHTML = 'Invalid Email'
            email.style.border = 'solid red 1.5px'
            email.classList.add('error')
            submit.value = 'Send OTP'
            audio.play();
        }
        email.addEventListener('keyup', () => {
            if (email.value == '') {
                error.innerHTML = ''
                email.style.border = 'none'
                email.classList.remove('error')
            }
        })
    }


    else {
        error.innerHTML = 'Please Enter Email'
        email.style.border = 'solid red 1.5px'
        email.classList.add('error')
        audio.play();
        email.addEventListener('keyup', () => {
            error.innerHTML = ''
            email.style.border = 'none'
            email.classList.remove('error')
        })
    }
})
verify.addEventListener('click', () => {
    if (otp.value !== '') {
        verify.value = 'Verifying...'
        var obj = {
            'otp': otp.value,
            'email': email.value
        }
        var objJSON = JSON.stringify(obj); // Convert the object to JSON

        var raj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: objJSON
        };

        var url = "http://localhost/php/otp%20login/raj.php";

        fetch(url, raj).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            if (data.status == true) {
                error.innerHTML = data.message
                error.style.color = '#00B241'
                otp.type = 'hidden'
                pass.type = 'text'
                verify.type = 'hidden'
                login.type = 'button'

            }
            else {
                error.innerHTML = data.message
                error.style.color = 'red'
                audio.play();
                otp.classList.add('error');
                otp.style.border = 'solid red .5px'
                verify.value = 'Verify'
            }


        })

    } else {
        error.innerHTML = 'Please Enter OTP'
        error.style.color = 'red'
        otp.style.border = 'solid red 1.5px'
        otp.classList.add('error')
        verify.value = 'Verify'
        audio.play();
        otp.addEventListener('keyup', () => {
            error.innerHTML = ''
            otp.style.border = 'none'
            otp.classList.remove('error')
        })
    }

});
otp.addEventListener('keyup', () => {
    error.innerHTML = ''
})
pass.addEventListener('keyup', () => {
    error.innerHTML = ''
})

login.addEventListener('click', () => {
    if (pass.value !== '') {
        login.value = 'Login...'
        var obj = {
            'password': pass.value,
            'email': email.value
        }
        var objJSON = JSON.stringify(obj); // Convert the object to JSON

        var raj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: objJSON
        };

        var url = "http://localhost/php/otp%20login/raj.php";

        fetch(url, raj).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            if (data.status == true) {
                error.innerHTML = data.message
                error.style.color = '#00B241'
                login.value = 'Login'
                window.location.replace('welcome.php');
            }
            else {
                error.innerHTML = data.message
                error.style.color = 'red'
                audio.play();
                pass.classList.add('error');
                pass.style.border = 'solid red .5px'
                login.value = 'Login'
            }
        })

    } else {
        error.innerHTML = 'Please Enter Password'
        error.style.color = 'red'
        pass.style.border = 'solid red 1.5px'
        pass.classList.add('error')
        verify.value = 'Verify'
        audio.play();
        pass.addEventListener('keyup', () => {
            error.innerHTML = ''
            pass.style.border = 'none'
            pass.classList.remove('error')
        })
    }

})