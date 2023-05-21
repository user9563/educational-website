<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="main-div">
        <div id="top-menu">
            <p>Топ меню</p>
        </div>

        <?php
            if($_COOKIE['user'] == ''):
        ?>

        <div id="reg-form">
            <h1>Форма регистрации</h1>
            <form action="/validation-form/check.php" method="post">
                <input type="text" name="login" id="login" placeholder="Введите логин"><br>
                <input type="text" name="password" id="password" placeholder="Введите пароль"><br>
                <button type="submit">Зарегестрироваться</button>
            </form>
        </div>

        <div id="auth-form">
            <h1>Форма авторизации</h1>
            <form action="/validation-form/auth.php" method="post">
                <input type="text" name="login" id="login" placeholder="Введите логин"><br>
                <input type="text" name="password" id="password" placeholder="Введите пароль"><br>
                <button type="submit">Войти</button>
            </form>
        </div>

        <?php
            endif;
        ?>
    </div>
</body>
</html>
