<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <title>Neowsap</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead

</head>
<body class="font-hanken-grotesk min-h-screen">
    @inertia
</body>
</html>