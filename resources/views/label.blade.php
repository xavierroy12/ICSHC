<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            width: 4in; /* Adjust to match your label width */
            height: 6in; /* Adjust to match your label height */
            font-family: Arial, sans-serif;
            text-align: center;
            display: flex;
            flex-direction: column;
            font-size: 12px; /* Adjust to reduce the size of the text */

        }
        p {
            margin: 0; /* Remove margin from all p elements */
            font-weight: bold;
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
        .barcode img {
            height: 20px; /* Adjust to reduce the size of the barcode */
            width: auto; /* Adjust to maintain the aspect ratio of the barcode */
        }
    </style>
</head>
<body>
    @foreach ($actifs as $actif)
    <div style="page-break-after: always; margin-top: 10px; padding: 0;">
            <p>C. S. S. des Hauts-Cantons</p>
            <p>{{ $actif->nom }}</p>
            <div class="barcode">        
                <img src="data:image/png;base64,{{ $barcodes[$actif->id] }}" alt="Barcode">
            </div>
            <p>{{ $actif->numero_serie }}</p>
        </div>
    @endforeach
</body>
</html>