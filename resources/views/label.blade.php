<!DOCTYPE html>
<html>
<head>
    <title>Label for Actif {{ $actif->nom }}</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        img {
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>CSS des hauts cantons</h1>
    <h2>{{ $actif->nom }}</h2>
    <img src="{{ $qrCodeUrl }}" alt="QR Code">
    <p>{{ $actif->numero_serie }}</p>
</body>
</html>