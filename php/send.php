<?php
// Send one email with the Sendpository API. Needs only PHP 8.1+ with ext-curl.

// Read KEY=value lines from .env, without overriding real environment variables.
if (is_file(__DIR__ . '/.env')) {
    foreach (file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if ($line[0] === '#' || !str_contains($line, '=')) continue;
        [$key, $value] = array_map('trim', explode('=', $line, 2));
        if (getenv($key) === false) putenv("$key=" . trim($value, '"'));
    }
}

$to = $argv[1] ?? exit("Usage: php send.php you@example.com\n");
$base = getenv('SENDPOSITORY_BASE_URL') ?: 'https://api.sendpository.com/v1';

$ch = curl_init("$base/emails");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . getenv('SENDPOSITORY_API_KEY'),
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'from' => getenv('SENDPOSITORY_FROM'),
        'to' => [$to],
        'subject' => 'Hello from Sendpository',
        'html' => '<p>It works. This email was sent with <strong>one API call</strong>.</p>',
        'text' => 'It works. This email was sent with one API call.',
    ]),
]);

$body = json_decode(curl_exec($ch) ?: 'null', true);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

if ($status >= 200 && $status < 300) {
    echo "Sent. Message id: {$body['id']}\n";
} else {
    fwrite(STDERR, ($body['error']['type'] ?? 'error') . ': ' . ($body['error']['message'] ?? curl_error($ch)) . "\n");
    exit(1);
}
