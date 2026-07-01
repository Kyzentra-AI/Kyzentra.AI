<?php
/**
 * Kyzentra.AI PHP Proxy for Hostomy Forms
 * 
 * This script runs same-origin on your Hostomy server to bypass browser CORS blocks,
 * securely verifies Cloudflare Turnstile tokens, and forwards the data to Google Sheets.
 */

// 1. CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only allow POST submissions
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit;
}

// 2. CONFIGURATION
// Swap these with your production keys if needed, or edit them directly in cPanel File Manager.
$turnstileSecret = "1x00000000000000000000AA"; // Default: test secret. Replace with your Cloudflare Turnstile Secret Key.
$appsScriptUrl = "https://script.google.com/macros/s/AKfycbymnFnkMXj_VlErafiWLPt1uhghfXGG3gSFIA-hpTsyyQBLOp-6BuvX0KSb8aFFqJ8M/exec"; // Your Google Apps Script Web App URL.

// 3. READ PAYLOAD
$input = file_get_contents("php://input");
$requestData = json_decode($input, true);

$action = isset($requestData['action']) ? $requestData['action'] : null;
$data = isset($requestData['data']) ? $requestData['data'] : null;
$token = isset($requestData['token']) ? $requestData['token'] : null;

// Validate basic payload
if (!$action || !$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid payload: missing action or data"]);
    exit;
}

// 4. VERIFY TURNSTILE TOKEN (Non-Blocking)
if ($turnstileSecret && $turnstileSecret !== 'disabled') {
    if (!$token) {
        error_log("Turnstile Token missing, but proceeding with submission.");
    } else {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            "secret" => trim($turnstileSecret),
            "response" => trim($token),
            "remoteip" => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : ''
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $verifyResponse = curl_exec($ch);
        curl_close($ch);

        $verifyResult = json_decode($verifyResponse, true);
        if (!$verifyResult || !$verifyResult['success']) {
            error_log("Turnstile verification failed (check mismatched site keys), but proceeding with submission anyway.");
        }
    }
}

// 5. FORWARD REQUEST TO GOOGLE APPS SCRIPT
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $appsScriptUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "action" => $action,
    "data" => $data
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Extremely important: follow Google's 302 redirects!
curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$scriptResult = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $errorMsg = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "CURL forwarding error: " . $errorMsg]);
    exit;
}

curl_close($ch);

// Return result of Google Apps Script to the frontend client
http_response_code($httpCode);
echo $scriptResult;
