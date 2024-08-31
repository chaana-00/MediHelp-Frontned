loadUsers();
loadDoctors();
getTotalUsers();
getTotalDoctors();
getTotalUnder20();
getMostGender();

// ======================================================================================================= Click Actions
$('#btnAccount').click(function () {
    let userEmail = localStorage.getItem("mediHelpUserEmail");

    if (userEmail === null) {
        alert("Please Sign In Your Account");
        window.location.href = "./pages/signIn.html";
    } else {
        $('#hero').css({
            'display': 'none'
        });
        $('#about').css({
            'display': 'none'
        });
        $('#stats').css({
            'display': 'none'
        });
        $('#services').css({
            'display': 'none'
        });
        $('#doctors').css({
            'display': 'none'
        });
        $('#departments').css({
            'display': 'none'
        });
        $('#faq').css({
            'display': 'none'
        });
        $('#testimonials').css({
            'display': 'none'
        });
        $('#gallery').css({
            'display': 'none'
        });
        $('#contact').css({
            'display': 'none'
        });
        $('#userPage').css({
            'display': 'block'
        });
        $('#btnPrediction').css({
            'display': 'block'
        });
        $('#btnPredictionHistory').css({
            'display': 'block'
        });
        $('#predictionPage').css({
            'display': 'none'
        });
        $('#chatbotPage').css({
            'display': 'none'
        });
        $('#userPredictionHistoryPage').css({
            'display': 'none'
        });
        userDetailsSet();
    }
});

$('#btnPrediction').click(function () {
    $('#userPage').css({
        'display': 'none'
    });
    $('#predictionPage').css({
        'display': 'block'
    });
    $('#chatbotPage').css({
        'display': 'none'
    });
    $('#userPredictionHistoryPage').css({
        'display': 'none'
    });
});

$('#btnPredictionHistory').click(function () {
    $('#userPage').css({
        'display': 'none'
    });
    $('#predictionPage').css({
        'display': 'none'
    });
    $('#chatbotPage').css({
        'display': 'none'
    });

    $('#userPredictionHistoryPage').css({
        'display': 'block'
    });
    loadUserPredictions();
});

$('#btnChatBot').click(function () {

    let userEmail = localStorage.getItem("mediHelpUserEmail");

    if (userEmail === null) {
        alert("Please Sign In Your Account");
        window.location.href = "./pages/signIn.html";
    } else {
        $('#hero').css({
            'display': 'none'
        });
        $('#about').css({
            'display': 'none'
        });
        $('#stats').css({
            'display': 'none'
        });
        $('#services').css({
            'display': 'none'
        });
        $('#doctors').css({
            'display': 'none'
        });
        $('#departments').css({
            'display': 'none'
        });
        $('#faq').css({
            'display': 'none'
        });
        $('#testimonials').css({
            'display': 'none'
        });
        $('#gallery').css({
            'display': 'none'
        });
        $('#contact').css({
            'display': 'none'
        });
        $('#userPage').css({
            'display': 'none'
        });
        $('#predictionPage').css({
            'display': 'none'
        });
        $('#chatbotPage').css({
            'display': 'block'
        });
        $('#userPredictionHistoryPage').css({
            'display': 'none'
        });
    }
});

$('#btnUserUpdate').click(function () {
    userDetailsUpdate();
});

$('#btnUserDelete').click(function () {
    userAccountDelete();
});

$('#btnSkinCheck').click(function () {
    prediction();
});

$('#btnSignOut').click(function () {
    localStorage.removeItem("mediHelpUserId");
    localStorage.removeItem("mediHelpUserEmail");
    localStorage.removeItem("mediHelpUserAge");
    localStorage.removeItem("mediHelpUserName");
    window.location.href = "./index.html";
});

$('#skinFileUpload').on('change', function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#btnSkinImage').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    }
});

// =========================================================================================================== Functions
function loadUserPredictions() {

    $('#tblPredictionHistoryBody').empty();

    let userId = localStorage.getItem("mediHelpUserId");

    $.ajax({
        url: `http://localhost:5000/prediction/user/${userId}`,
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            res.forEach(prediction => {
                let id = prediction[0];
                let userId = prediction[1];
                let predictionText = prediction[4];
                let datetime = prediction[3];
                let age = prediction[2];

                $('#tblPredictionHistoryBody').append(`
                    <tr>
                        <td>${id}</td>
                        <td>${userId}</td>
                        <td>${predictionText}</td>
                        <td>${datetime}</td>
                        <td>${age}</td>
                    </tr>
                `);
            });

        },
        error: function (xhr, textStatus, error) {
            console.error('Error loading user predictions:', error);
        }
    });
}

