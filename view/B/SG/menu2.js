var countryPrefix = localStorage.getItem("urlPrefix");
document.write('\
<script>\
    document.addEventListener("DOMContentLoaded", function(){\
        var memberEmail = sessionStorage.getItem("memberEmail");\
        if(memberEmail == null || memberEmail == "") {\
            document.getElementById("menuLoggedOut").setAttribute("style", "display:block");\
            document.getElementById("menuLoggedIn").setAttribute("style", "display:none");\
        }\
        else {\
            document.getElementById("menuLoggedOut").setAttribute("style", "display:none");\
            document.getElementById("menuLoggedIn").setAttribute("style", "display:block");\
            var welcomeText = sessionStorage.getItem("memberName");\
            if(welcomeText == "null") {\
                welcomeText = "";\
            }\
            document.getElementById("memberName").innerHTML = "Welcome " + welcomeText + "!";\
        }\
        document.getElementById("tableDeskLink").setAttribute("href", "/B/' + countryPrefix + '/furnitureCategory.html?cat=" + encodeURIComponent("Tables & Desks"));\
        document.getElementById("bedMattressLink").setAttribute("href", "/B/' + countryPrefix + '/furnitureCategory.html?cat=" + encodeURIComponent("Beds & Mattresses"));\
        document.getElementById("sofaChairLink").setAttribute("href", "/B/' + countryPrefix + '/furnitureCategory.html?cat=" + encodeURIComponent("Sofas & Chair"));\
        document.getElementById("cabinetStorageLink").setAttribute("href", "/B/' + countryPrefix + '/furnitureCategory.html?cat=" + encodeURIComponent("Cabinets & Storage"));\
        document.getElementById("retailProductLink").setAttribute("href", "/B/' + countryPrefix + '/retailProductsCategory.html?cat=" + encodeURIComponent("All Retail Products"));\
        document.getElementById("promotionsLink").setAttribute("href", "/B/' + countryPrefix + '/promotions.html");\
        document.getElementById("showroomLivingLink").setAttribute("href", "/B/' + countryPrefix + '/showroom.html?room=living");\
        document.getElementById("showroomBedroomLink").setAttribute("href", "/B/' + countryPrefix + '/showroom.html?room=bedroom");\
        document.getElementById("showroomStudyLink").setAttribute("href", "/B/' + countryPrefix + '/showroom.html?room=study");\
        document.getElementById("showroomKitchenLink").setAttribute("href", "/B/' + countryPrefix + '/showroom.html?room=kitchen");\
        document.getElementById("showroomBathroomLink").setAttribute("href", "/B/' + countryPrefix + '/showroom.html?room=bathroom");\
        document.getElementById("showroomGardenLink").setAttribute("href", "/B/' + countryPrefix + '/showroom.html?room=garden");\
    }, false);\
    function logout() {\
        sessionStorage.clear();\
        window.location.href = "/B/' + countryPrefix + '/memberLogin.html?goodMsg=Logout Successfully."\
    }\
</script>\
<header id="header">\
    <div class="container">\
        <h1 class="logo">\
            <a href="/B/' + countryPrefix + '/index.html">\
                <img alt="Island Furniture" width="180" height="80" data-sticky-width="82" data-sticky-height="40" src="../img/logo.png">\
            </a>\
        </h1>\
        <div id="menuLoggedOut" style="display: none;">\
            <nav>\
                <ul class="nav nav-pills nav-top">\
                    <li class="storeLocationMenu">\
                        <a href="/B/' + countryPrefix + '/storeLocation.html"><i class="icon icon-map-marker"></i>Store Location</a>\
                    </li>\
                    <li>\
                        <a href="/B/' + countryPrefix + '/memberLogin.html"><i class="icon icon-unlock-alt"></i>Login/Register</a>\
                    </li>\
                    <li>\
                        <a href="/B/' + countryPrefix + '/contactUs.html"><i class="icon icon-shopping-cart"></i>Contact Us</a>\
                    </li>\
                </ul>\
                <button class="btn btn-responsive-nav btn-inverse" data-toggle="collapse" data-target=".nav-main-collapse">\
                    <i class="icon icon-bars"></i>\
                </button>\
            </nav>\
        </div>\
        <div id="menuLoggedIn" style="display: none;">\
            <nav>\
                <ul class="nav nav-pills nav-top">\
                    <li><a id="memberName"></a></li>\
                    <li class="storeLocationMenu">\
                        <a href="/B/' + countryPrefix + '/storeLocation.html"><i class="icon icon-map-marker"></i>Store Location</a>\
                    </li>\
                    <li>\
                        <a href="/B/' + countryPrefix + '/shoppingCart.html"><i class="icon icon-shopping-cart"></i>Shopping Cart</a>\
                    </li>\
                    <li>\
                        <a href="/B/' + countryPrefix + '/memberProfile.html"><i class="icon icon-user"></i>Profile</a>\
                    </li>\
                    <li>\
                        <a href="/B/' + countryPrefix + '/contactUs.html"><i class="icon icon-shopping-cart"></i>Contact Us</a>\
                    </li>\
                    <li>\
                        <a href="#" onclick="logout()"><i class="icon icon-unlock-alt"></i>Logout</a>\
                    </li>\
                </ul>\
                <button class="btn btn-responsive-nav btn-inverse" data-toggle="collapse" data-target=".nav-main-collapse">\
                    <i class="icon icon-bars"></i>\
                </button>\
            </nav>\
        </div>\
    </div>\
    <div class="navbar-collapse nav-main-collapse collapse">\
        <div class="container">\
            <nav class="nav-main mega-menu">\
                <ul class="nav nav-pills nav-main" id="mainMenu">\
                    <li>\
                        <a href="/B/' + countryPrefix + '/virtualStore.html">Virtual Store</a>\
                    </li>\
                    <li class="dropdown">\
                        <a class="dropdown-toggle" href="#">\
                            Showroom<i class="icon icon-angle-down"></i>\
                        </a>\
                        <ul class="dropdown-menu">\
                            <li><a id="showroomLivingLink"><i class="icon icon-map-marker"></i> Living Room</a></li>\
                            <li><a id="showroomBedroomLink"><i class="icon icon-map-marker"></i> Bedroom</a></li>\
                            <li><a id="showroomStudyLink"><i class="icon icon-map-marker"></i> Study Room</a></li>\
                            <li><a id="showroomKitchenLink"><i class="icon icon-map-marker"></i> Kitchen</a></li>\
                            <li><a id="showroomBathroomLink"><i class="icon icon-map-marker"></i> Bathroom</a></li>\
                            <li><a id="showroomGardenLink"><i class="icon icon-map-marker"></i> Garden</a></li>\
                        </ul>\
                    </li>\
                    <li>\
                        <a id="promotionsLink">Promotions</a>\
                    </li>\
                    <li class="dropdown">\
                        <a class="dropdown-toggle" href="#">\
                            Furniture<i class="icon icon-angle-down"></i>\
                        </a>\
                        <ul class="dropdown-menu">\
                            <li><a id="tableDeskLink"><i class="icon icon-map-marker"></i> Tables & Desk</a></li>\
                            <li><a href="/B/' + countryPrefix + '/furnitureCategory.html?cat=Bathroom"><i class="icon icon-map-marker"></i> Bathroom</a></li>\
                            <li><a id="bedMattressLink"><i class="icon icon-map-marker"></i> Beds & Mattresses</a></li>\
                            <li><a id="sofaChairLink"><i class="icon icon-map-marker"></i> Sofas & Chair</a></li>\
                            <li><a id="cabinetStorageLink"><i class="icon icon-map-marker"></i> Cabinets & Storage</a></li>\
                            <li><a href="/B/' + countryPrefix + '/furnitureCategory.html?cat=Lightings"><i class="icon icon-map-marker"></i> Lightings</a></li>\
                            <li><a href="/B/' + countryPrefix + '/furnitureCategory.html?cat=Study"><i class="icon icon-map-marker"></i> Study</a></li>\
                            <li><a href="/B/' + countryPrefix + '/furnitureCategory.html?cat=Children"><i class="icon icon-map-marker"></i> Children</a></li>\
                        </ul>\
                    </li>\
                    <li class="dropdown">\
                        <a class="dropdown-toggle" href="#">\
                            Retail<i class="icon icon-angle-down"></i>\
                        </a>\
                        <ul class="dropdown-menu">\
                            <li><a id="retailProductLink"><i class="icon icon-coffee"></i> Retail Products</a></li>\
                        </ul>\
                    </li>\
                </ul>\
            </nav>\
        </div>\
    </div>\
</header>');
