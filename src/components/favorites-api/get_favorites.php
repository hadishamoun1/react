<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
require '../connection.php';

$user_id = $_GET['user_id'];

$stmt = $conn->prepare("SELECT recipes.* FROM recipes INNER JOIN favorites ON recipes.id = favorites.recipe_id WHERE favorites.user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$favorites = [];
while ($row = $result->fetch_assoc()) {
    $favorites[] = $row;
}

echo json_encode($favorites);

$stmt->close();
$conn->close();
?>