function userDetailsSet() {
    try {

        let mediHelpUserEmail = localStorage.getItem("mediHelpUserEmail");

        $.ajax({
            url: `http://localhost:5000/users/email/${mediHelpUserEmail}`,
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function (res) {
                $('#userUserName').val(res.name);
                $('#userUserEmail').val(res.email);
                $('#userUserNic').val(res.nic);
                $('#userUserPassword').val(res.password);
                $('#userUserAge').val(res.age);
                $('#userUserGender').val(res.gender);
                $('#userUserAddress').val(res.address);
                $('#userUserMobile').val(res.mobile);
                $('#userImage').attr('src', "http://localhost:5000/" + res.img);

                localStorage.setItem("mediHelpUserAge", res.age);

            },
            error: function (ob, textStatus, error) {
                alert("User Not Register!")
            }
        });
    } catch (e) {
    }
}

function userDetailsUpdate() {

    let mediHelpUserId = localStorage.getItem("mediHelpUserId");
    let userDetailsUpdateForm = new FormData();
    let userEmail = $('#userUserEmail').val();

    userDetailsUpdateForm.append('name', $('#userUserName').val());
    userDetailsUpdateForm.append('email', $('#userUserEmail').val());
    userDetailsUpdateForm.append('nic', $('#userUserNic').val());
    userDetailsUpdateForm.append('age', $('#userUserAge').val());
    userDetailsUpdateForm.append('gender', $('#userUserGender').val());
    userDetailsUpdateForm.append('address', $('#userUserAddress').val());
    userDetailsUpdateForm.append('mobile', $('#userUserMobile').val());
    userDetailsUpdateForm.append('img', $('#fileUpload')[0].files[0]);
    userDetailsUpdateForm.append('password', $('#userUserPassword').val());


    $.ajax({
        url: `http://localhost:5000/users/update/${mediHelpUserId}`,
        type: 'PUT',
        data: userDetailsUpdateForm,
        processData: false,
        contentType: false,
        success: function (response) {
            localStorage.setItem("mediHelpUserEmail", userEmail);
            alert('User Update successfully!');
            userDetailsSet();
        },
        error: function (xhr, status, error) {
        }
    });
}

function userAccountDelete() {

    let mediHelpUserId = localStorage.getItem("mediHelpUserId");

    $.ajax({
        url: `http://localhost:5000/users/delete/${mediHelpUserId}`,
        type: 'DELETE',
        success: function (response) {
            localStorage.removeItem("mediHelpUserEmail");
            localStorage.removeItem("mediHelpUserId");
            alert(response.message);
            window.location.href = "index.html";
        },
        error: function (xhr) {
        }
    });
}

function loadUsers() {
    $('#tblAdminUserBody').empty();
    $.ajax({
        url: 'http://localhost:5000/users/all',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            for (let i in res.data) {
                let id = res.data[i][0];
                let name = res.data[i][1];
                let email = res.data[i][2];
                let nic = res.data[i][3];
                let age = res.data[i][4];
                let gender = res.data[i][5];
                let address = res.data[i][6];
                let mobile = res.data[i][7];
                let img = res.data[i][8];

                $('#tblAdminUserBody').append(`<tr data-id="${id}" data-name="${name}" data-email="${email}" data-nic="${nic}" data-age="${age}" data-gender="${gender}" data-address="${address}" data-mobile="${mobile}" data-img="${img}">

<td>${id}</td><td>${name}</td><td>${email}</td> <td>${nic}</td><td>${age}</td><td>${gender}</td><td>${address}</td><td>${mobile}</td><td>${img}</td></tr>`);
            }


            $('#tblAdminUserBody tr').click(function () {
                let rowData = $(this).data();
                $('#userName').val(rowData.name);
                $('#userEmail').val(rowData.email);
                $('#userNic').val(rowData.nic);
                $('#userAge').val(rowData.age);
                $('#userGender').val(rowData.gender);
                $('#userAddress').val(rowData.address);
                $('#userMobile').val(rowData.mobile);
                $('#userImage').attr('src', "http://localhost:5000/" + rowData.img);
                sessionStorage.setItem("mediHelpSelectUserID", rowData.id)
            });
        }
    });
}

