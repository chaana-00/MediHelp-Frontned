$('#btnSignIn').click(function () {
    let loginUserEmail = $('#txtSignInEmail').val();
    let loginPassword = $('#txtSignInPassword').val();

    $.ajax({
        url: `http://localhost:5000/users/email/${loginUserEmail}`,
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            if (res.email === loginUserEmail && res.password === loginPassword) {
                alert('Sign In Success!')
                window.location.href = "../index.html";
                localStorage.setItem("mediHelpUserId", res.id);
                localStorage.setItem("mediHelpUserEmail", res.email);
                localStorage.setItem("mediHelpUserName", res.name);
            } else {
                alert("User Password Wrong!");
            }
        },
        error: function (ob, textStatus, error) {
            $.ajax({
                url: `http://localhost:5000/admin/email/${loginUserEmail}`,
                method: 'GET',
                async: false,
                dataType: 'json',
                success: function (res) {
                    if (res.email === loginUserEmail && res.password === loginPassword) {
                        localStorage.setItem("mediHelpAdminId", res.id);
                        localStorage.setItem("mediHelpAdminEmail", res.email);
                        alert('Sign In Success!');
                        window.location.href = "./adminIndex.html";
                    } else {
                        alert("Admin Password Wrong!");
                    }
                },
                error: function (ob, textStatus, error) {
                    alert("User Not Register!");
                }
            });
        }
    });
});

$('#btnSignUp').click(function () {

    const namePattern = /^[a-zA-Z\s]{1,100}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nicPattern = /^(\d{9}[vVxX]|\d{12})$/;
    const mobilePattern = /^0\d{9}$/;

    let name = $('#txtSignUpFullName').val();
    let email = $('#txtSignUpEmail').val();
    let nic = $('#txtSignUpNic').val();
    let age = $('#txtSignUpAge').val();
    let gender = $('#txtGender').val();
    let address = $('#txtSignUpAddress').val();
    let mobile = $('#txtSignUpMobile').val();
    let password = $('#txtSignUpPassword').val();

    if (!namePattern.test(name)) {
        alert('Invalid name. Please enter a valid name.');
        return;
    }

    if (!emailPattern.test(email)) {
        alert('Invalid email. Please enter a valid email address.');
        return;
    }

    if (!nicPattern.test(nic)) {
        alert('Invalid NIC. Please enter a valid NIC.');
        return;
    }

    if (!mobilePattern.test(mobile)) {
        alert('Invalid mobile number. Please enter a valid mobile number.');
        return;
    }

    if (!passwordPattern.test(password)) {
        alert('Invalid password. Please enter a strong password with at least 8 characters, including one uppercase, one lowercase, one digit, and one special character.');
        return;
    }

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('nic', nic);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('mobile', mobile);
    formData.append('img', $('#fileUpload')[0].files[0]);
    formData.append('password', password);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/users/create',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            alert(response.message);
            window.location.href = "../pages/SignIn.html";
        },
        error: function (error) {
            if (error.responseJSON && error.responseJSON.error) {
                alert(error.responseJSON.error);
            } else {
                alert('An error occurred while signing up.');
            }
        }
    });
});

