// NAVBAR

const hamburger = document.querySelector(".rightlogo")
const upabove = document.querySelector("#upabove")

hamburger.addEventListener("click", () => {
  upabove.classList.toggle("active")
  document.body.classList.toggle("menu-open")
})

const navbar = document.querySelector('.navbar');
const innav = document.querySelector('.navrow');

window.onscroll = () => {
  if (window.pageYOffset > 0) {
    navbar.classList.add('inactive')
    innav.classList.add('inactive')
  } else {
    navbar.classList.remove('inactive')
    innav.classList.remove('inactive')
  }
};

// NAVBAR END

// REDIRECTION

function changePage(dest) {
  if (dest === "/")
    window.location.href = "/index.html";
  else if (dest === "/blog")
    window.open("https://github.com/mukeshkanna11", "_blank");
  else if (dest === "/credit")
    window.open("https://www.linkedin.com/in/mukeshkanna112/", "_blank");
  else
    window.location.href = `${dest}index.html`;
}

// REDIRECTION

// POP UP

document.addEventListener("DOMContentLoaded", function () {
  const popupIcon = document.getElementById("popupIcon");
  const downloadLink = document.getElementById("downloadLink");

  if (popupIcon) {
    popupIcon.style.display = "block";

    popupIcon.addEventListener("click", function () {
      downloadLink.click();
    });
  }
});

function closePopup() {
  var popupIcon = document.getElementById("popupIcon");
  var closeIcon = document.querySelector(".popup-icon1");

  if (popupIcon) {
    popupIcon.style.display = "none";
  }

  if (closeIcon) {
    closeIcon.style.display = "none";
  }
}

function checkScreenWidth() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  var popupIcon = document.getElementById("popupIcon");
  var closeIcon = document.querySelector(".popup-icon1");

  if (popupIcon && closeIcon) {
    if (screenWidth <= 100) {
      popupIcon.style.display = "none";
      closeIcon.style.display = "none";
    } else {
      popupIcon.style.display = "block";
      closeIcon.style.display = "block";
    }
  }
}

window.onload = checkScreenWidth;
// window.onresize = checkScreenWidth;


// POP UP

// FAQ

const questions = document.getElementsByClassName("question")
const answers = document.getElementsByClassName("answer")
const verticals = document.getElementsByClassName("vertical")

for (let i = 0; i < questions.length; i++) {
  questions[i].addEventListener('click', () => {
    answers[i].classList.toggle('answer_active');
    verticals[i].classList.toggle('vertical_active');
  });
}

// FAQ END

// PHONE SECTION

