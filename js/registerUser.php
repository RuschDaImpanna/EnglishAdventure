<?php

// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Debug start
file_put_contents("debug.log", "== New request received ==\n", FILE_APPEND);

$rawData = file_get_contents('php://input');
file_put_contents("debug.log", "Raw input:\n$rawData\n", FILE_APPEND);

$newUser = json_decode($rawData, true);

if (!$newUser) {
    file_put_contents("debug.log", "JSON decode failed\n", FILE_APPEND);
    http_response_code(400);
    echo "Invalid JSON";
    exit;
}

file_put_contents("debug.log", "Parsed user:\n" . print_r($newUser, true), FILE_APPEND);

$filename = '../database/users.json';

if (!file_exists($filename)) {
    file_put_contents($filename, "[]");
}

$existingUsers = json_decode(file_get_contents($filename), true);
if (!is_array($existingUsers)) $existingUsers = [];

foreach ($existingUsers as $user) {
    if ($user['idKey'] === $newUser['idKey']) {
        file_put_contents("debug.log", "User already exists\n", FILE_APPEND);
        echo "User already exists";
        exit;
    }
}

$existingUsers[] = $newUser;

if (file_put_contents($filename, json_encode($existingUsers, JSON_PRETTY_PRINT))) {
    file_put_contents("debug.log", "User successfully added\n", FILE_APPEND);
    echo "User registered successfully";
} else {
    file_put_contents("debug.log", "Failed to write users.json\n", FILE_APPEND);
    http_response_code(500);
    echo "Failed to write file";
}
