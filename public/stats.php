<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Allow: GET, POST, OPTIONS');
  http_response_code(204);
  exit;
}

$file = __DIR__ . '/stats-store.json';

function dfa_load_stats($fp) {
  $raw = stream_get_contents($fp);
  rewind($fp);
  if ($raw === false || trim($raw) === '') {
    return array('users' => 0, 'lessons' => 0);
  }
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    return array('users' => 0, 'lessons' => 0);
  }
  return array(
    'users' => max(0, (int) (isset($data['users']) ? $data['users'] : 0)),
    'lessons' => max(0, (int) (isset($data['lessons']) ? $data['lessons'] : 0)),
  );
}

function dfa_save_stats($fp, $data) {
  ftruncate($fp, 0);
  rewind($fp);
  fwrite($fp, json_encode($data));
  fflush($fp);
}

$fp = fopen($file, 'c+');
if ($fp === false) {
  http_response_code(500);
  echo json_encode(array('error' => 'store'));
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  flock($fp, LOCK_SH);
  $data = dfa_load_stats($fp);
  flock($fp, LOCK_UN);
  fclose($fp);
  echo json_encode($data);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  fclose($fp);
  http_response_code(405);
  echo json_encode(array('error' => 'method'));
  exit;
}

$rawIn = file_get_contents('php://input');
$input = json_decode($rawIn ? $rawIn : '', true);
if (!is_array($input)) {
  $input = array();
}
$event = isset($input['event']) ? (string) $input['event'] : '';

flock($fp, LOCK_EX);
$data = dfa_load_stats($fp);

if ($event === 'register') {
  $data['users'] += 1;
} elseif ($event === 'lessons') {
  $n = isset($input['count']) ? (int) $input['count'] : 1;
  if ($n < 1) {
    $n = 1;
  }
  if ($n > 500) {
    $n = 500;
  }
  $data['lessons'] += $n;
} else {
  flock($fp, LOCK_UN);
  fclose($fp);
  http_response_code(400);
  echo json_encode(array('error' => 'event'));
  exit;
}

dfa_save_stats($fp, $data);
flock($fp, LOCK_UN);
fclose($fp);
echo json_encode($data);