function sendResult(
    EMAIL,
    NAME,
    NIC,
    AGE,
    ADDRESS,
    MOBILE,
    PREDICTION,
    DOC_NAME,
    DOC_CONTACT,
    HOSPITAL
) {
    var params = {
        user_email: EMAIL,
        name: NAME,
        nic: NIC,
        age: AGE,
        address: ADDRESS,
        mobile: MOBILE,
        prediction: PREDICTION,
        doc_name: DOC_NAME,
        doc_contact: DOC_CONTACT,
        hospital: HOSPITAL
    }
    emailjs.send("service_6ykt2tj", "template_p8b1sji", params).then(function (res) {
        alert("Email Send Success !");
    });
}


function prediction() {

    let formData = new FormData();
    formData.append('file', $('#skinFileUpload')[0].files[0]);

    $.ajax({
        url: 'http://localhost:5000/prediction',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            const filteredClassification = response.classification;

            let classification = '';

            function extractClassification(filteredClassification) {
                const regex = /Class:\s*\d+\s+(.+),\s*Confidence Score:/;
                const match = filteredClassification.match(regex);

                if (match && match[1]) {
                    const extractedClass = match[1].trim();

                    const wantedClasses = [
                        'SI - Samaple-Images',
                        'BA - Cellulitis',
                        'BA - Impetigo',
                        'FU - Athlete Foot',
                        'FU - Ringworm'
                    ];

                    if (wantedClasses.includes(extractedClass)) {
                        classification = extractedClass;
                    }
                }
            }

            extractClassification(filteredClassification);

            $('#result').empty();

            let predictionFail = "Prediction Fail"
            if (classification === "SI - Samaple-Images") {
                $('#txtSkinResult').html('<p>' + predictionFail + '</p>');
            } else {
                $('#txtSkinResult').html('<p>' + classification + '</p>');
                $('#result').empty();
                $.ajax({
                    url: `http://localhost:5000/doctor/all`,
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {

                        let doctorDetails = [];

                        res.data.forEach(doctor => {
                            if (doctor[4] === classification) {
                                let doctorObject = {
                                    name : doctor[1],
                                    contact : doctor[3],
                                    hospital : doctor[2]
                                }
                                doctorDetails.push(doctorObject);
                                const doctorInfoHtml = `
                                    <div class="doctor-info">
                                        <h2>${doctor[1]}</h2>
                                        <p>Hospital: ${doctor[2]}</p>
                                        <p>Contact: ${doctor[3]}</p>
                                    </div> `;
                                $('#result').append(doctorInfoHtml);
                            }
                        });

                        let userId = localStorage.getItem("mediHelpUserId");
                        let userEmail = localStorage.getItem("mediHelpUserEmail");
                        let userName = localStorage.getItem("mediHelpUserName");
                        let age = localStorage.getItem("mediHelpUserAge");
                        let now = new Date();
                        let datetime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

                        let formData = {
                            userId: userId,
                            prediction: classification,
                            datetime: datetime,
                            age: age
                        };
                        $.ajax({
                            method: "POST",
                            url: "http://localhost:5000/prediction/create",
                            contentType: "application/json",
                            data: JSON.stringify(formData),
                            success: function (res) {
                                try {
                                    $.ajax({
                                        url: `http://localhost:5000/users/email/${userEmail}`,
                                        method: 'GET',
                                        async: false,
                                        dataType: 'json',
                                        success: function (res) {

                                            let userAge = res.age;
                                            let userMobile = res.mobile;
                                            let userNic = res.nic;
                                            let userAddress = res.address;

                                            sendResult(userEmail,
                                                userName,
                                                userNic,
                                                userAge,
                                                userAddress,
                                                userMobile,
                                                classification,
                                                doctorDetails[0].name,
                                                doctorDetails[0].contact,
                                                doctorDetails[0].hospital)
                                        },
                                        error: function (ob, textStatus, error) {
                                        }
                                    });
                                } catch (e) {
                                }

                            },
                            error: function (ob, textStatus, error) {
                            }
                        });
                    },
                    error: function (xhr, textStatus, error) {
                        console.error('Error:', error);
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            $('#txtSkinResult').html('<p>' + response.classification + '</p>');
        }
    });
}

function getTotalUsers() {
    $.ajax({
            url: 'http://localhost:5000/users/count',
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function (data) {
                var lblTotalDoctors = document.getElementById('lblTotalUsers');
                if (lblTotalDoctors) {
                    lblTotalDoctors.textContent = data.user_count;
                }
            }
        }
    );
}

function getMostGender() {
    $.ajax({
            url: 'http://localhost:5000/most_common_gender',
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function (data) {
                var mostGender = document.getElementById('lblMostGender');
                if (mostGender) {
                    mostGender.textContent = data.most_common_gender;
                }
            }
        }
    );
}

function getTotalDoctors() {
    $.ajax({
            url: 'http://localhost:5000/doctor/count',
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function (data) {
                var lblTotalDoctors = document.getElementById('lblTotalDoctors');
                if (lblTotalDoctors) {
                    lblTotalDoctors.textContent = data.doctor_count;
                }
            }
        }
    );
}

function getTotalUnder20() {
    $.ajax({
            url: 'http://localhost:5000/prediction/count_under_20',
            method: 'GET',
            async: false,
            dataType: 'json',
            success: function (data) {
                var lblTotalDoctors = document.getElementById('lblPredictionUser20');
                if (lblTotalDoctors) {
                    lblTotalDoctors.textContent = data.count;
                }
            }
        }
    );
}

// ===================================================================================================== Page Loading
$('#btnHome').click(function () {
    $('#adminDashBoard').css({
        'display': 'block'
    });
    $('#adminUserPage').css({
        'display': 'none'
    });
    $('#adminDoctorPage').css({
        'display': 'none'
    });
    $('#adminPredictionHistoryPage').css({
        'display': 'none'
    });
});

$('#btnAdminUser').click(function () {
    $('#adminDashBoard').css({
        'display': 'none'
    });
    $('#adminUserPage').css({
        'display': 'block'
    });
    $('#adminDoctorPage').css({
        'display': 'none'
    });
    $('#adminPredictionHistoryPage').css({
        'display': 'none'
    });
});

$('#btnAdminDoctors').click(function () {
    $('#adminDashBoard').css({
        'display': 'none'
    });
    $('#adminUserPage').css({
        'display': 'none'
    });
    $('#adminDoctorPage').css({
        'display': 'block'
    });
    $('#adminPredictionHistoryPage').css({
        'display': 'none'
    });
});

$('#btnAdminPredictionHistory').click(function () {
    $('#adminDashBoard').css({
        'display': 'none'
    });
    $('#adminUserPage').css({
        'display': 'none'
    });
    $('#adminDoctorPage').css({
        'display': 'none'
    });
    $('#adminPredictionHistoryPage').css({
        'display': 'block'
    });
    loadAllPredictions();
});
// // ======================================================================================================= Admin User
$('#btnAdminUserSave').click(function () {
    saveUser();
});

$('#btnAdminUserUpdate').click(function () {
    updateUser();
});

$('#btnAdminUserDelete').click(function () {
    deleteUser();
});

function clearUser() {
    $('#userName').val('');
    $('#userEmail').val('');
    $('#userNic').val('');
    $('#userAddress').val('');
    $('#userAge').val('');
    $('#userMobile').val('');
    $('#userImage').attr('src', '../assets/images/logo-trans.png');
}

function previewImage() {
    const file = $('#userImageFile')[0].files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        $('#userImage').attr('src', reader.result);
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        $('#userImage').attr('src', '../assets/images/logo-trans.png');
    }
}

function saveUser() {
    let name = $('#userName').val();
    let email = $('#userEmail').val();
    let nic = $('#userNic').val();
    let age = $('#userAge').val();
    let gender = $('#userGender').val();
    let address = $('#userAddress').val();
    let mobile = $('#userMobile').val();
    let img = $('#userImageFile')[0].files[0]; // Get the file input

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('nic', nic);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('mobile', mobile);
    formData.append('password', '123');
    formData.append('img', img);

    $.ajax({
        method: "POST",
        url: "http://localhost:5000/users/create",
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            clearUser();
            loadUsers();
            alert('User Saved Successfully!');
        },
        error: function (ob, textStatus, error) {
            alert('User Save Unsuccessful!');
        }
    });
}

function updateUser() {

    let selectId = sessionStorage.getItem("mediHelpSelectUserID");

    let name = $('#userName').val();
    let email = $('#userEmail').val();
    let nic = $('#userNic').val();
    let age = $('#userAge').val();
    let gender = $('#userGender').val();
    let address = $('#userAddress').val();
    let mobile = $('#userMobile').val();
    let img = $('#userImageFile')[0].files[0];

    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('nic', nic);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('mobile', mobile);
    formData.append('password', '123');
    formData.append('img', img);

    $.ajax({
        method: "PUT",
        url: `http://localhost:5000/users/update/${selectId}`,
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            alert('User Updated Successfully!');
            clearUser();
            loadUsers();
        },
        error: function (ob, textStatus, error) {
            alert('User Update Unsuccessful!');
        }
    });
}

