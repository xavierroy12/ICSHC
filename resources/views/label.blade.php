<!DOCTYPE html>
<html>
<head>
    <title>Label for Actif {{ $actif->nom }}</title>
    <style>
        body {
            width: 4in; /* Adjust to match your label width */
            height: 6in; /* Adjust to match your label height */
            font-family: Arial, sans-serif;
            text-align: center;
            display: flex;
            flex-direction: column;
        }
        
        p:nth-child(1) {
            margin: 0; /* Remove margin from the first p element */
            font-weight: bold; /* Make the text bold */

        }
        p:nth-child(2), p:nth-child(3) {
            margin: 0px; /* Apply margin to the second and third p elements */
            font-weight: bold; /* Make the text bold */

        }
        .barcode {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0px;
        }
    </style>
</head>
<body>
    <p>CSS des hauts cantons</p>
    <p>{{ $actif->nom }}</p>
    <div class="barcode">{!! $barcode !!}</div>
    <p>{{ $actif->numero_serie }}</p>
</body>
</html>