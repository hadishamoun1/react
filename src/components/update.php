<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
require 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $comments = $data['comments'];

    // Prepare and bind
    $stmt = $conn->prepare("UPDATE recipes SET comments = ? WHERE id = ?");
    $stmt->bind_param("si", $comments, $id);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["message" => "Comment updated successfully"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