function deleteUser() {

    let selectId = sessionStorage.getItem("mediHelpSelectUserID");

    $.ajax({
        method: "DELETE",
        url: `http://localhost:5000/users/delete/${selectId}`,
        success: function (res) {
            alert('User Deleted Successfully!');
            loadUsers();
            clearUser();
        },
        error: function (ob, textStatus, error) {
            alert('User Delete Unsuccessful!');
        }
    });
}

// ======================================================================================================== Admin Doctor
$('#btnAdminDoctorSave').click(function () {
    saveDoctor();
});

$('#btnAdminDoctorUpdate').click(function () {
    updateDoctor();
});

$('#btnAdminDoctorDelete').click(function () {
    deleteDoctor();
});

function loadDoctors() {
    $('#tblAdminDoctorBody').empty();
    $.ajax({
        url: 'http://localhost:5000/doctor/all',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            for (let i in res.data) {
                let id = res.data[i][0];
                let name = res.data[i][1];
                let hospital = res.data[i][2];
                let contact = res.data[i][3];
                let specifications = res.data[i][4];

                $('#tblAdminDoctorBody').append(`
                    <tr data-id="${id}" data-name="${name}" data-hospital="${hospital}" data-contact="${contact}" data-specifications="${specifications}">
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${hospital}</td>
                        <td>${contact}</td>
                        <td>${specifications}</td>
                    </tr>
                `);
            }

            $('#tblAdminDoctorBody tr').click(function () {
                let rowData = $(this).data();

                $('#docName').val(rowData.name);
                $('#docHospital').val(rowData.hospital);
                $('#docContact').val(rowData.contact);
                $('#docSpecifications').val(rowData.specifications);
                sessionStorage.setItem("mediHelpSelectDoctorID", rowData.id);
            });
        },
        error: function (ob, textStatus, error) {
        }
    });
}

