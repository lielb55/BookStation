<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="icon" type="image/png" href="favicon.png">

</head>
<body id="#homeBody">
    <div class="container-fluid" >
        <div class="row" >
            <div class="col-lg-2">

                <a href="home.php"><div id="logoDiv"><img id="logo" src="images/logo.png" alt="logo"></div></a>
                <nav class="nav flex-column">
                    <button class="navButton" onclick="window.location.href='home.php';">Home</button>
                    <button class="navButton" onclick="window.location.href='books.php';">Books</button>
                    <button class="navButton" onclick="window.location.href='loans.php';">Loans</button>
                    <button class="navButton" onclick="window.location.href='customers.php';">Customers</button>
                </nav>
            </div>

            <div class="col-lg-10">
                <main>
                        <h1 id="homePageH1">Book Station - Manage all in one place</h1>
                        
                        <div id="infoRow">
                            <a href="books.php" class="flip-card">
                              <div class="flip-card-inner">
                                <div class="flip-card-front">
                                  <img src="/images/booksInfo.jpg" style="width:300px; height:300px;" class="flip-card-img cover">
                                </div>
                                <div class="flip-card-back">
                                  <h1 class="infoRowH1">Manage Books</h1> 
                                  <p class="infoRowP">Add, get more info and delete books information</p> 
                                </div>
                              </div>

                            <a href="customers.php" class="flip-card">
                              <div class="flip-card-inner">
                                <div class="flip-card-front">
                                  <img src="/images/customersInfo.jpg" style="width:300px; height:300px;" class="flip-card-img cover">
                                </div>
                                <div class="flip-card-back">
                                  <h1 class="infoRowH1">Manage Customers</h1> 
                                  <p class="infoRowP">Add & Edit customers information</p> 
                                </div>
                              </div>

                            <a href="loans.php" class="flip-card">
                              <div class="flip-card-inner">
                                <div class="flip-card-front">
                                  <img src="/images/loansInfo.jpg" style="width:300px; height:300px;" class="flip-card-img cover">
                                </div>
                                <div class="flip-card-back">
                                  <h1 class="infoRowH1">Manage Loans</h1> 
                                  <p class="infoRowP">Add & End loans information</p> 
                                </div>
                              </div>
                        </div>

</body>

</html>