<?php

header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');
require 'connection.php';

// Retrieve data from the database
$sql = "SELECT id, name, ingredients, steps, created_at ,comments FROM recipes";
$result = $conn->query($sql);

$recipes = array();

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $recipes[] = $row;
    }
} else {
    echo json_encode(["message" => "No records found"]);
    exit();
}

$conn->close();

// Encode data to JSON format
echo json_encode($recipes);

?>

