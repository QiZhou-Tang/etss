"use strict";
var ACCOUNT_URL = "/account/#/center", COUNTRY_DEFAULT = "", CAPTCHA_EMAIL_TIMEOUT = 60,
    SUPPORTED_LANGUAGES = ["zh-CN", "en-US"], REG_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    REG_PASSWORD = /^[A-Za-z0-9]{6,18}$/, REG_HASH = /^#?[A-Za-z0-9-]*$/,
    countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia (Plurinational State of)", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "China Hongkong", "China Macao", "China Taiwan", "Colombia", "Comoros", "Congo", "Costa Rica", "Côte D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic People's Republic of Korea", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Lao People’s Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia (Federated States of)", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of Korea", "Republic of Moldova", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South &lrm;Sudan", "Spain", "Sri Lanka", "State of Palestine", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Tajikistan", "Thailand", "The former Yugoslav Republic of Macedonia", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom of Great Britain and Northern Ireland", "United Republic of Tanzania", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Vietnam", "Yemen", "Zambia", "Zimbabwe"],
    $ = window.$, registerTimer = null, forgetTimer = null, registerCountDown = 0,
    forgetCountDown = 0, DEFAULT_LANGUAGE = "en-US", languageCached = window.localStorage.getItem("language");
languageCached && SUPPORTED_LANGUAGES.includes(languageCached) ? window.language = languageCached : (window.localStorage.setItem("language", DEFAULT_LANGUAGE), window.language = DEFAULT_LANGUAGE);
var setLanguage       = function () {
	var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : DEFAULT_LANGUAGE;
	SUPPORTED_LANGUAGES.includes(a) || (a = DEFAULT_LANGUAGE), window.localStorage.setItem("language", a), window.language = a, renderWithLanguage(a)
}, renderWithLanguage = function () {
	var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : DEFAULT_LANGUAGE;
	if (window.dict) {
		SUPPORTED_LANGUAGES.includes(a) || (a = DEFAULT_LANGUAGE);
		var e = window.dict[window.language];

		var lang = window.language=='zh-CN'?'中文':'English';
        $("#language-selector .current-language").html('<p>'+lang+'</p>');

		e && ($("[data-i18n]").each(function () {
			var a = $(this).attr("data-i18n"), t = e[a] || "";
			$(this).text(t)
		}), $("[data-i18n-src]").each(function () {
			var a = $(this).attr("data-i18n-src"), t = e[a] || "";
			$(this).prop("src", t + "?v=" + Date.now())
		}), $("[data-i18n-placeholder]").each(function () {
			var a = $(this).attr("data-i18n-placeholder"), t = e[a] || "";
			$(this).prop("placeholder", t)
		}), $("[data-i18n-href]").each(function () {
			var a = $(this).attr("data-i18n-href"), t = e[a] || "";
			$(this).prop("href", t)
		}), COUNTRY_DEFAULT = e.SELECT_NATIONALITY_DEFAULT, $("#dialog-authentication").find("select").eq(0).find("option").eq(0).text(COUNTRY_DEFAULT))
	}
}, init               = function () {
	var a = $("#nav-menu"), e = $("#main-container"), t = $(".section"), i = e.offset().top, n = $("#btn-account"),
	    o = null;
	$("#copyright-year").text((new Date).getFullYear());
	var r = [];
	
	function s(a) {
		if (REG_HASH.test(a)) {
			var t = $(a);
			if (t) {
				var n = e.scrollTop() + t.offset().top - i;
				setTimeout(function () {
					e.scrollTop(n + 1)
				}, 0)
			}
		}
	}
	
	var l = window.location.hash;
	l && s(l), $(".anchor-btn").on("click", function () {
		var a = $(this).attr("href");
		a && s(a)
	});
	$(e).on("scroll", function () {
		var e = "";
		t.map(function () {
			$(this).offset().top <= i && (e = $(this).prop("id"))
		}), e = e ? "#" + e : "#section-home", a.find("li").removeClass("active"), a.find('a[href="' + e + '"]').parent().addClass("active")
	});
	var d = $("#language-selector");
	d.find(".current-language").on("click", function () {
		d.toggleClass("open")
	});
	var c = d.find("li");
	c.each(function () {
		$(this).attr("data-language") === window.language && $(this).addClass("active")
	}), c.on("click", function () {
		c.removeClass("active"), $(this).addClass("active");
		var a = $(this).attr("data-language");
		setLanguage(a), d.removeClass("open")
	});
	var u = $("#section-home"), w = u.find("video")[0], g = u.find(".video-container").eq(0);
	u.find(".mask").on("click", function () {
		w.paused ? w.play() : w.pause()
	}), $(w).on("play", function () {
		g.find(".cover").removeClass("show"), g.find(".btn-play").removeClass("show")
	}), $(w).on("pause", function () {
		g.find(".btn-play").addClass("show")
	}), $(w).on("timeUpdate", function () {
		w.currentTime >= w.duration && (w.pause(), w.currentTime = 0, g.find(".cover").addClass("show"))
	}), $("#section-home").find(".presale-process footer li.wechat").on("click", function () {
		$("#dialog-wechat-qrcode").addClass("show"), $(".dialog-mask").addClass("show")
	}), $("#section-follow").find("li.wechat").on("click", function () {
		$("#dialog-wechat-qrcode").addClass("show"), $(".dialog-mask").addClass("show")
	});
	var p = $(".dialog-mask"), m = $("#dialog-login"), f = $("#dialog-register"), h = $("#dialog-forget"),
	    v = $("#dialog-authentication");
	
	function A() {
		$("#login-email input").val(""), $("#login-password input").val(""), $("#login-captcha-image input").val(""), $("#login-remember").prop("checked", !1), $("#register-email input").val(""), $("#register-password input").val(""), $("#register-captcha-image input").val(""), $("#register-captcha-email input").val(""), $("#reset-email input").val(""), $("#reset-captcha-image input").val(""), $("#reset-captcha-email input").val(""), $("#reset-password input").val(""), $("#authentication-realname input").val(""), $("#authentication-id-number input").val(""), $("#authentication-country select").val(""), $("#authentication-country .value").val(""), $("#authentication-captcha-image input").val(""), r = []
	}
	
	$(".dialog .btn-close, .dialog-mask").on("click", function () {
		$(".dialog").removeClass("show"), $(".dialog-mask").removeClass("show"), A()
	});
	function _() {
		return "/vercode?t=" + Date.now()
	}
	
	$("#login-captcha-image img, #register-captcha-image img, #reset-captcha-image img, #authentication-captcha-image img").on("click", function () {
		var a = _();
		$(this).prop("src", a)
	}), m.find(".tab").eq(1).on("click", function () {
		var a = _();
		$("#register-captcha-image img").prop("src", a), m.removeClass("show"), f.addClass("show")
	}), f.find(".tab").eq(0).on("click", function () {
		var a = _();
		$("#login-captcha-image img").prop("src", a), f.removeClass("show"), m.addClass("show")
	}), m.find(".options a").on("click", function () {
		var a = _();
		$("#reset-captcha-image img").prop("src", a), m.removeClass("show"), h.addClass("show")
	}), h.find(".options span").on("click", function () {
		var a = _();
		$("#login-captcha-image img").prop("src", a), h.removeClass("show"), m.addClass("show")
	}), f.find(".options span").on("click", function () {
		$("#register-helper").toggleClass("show")
	}), $("#btn-login").on("click", function () {
		var a = $("#login-email input").val(), e = $("#login-password input").val(),
		    t = $("#login-captcha-image input").val(), i = window.dict[window.language], r = i.ERROR_INVALID_EMAIL,
		    s = i.ERROR_INVALID_PASSWORD, l = i.ERROR_INVALID_IMAGE_CAPTCHA;
		a && REG_EMAIL.test(a) ? e ? t ? $.ajax({
			url     : "/login",
			type    : "POST",
			dataType: "json",
			data    : {email: a, password: e, vercode: t},
		}).done(function (a) {
			if (1 === a.status)if (a.data.check <= 0) {
				n.attr("data-i18n", "ACCOUNT"), n.off("click").on("click", function () {
					window.location.href = ACCOUNT_URL
				}), "china" !== a.data.nationality && o && (o.text(window.dict[window.language] ? window.dict[window.language].BTN_PRESALE : ""), o && o.off("click").on("click", function () {
					window.localStorage.setItem("goto", "center"), window.location.href = ACCOUNT_URL
				}));
				var e = _();
				$("#authentication-captcha-image img").prop("src", e), m.removeClass("show"), v.addClass("show")
			} else window.location.href = ACCOUNT_URL; else {
				window.alert(a.msg);
				var t = _();
				$("#login-captcha-image img").prop("src", t)
			}
		}) : window.alert(l) : window.alert(s) : window.alert(r)
	}), $("#register-captcha-email").find(".btn").on("click", function () {
		if (!registerTimer) {
			var a = $("#register-email input").val(), e = $("#register-captcha-image input").val(),
			    t = window.dict[window.language], i = t.ERROR_INVALID_EMAIL, n = t.ERROR_INVALID_IMAGE_CAPTCHA,
			    o = t.MESSAGE_EMAIL_SENT;
			if (a && REG_EMAIL.test(a))if (e) {
				var r = $(this);
				$.ajax({
					url     : "/code",
					type    : "POST",
					dataType: "json",
					data    : {email: a, vercode: e, send_way: "register"},
				}).done(function (a) {
					if (1 !== a.status)return r.text(window.dict[window.language] ? window.dict[window.language].GET_CODE : ""), clearInterval(registerTimer), registerTimer = null, window.alert(a.msg), !1;
					registerCountDown = CAPTCHA_EMAIL_TIMEOUT, r.text("(" + registerCountDown + "s)"), registerTimer = setInterval(function () {
						registerCountDown > 1 ? r.text("(" + --registerCountDown + "s)") : (r.text(window.dict[window.language] ? window.dict[window.language].GET_CODE : ""), clearInterval(registerTimer), registerTimer = null)
					}, 1e3), setTimeout(function () {
						window.alert(o)
					}, 0)
				})
			} else window.alert(n); else window.alert(i)
		}
	}), $("#btn-register").on("click", function () {
		var a = $("#register-email input").val(), e = $("#register-password input").val(),
		    t = $("#register-captcha-image input").val(), i = $("#register-captcha-email input").val(),
		    r = window.dict[window.language], s = r.ERROR_INVALID_EMAIL, l = r.ERROR_INVALID_PASSWORD,
		    d = r.ERROR_INVALID_IMAGE_CAPTCHA, c = r.ERROR_INVALID_EMAIL_CAPTCHA;
		a && REG_EMAIL.test(a) ? e && REG_PASSWORD.test(e) ? t ? i ? $.ajax({
			url     : "/register",
			type    : "POST",
			dataType: "json",
			data    : {
				email   : a,
				password: e,
				vercode : t,
				code    : i,
			},
		}).done(function (a) {
			if (1 === a.status)if (a.data.check <= 0) {
				n.attr("data-i18n", "ACCOUNT"), n.off("click").on("click", function () {
					window.location.href = ACCOUNT_URL
				}), "china" !== a.data.nationality && o && (o.text(window.dict[window.language] ? window.dict[window.language].BTN_PRESALE : ""), o && o.off("click").on("click", function () {
					window.localStorage.setItem("goto", "center"), window.location.href = ACCOUNT_URL
				}));
				var e = _();
				$("#authentication-captcha-image img").prop("src", e), f.removeClass("show"), v.addClass("show")
			} else window.location.href = ACCOUNT_URL; else {
				window.alert(a.msg);
				var t = _();
				$("#register-captcha-image img").prop("src", t)
			}
		}) : window.alert(c) : window.alert(d) : window.alert(l) : window.alert(s)
	}), $("#reset-captcha-email").find(".btn").on("click", function () {
		if (!forgetTimer) {
			var a = $("#reset-email input").val(), e = $("#reset-captcha-image input").val(),
			    t = window.dict[window.language], i = t.ERROR_INVALID_EMAIL, n = t.ERROR_INVALID_IMAGE_CAPTCHA,
			    o = t.MESSAGE_EMAIL_SENT;
			if (a && REG_EMAIL.test(a))if (e) {
				var r = $(this);
				$.ajax({
					url     : "/code",
					type    : "POST",
					dataType: "json",
					data    : {email: a, vercode: e, send_way: "repassword"},
				}).done(function (a) {
					if (1 !== a.status)return r.text(window.dict[window.language] ? window.dict[window.language].GET_CODE : ""), clearInterval(forgetTimer), forgetTimer = null, window.alert(a.msg), !1;
					forgetCountDown = CAPTCHA_EMAIL_TIMEOUT, r.text("(" + forgetCountDown + "s)"), forgetTimer = setInterval(function () {
						forgetCountDown > 1 ? r.text("(" + --forgetCountDown + "s)") : (r.text(window.dict[window.language] ? window.dict[window.language].GET_CODE : ""), clearInterval(forgetTimer), forgetTimer = null)
					}, 1e3), setTimeout(function () {
						window.alert(o)
					}, 0)
				})
			} else window.alert(n); else window.alert(i)
		}
	}), $("#btn-reset").on("click", function () {
		var a = $("#reset-email input").val(), e = $("#reset-password input").val(),
		    t = $("#reset-captcha-image input").val(), i = $("#reset-captcha-email input").val(),
		    n = window.dict[window.language], o = n.ERROR_INVALID_EMAIL, r = n.ERROR_INVALID_PASSWORD,
		    s = n.ERROR_INVALID_IMAGE_CAPTCHA, l = n.ERROR_INVALID_EMAIL_CAPTCHA, d = n.MESSAGE_PASSWORD_RESET;
		a && REG_EMAIL.test(a) ? e ? t ? i ? $.ajax({
			url     : "/repassword",
			type    : "POST",
			dataType: "json",
			data    : {email: a, newpassword: e, vercode: t, code: i},
		}).done(function (a) {
			if (1 === a.status) {
				window.alert(d);
				var e = _();
				$("#login-captcha-image img").prop("src", e), h.removeClass("show"), m.addClass("show")
			} else {
				window.alert(a.msg);
				var t = _();
				$("#reset-captcha-image img").prop("src", t)
			}
		}) : window.alert(l) : window.alert(s) : window.alert(r) : window.alert(o)
	}), $("#btn-authentication").on("click", function () {
		var a = $("#authentication-realname input").val(), e = $("#authentication-id-number input").val(),
		    t = $("#authentication-country select").val(), i = r[0], n = $("#authentication-captcha-image input").val(),
		    o = window.dict[window.language], s = o.ERROR_EMPTY_REALNAME, l = o.ERROR_EMPTY_ID_NUMBER,
		    d = o.ERROR_EMPTY_COUNTRY, c = o.ERROR_EMPTY_ID_PHOTO, u = o.ERROR_INVALID_IMAGE_CAPTCHA;
		if (a)if (e)if (t)if (i)if (n) {
			var w = new window.FormData;
			w.append("name", a), w.append("id_num", e), w.append("nationality", t), w.append("id_card", i), w.append("vercode", n), $.ajax({
				url        : "/idCard",
				type       : "POST",
				dataType   : "json",
				data       : w,
				contentType: !1,
				processData: !1,
			}).done(function (a) {
				if (1 === a.status) window.location.href = ACCOUNT_URL; else {
					window.alert(a.msg);
					var e = _();
					$("#authentication-captcha-image img").prop("src", e)
				}
			})
		} else window.alert(u); else window.alert(c); else window.alert(d); else window.alert(l); else window.alert(s)
	});
	var C = v.find("select"), E = "<option value=''>" + COUNTRY_DEFAULT + "</option>";
	C.append($(E)), countries.map(function (a, e, t) {
		var i = "<option value='" + a + "'>" + a + "</option>";
		C.append($(i))
	});
	var T = C.parent().find(".value");
	T.text(COUNTRY_DEFAULT), T.addClass("default"), C.on("change", function (a) {
		var e = a.target.value, t = "";
		if (e) {
			var i = Number(e.substr(2)) - 1;
			t = countries[i], T.removeClass("default")
		} else t = COUNTRY_DEFAULT, T.addClass("default");
		T.text(t)
	});
	$("#dialog-authentication .file-input-button").on("click", function () {
		var a = $(this).parent(), e = a.find("input[type='file']");
		e.click(), e.on("change", function (e) {
			var t = e.target.files;
			if (t.length) {
				var i = t[0];
				if (i.size > 2097152) window.alert("File Oversized (≤ 2MB)"); else {
					r.push(i);
					var n = new window.FileReader;
					n.readAsDataURL(i), n.onload = function (e) {
						a.find(".img-preview").addClass("has-image"), a.find("img").attr("src", e.target.result)
					}
				}
			}
		})
	}), n.on("click", function () {
		A();
		var a = _();
		$("#login-captcha-image img").prop("src", a), m.addClass("show"), p.addClass("show")
	}), $.ajax({url: "/getIndexInfo", type: "GET", dataType: "json"}).done(function (a) {
		if (1 === a.status) {
			var e = Number(a.data.inc_order) || 0, t = Number(a.data.inc_amount) || 1,
			    i = Math.max(0, Math.min(1, e / t)),
			    n = a.data.start_time ? parseInt(a.data.start_time.substr(0, 4)) : 0,
			    r = a.data.start_time ? parseInt(a.data.start_time.substr(5, 7)) - 1 : 0,
			    s = a.data.start_time ? parseInt(a.data.start_time.substr(8, 10)) : 0,
			    l = a.data.start_time ? parseInt(a.data.start_time.substr(11, 13)) : 0,
			    d = a.data.start_time ? parseInt(a.data.start_time.substr(14, 16)) : 0,
			    c = a.data.start_time ? parseInt(a.data.start_time.substr(17, 19)) : 0, u = new Date(n, r, s, l, d, c),
			    w = a.data.end_time ? parseInt(a.data.end_time.substr(0, 4)) : 0,
			    g = a.data.end_time ? parseInt(a.data.end_time.substr(5, 7)) - 1 : 0,
			    f = a.data.end_time ? parseInt(a.data.end_time.substr(8, 10)) : 0,
			    h = a.data.end_time ? parseInt(a.data.end_time.substr(11, 13)) : 0,
			    v = a.data.end_time ? parseInt(a.data.end_time.substr(14, 16)) : 0,
			    C = a.data.end_time ? parseInt(a.data.end_time.substr(17, 19)) : 0, E = new Date(w, g, f, h, v, C),
			    T = new Date;
			if (T >= u && T <= E && i < 1) {
				var R = "\n        <div id='btn-preregister' class='btn btn-primary-ghost btn-hover-glow' data-i18n='BTN_PRESALE'>" + window.dict[window.language].BTN_PRESALE + "</div>\n      ",
				    I = $("$presale-process");
				I.prepend($("\n        <h2>PRESALE PROCESS</h2>\n        <div class='progress-bar'>\n          <div class='current' id='sale-progress'></div>\n        </div>\n        <p><span id='sold-amount'>0</span> INC sold to strategic partners</p>\n      ")), I.find(".right").append($(R));
				var L = $("#sale-progress"), S = $("#sold-amount");
				L.css({width: 100 * i + "%"}), S.text(e.toLocaleString()), (o = $("#btn-preregister")).on("click", function () {
					A();
					var a = _();
					$("#login-captcha-image img").prop("src", a), m.addClass("show"), p.addClass("show")
				})
			}
		}
	}), $.ajax({url: "/isLogin", type: "GET", dataType: "json"}).done(function (a) {
		1 === a.status && (n.attr("data-i18n", "ACCOUNT"), n.off("click").on("click", function () {
			window.location.href = ACCOUNT_URL
		}), "china" !== a.data.nationality && o && (o.text(window.dict[window.language] ? window.dict[window.language].BTN_PRESALE : ""), o.off("click").on("click", function () {
			window.localStorage.setItem("goto", "center"), window.location.href = ACCOUNT_URL
		})), renderWithLanguage(window.language))
	})
};
function initInterCom() {
	var a = "zi5rzkp9";
	window.intercomSettings = {app_id: a}, function () {
		var e = window, t = e.Intercom;
		if ("function" == typeof t) t("reattach_activator"), t("update", window.intercomSettings); else {
			var i = function () {
				var e = n.createElement("script");
				e.type = "text/javascript", e.async = !0, e.src = "https://widget.intercom.io/widget/" + a;
				var t = n.getElementsByTagName("script")[0];
				t.parentNode && t.parentNode.insertBefore(e, t)
			}, n  = document, o = function a() {
				a.c(arguments)
			};
			o.q = [], o.c = function (a) {
				o.q.push(a)
			}, e.Intercom = o, e.attachEvent ? e.attachEvent("onload", i) : e.addEventListener("load", i, !1)
		}
	}();
	var e = {app_id: a};
	window.Intercom("boot", e)
}
$(document).ready(function () {
	init(), renderWithLanguage(window.language)
	 // initInterCom()
});
//# sourceMappingURL=index.js.map
