// In LoginService.js
export function register(email, password, role) {
  const raw = {
    email: email,
    password: password,
    role: role,
  };

  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/auth/signup",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(raw),
      success: function (result) {
        console.log(result);
        //alert("User registered successfully.");
        resolve(result); // resolving with the response result
      },
      error: function (xhr, status, error) {
        reject(error); // rejecting on error
      },
    });
  });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/greenshadow/api/v1/auth/signin",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email, password }),
      success: function (result) {
        console.log(result);
        resolve(result); // resolving with the response result
      },
      error: function (xhr, status, error) {
        reject(error); // rejecting on error
      },
    });
  });
}