// check if center of element in inside viewport
function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  var elementCenterX = rect.left + rect.width / 2;
  var elementCenterY = rect.top + rect.height / 2;

  return (
    elementCenterX >= 0 &&
    elementCenterY >= 0 &&
    elementCenterX <= (window.innerWidth || document.documentElement.clientWidth) &&
    elementCenterY <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// change image on lhs scmoothly

var prevCall = Date.now()
var curr = 1

function changeImage(i) {

  var img1 = document.querySelector(".lhs-img-1")
  var img2 = document.querySelector(".lhs-img-2")
  var img3 = document.querySelector(".lhs-img-3")

  if (curr == i) return;
  if (Date.now() - prevCall < 850) return;
  curr = i;
  prevCall = Date.now();

  if (i == 1) {
    img2.style.opacity = 0;

    setTimeout(() => {
      img2.style.display = "none";
      img1.style.display = "block";
      img3.style.display = "none";
      setTimeout(() => {
        img1.style.opacity = 1;
      }, 50)
    }, 400)
  } else if (i == 2) {
    img1.style.opacity = 0;
    img3.style.opacity = 0;

    setTimeout(() => {
      img1.style.display = "none";
      img3.style.display = "none";
      img2.style.display = "block";
      setTimeout(() => {
        img2.style.opacity = 1;
      }, 50)
    }, 400)
  } else if (i == 3) {
    img2.style.opacity = 0;

    setTimeout(() => {
      img2.style.display = "none";
      img3.style.display = "block";
      img1.style.display = "none";
      setTimeout(() => {
        img3.style.opacity = 1;
      }, 50)
    }, 400)
  }
}

if (document.querySelector(".lhs-img")) {
  var img1 = document.querySelector(".lhs-img-1")
  var img2 = document.querySelector(".lhs-img-2")
  var img3 = document.querySelector(".lhs-img-3")

  img1.style.display = "block";
  img2.style.display = "none";
  img3.style.display = "none";

  img1.style.opacity = 1;
  img2.style.opacity = 0;
  img3.style.opacity = 0;
}

window.addEventListener('scroll', function () {
  if (!document.getElementsByClassName("rhs")[0])
    return;

  const scrollDistance = window.scrollY;
  const rhsHeight = document.getElementsByClassName("rhs")[0].clientHeight;
  const imageOffset = document.getElementsByClassName("rhs")[0].offsetTop;
  const viewportCenter = scrollDistance - imageOffset + window.innerHeight / 2;
  const percentPos = (viewportCenter / rhsHeight);

  // changing image on based on how much % of rhs has been scrolled
  const lhs_img = document.getElementsByClassName("lhs-img")[0]
  if (percentPos > 0.66)
    changeImage(3);
  else if (percentPos > 0.33)
    changeImage(2);
  else if (percentPos > 0)
    changeImage(1);

  // the progress bar below image
  if (percentPos < 1)
    document.getElementsByClassName("progress-indicator")[0].style.width = (100 * percentPos).toString() + "%"

  // hide slide if its not in viewport
  if (window.innerWidth > 990) {
    for (var i = 0; i < document.getElementsByClassName("slide").length; i++) {
      var element = document.getElementsByClassName("slide")[i];
      element.style.opacity = (isElementInViewport(element) ? "1" : "0").toString()
    }
  }

});

var prevWidth = window.innerWidth;
window.addEventListener('resize', function () {
  if (prevWidth == window.innerWidth) return;
  prevWidth = window.innerWidth;

  if (window.innerWidth < 990) {
    for (var i = 0; i < document.getElementsByClassName("slide").length; i++) {
      var element = document.getElementsByClassName("slide")[i];
      element.style.opacity = "1";
    }
  }
})

function smoothJump(query) {
  document.querySelector(query).scrollIntoView({
    behavior: "smooth"
  });
}

// PHONE SECTION END

// NEWSLETTER

document.querySelector(".newsletter_submit_gif").style.display = "none"

document.querySelector("#newsletter_contactform").addEventListener("submit", function (event) {
  event.preventDefault();

  document.querySelector(".newsletter_submit_gif").style.display = "block"
  document.querySelector(".newsletter_submit").style.display = "none"
  document.querySelector(".newsletter_submit_button").classList.toggle("newsletter_submit_sent")

  try {
    fetch('https://sheetdb.io/api/v1/skyvc5kx8f0wi', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [
          {
            'email': document.querySelector(".newsletter_input").value,
          }]
      })
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".newsletter_input").style.display = "none"
        document.querySelector(".newsletter_submit_gif").style.display = "none"
        document.querySelector(".newsletter_submit").style.display = "block"
        document.querySelector(".newsletter_submit_button").style.width = "100%"
        document.querySelector(".newsletter_submit_button").disabled = true;
        if (data["created"])
          document.querySelector(".newsletter_submit").innerHTML = "SUBSCRIBED !"
        else
          document.querySelector(".newsletter_submit").innerHTML = "UNKNOWN ERROR ! PLEASE TRY AGAIN LATER."
      });
  } catch (err) {
    console.log(err)
    document.querySelector(".newsletter_input").style.display = "none"
    document.querySelector(".newsletter_submit_gif").style.display = "none"
    document.querySelector(".newsletter_submit").style.display = "block"
    document.querySelector(".newsletter_submit_button").style.width = "100%"
    document.querySelector(".newsletter_submit_button").disabled = true;
    document.querySelector(".newsletter_submit").innerHTML = "UNKNOWN ERROR ! PLEASE TRY AGAIN LATER."
  }
})

// NEWSLETTER END 

// CONTACT US
var contactFormElement = document.getElementById("contactForm");

