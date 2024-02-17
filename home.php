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

    <style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

.flip-card {
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px;
  margin-top: 6%;
 border-radius: 15px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
      border-radius: 15px;

}

.flip-card-front {
  background-color: #bbb;
  color: black;

}

.flip-card-back {
  background-color: #b7967d;
  color: white;
  transform: rotateY(180deg);
}

#homePageH1{
    margin-top:5%;
}

#infoRow{
    display: flex;
    justify-content: space-around; /* Adjust as needed */
    align-items: center; /* Optional: Align items vertically */
}

.infoRowP{
    font-size:x-large;
}

.infoRowH1{
    font-size:xx-large;
}

.flip-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
        border-radius: 15px;


}

.flip-card-back {
    background-color: #b7967d;
    color: white;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


</style>

</head>
<body>
    <div class="container-fluid" >
        <div class="row" >
            <div class="col-lg-2">

                <div id="logoDiv"><img id="logo" src="images/logo.png" alt="logo"></div>
                <nav class="nav flex-column">
                    <button class="navButton" onclick="window.location.href='home.php';">Home</button>
                    <button class="navButton" onclick="window.location.href='books.php';">Books</button>
                    <button class="navButton" onclick="window.location.href='loans.php';">Loans</button>
                    <button class="navButton" onclick="window.location.href='customers.php';">Customers</button>
                </nav>
            </div>

            <div class="col-lg-10">
                <main>
                    <!--<div id="titleDiv"><h1>Home</h1></div>-->

                        <h1 id="homePageH1">Book Station - Manage all in one place</h1>
                        
                        <div id="infoRow">
                            <div class="flip-card">
                              <div class="flip-card-inner">
                                <div class="flip-card-front">
                                  <img src="/images/booksInfo.jpg" style="width:300px; height:300px;" class="flip-card-img cover">
                                </div>
                                <div class="flip-card-back">
                                  <h1 class="infoRowH1">Manage Books</h1> 
                                  <p class="infoRowP">Add, get more info and delete books information</p> 
                                </div>
                              </div>
                            </div>
                            
                            <div class="flip-card">
                              <div class="flip-card-inner">
                                <div class="flip-card-front">
                                  <img src="/images/customersInfo.jpg" style="width:300px; height:300px;" class="flip-card-img cover">
                                </div>
                                <div class="flip-card-back">
                                  <h1 class="infoRowH1">Manage Customers</h1> 
                                  <p class="infoRowP">Add & Edit customers information</p> 
                                </div>
                              </div>
                            </div>
                            
                             <div class="flip-card">
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
                        </div>

</body>
<script type="text/javascript" src="JavaScripts/books_script.js"></script>

</html>