function clearDoctor() {
    $('#docName').val('');
    $('#docHospital').val('');
    $('#docContact').val('');
    $('#docSpecifications').val('');
    $('#docImage').val(''); // Assuming there is an input field for the image
}

function saveDoctor() {
    let name = $('#docName').val();
    let hospital = $('#docHospital').val();
    let contact = $('#docContact').val();
    let specifications = $('#docSpecifications').val();

    if (!name || !hospital || !contact || !specifications) {
        alert('Please fill in all fields');
        return;
    }

    let formData = new FormData();
    formData.append('name', name);
    formData.append('hospital', hospital);
    formData.append('contact', contact);
    formData.append('specifications', specifications);

    $.ajax({
        method: "POST",
        url: "http://localhost:5000/doctor/create",
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            alert('Doctor saved successfully!');
            clearDoctor();
            loadDoctors();
        },
        error: function (ob, textStatus, error) {
            alert('Doctor save unsuccessful!');
        }
    });
}

function updateDoctor() {
    let id = sessionStorage.getItem("mediHelpSelectDoctorID");
    let name = $('#docName').val();
    let hospital = $('#docHospital').val();
    let contact = $('#docContact').val();
    let specifications = $('#docSpecifications').val();

    if (!id || !name || !hospital || !contact || !specifications) {
        alert('Please fill in all fields');
        return;
    }

    let formData = new FormData();
    formData.append('name', name);
    formData.append('hospital', hospital);
    formData.append('contact', contact);
    formData.append('specifications', specifications);

    $.ajax({
        method: "PUT",
        url: `http://localhost:5000/doctor/update/${id}`,
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            alert('Doctor updated successfully!');
            clearDoctor();
            loadDoctors();
        },
        error: function (ob, textStatus, error) {
            alert('Doctor update unsuccessful!');
        }
    });
}

function deleteDoctor() {

    let selectId = sessionStorage.getItem("mediHelpSelectDoctorID");

    $.ajax({
        method: "DELETE",
        url: `http://localhost:5000/doctor/delete/${selectId}`,
        success: function (res) {
            alert('User Deleted Successfully!');
            loadDoctors();
            clearDoctor();
        },
        error: function (ob, textStatus, error) {
            alert('User Delete Unsuccessful!');
        }
    });
}

function loadAllPredictions() {

    $('#tblAdminPredictionHistoryBody').empty();

    $.ajax({
        url: `http://localhost:5000/prediction/all`,
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            res.forEach(prediction => {
                let id = prediction[0];
                let userId = prediction[1];
                let predictionText = prediction[4];
                let datetime = prediction[3];
                let age = prediction[2];

                $('#tblAdminPredictionHistoryBody').append(`
                    <tr>
                        <td>${id}</td>
                        <td>${userId}</td>
                        <td>${predictionText}</td>
                        <td>${datetime}</td>
                        <td>${age}</td>
                    </tr>
                `);
            });

        },
        error: function (xhr, textStatus, error) {
            console.error('Error loading predictions:', error);
        }
    });
}
