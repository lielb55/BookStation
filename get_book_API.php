<?php

// Get the raw request body
$requestBody = file_get_contents('php://input');

// Decode the JSON request body
$jsonData = json_decode($requestBody, true);

// Get the BookTitle from the decoded JSON data
$bookTitle = isset($jsonData['Title']) ? $jsonData['Title'] : '';

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://payoneerinc-tst.outsystemsenterprise.com/FunctionsService/rest/Books/GetBook',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => json_encode(['Title' => $bookTitle]),
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;