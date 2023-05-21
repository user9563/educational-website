<?php
    $login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
    $password = filter_var(trim($_POST['password']), FILTER_SANITIZE_STRING);
    
    if(mb_strlen($login) < 5 || mb_strlen($login) > 90) {
        echo "Недопустимая длина логина (от 5 до 90 символов)";
        exit();
    }
    else if(mb_strlen($password) < 2 || mb_strlen($password) > 6) {
        echo "Недопустимая длина пароля (от 2 до 6 символов)";
        exit();
    }

    $password = md5($password."aboba123");

    $mysql = new mysqli('localhost', 'u2062424_default', 'tjBIl38Ii2uYLZ2b', 'u2062424_default');
    $mysql->query("INSERT INTO `users` (`login`, `password`) VALUES('$login','$password')");
    $mysql->close();

    header('Location: /');
?>