if (contactFormElement) {
  contactFormElement.addEventListener("submit", function (event) {
    function emailSent(msg) {
      document.getElementsByClassName("load_gif")[0].style.display = "none";
      document.getElementsByClassName("load_text")[0].style.display = "block";
      document.getElementsByClassName("input-fields")[0].style.display = "none";
      document.getElementsByClassName("button")[0].disabled = true;
      document.getElementsByClassName("button")[0].style.padding = "18px";
      document.getElementsByClassName("load_text")[0].innerHTML = msg;
    }
    event.preventDefault();

    document.getElementsByClassName("load_gif")[0].style.display = "block";
    document.getElementsByClassName("load_text")[0].style.display = "none";
    document.getElementsByClassName("button")[0].classList.add('button-hover');

    // if button didnt change for 10s
    setTimeout(() => {
      if (document.getElementsByClassName("load_gif")[0].style.display == "block") {
        emailSent("UNKNOWN ERROR ! PLEASE TRY AGAIN LATER.")
      }
    }, 10000)

    try {
      const BOT_ACC = "mukesh.kanna@readytechsolutions.in"
      const USER_ACC_A = "brandcontent"
      const USER_ACC_B = "mukesh.kanna@readytechsolutions.in"
      const USER_ACC = USER_ACC_A + USER_ACC_B
      const PASSa = "FF59421D53C253"
      const PASSb = "0E388E9C279C"
      const PASSc = "F0CEA86964"
      const PASS = PASSa + PASSb + PASSc
      var message
      var subj
      if (document.getElementsByClassName("exp")[0] != undefined) {
        var name = document.getElementsByClassName("name")[0].value;
        var text2 = document.getElementsByClassName("text2")[0].value;
        var email = document.getElementsByClassName("email")[0].value;
        var exp = document.getElementsByClassName("exp")[0].value;
        var c_number = document.getElementsByClassName("c_number")[0].value;

        var message = "<p><strong>Mr/Ms " + name + "</strong> would like to contact you for career opportunities with <strong>Urbane Deep Pocket</strong>.</p>";
        message += "<p><strong>Mail:</strong> " + email + "</p>";
        message += "<p><strong>Phone:</strong> " + c_number + "</p>";
        message += "<p><strong>Experience:</strong> " + exp + "</p>";
        message += "<p><strong>Message:</strong> " + text2 + "</p>";

        subj = "Careers@Urbane Deep Pocket | Request from " + document.getElementsByClassName("name")[0].value;
      }
      else {
        var name = document.getElementsByClassName("name")[0].value;
        var email = document.getElementsByClassName("email")[0].value;
        var messageText = document.getElementsByClassName("text2")[0].value;

        var message = "<p><strong>Mr/Ms " + name + "</strong> would like to contact you.</p>";
        message += "<p><strong>Mail:</strong> " + email + "</p>";
        message += "<p><strong>Message:</strong> " + messageText + "</p>";

        subj = "KYC request from " + document.getElementsByClassName("name")[0].value;
      }

      Email.send({
        Host: "smtp.elasticemail.com",
        Username: BOT_ACC,
        Password: PASS,
        To: USER_ACC,
        From: BOT_ACC,
        Subject: subj,
        Body: message,
      })
        .then(function (message) {
          console.log(message)
          emailSent("THANKS FOR REACHING US!")
        });
    }
    // if error sending message to server itself
    catch (err) {
      emailSent("UNKNOWN ERROR ! PLEASE TRY AGAIN LATER.")
    }
  });
}


// CONTACT US END

// ABOUT US

function setWeWorkHeight() {
  var wework1 = document.getElementsByClassName("wework1")
  for (var i = 0; i < wework1.length; i++) {
    var left = wework1[i].querySelector(".wework1_left")
    if (window.innerWidth < 990) {
      left.style.margin = "0"
      continue;
    }

    var right_top = wework1[i].querySelectorAll(".wework1_row")[0]
    var right_bottom = wework1[i].querySelectorAll(".wework1_row")[wework1[i].querySelectorAll(".wework1_row").length - 1]

    var mt = 80 + right_top.querySelector(".wework1_head1").clientHeight + 30 + 10 + right_top.querySelector(".wework1_text1").clientHeight / 2 - 10
    var bt = 80 + right_bottom.querySelector(".wework1_c1").clientHeight - 30 - 10 - right_bottom.querySelector(".wework1_text1").clientHeight / 2
    left.style.marginTop = mt + "px"
    left.style.marginBottom = bt + "px"
  }
}

setWeWorkHeight()

// ABOUT US END

// QUOTE

function openWhatsApp() {
  var phoneNumber = '+91 8220757046';
  var message = 'Hello, I have a question!';
  var whatsappUrl = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + encodeURIComponent(message);

  window.open(whatsappUrl, '_blank');
}

// QUOTE

