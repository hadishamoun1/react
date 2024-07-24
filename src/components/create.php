<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
require 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $ingredients = $data['ingredients'];
    $steps = $data['steps'];
    $created_at = $data['created_at'];
    $comments = $data['comments'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO recipes (name, ingredients, steps, created_at,comments) VALUES (?, ?, ?, ?,?)");
    $stmt->bind_param("sssss", $name, $ingredients, $steps, $created_at,$comments);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["message" => "New record created successfully"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
