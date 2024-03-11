<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use use PHPMailer\PHPMailer\Exeption;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setFrom('info@fls.guru', 'Фрилансер по жизни');
    //Кому отправить
    $mail->addAddress('eva120@yandex.ru');
    //Тема письма
    $mail->Subject = 'Привет, это Фрилансер по жизни';

    //Тело письма
    $body = '<h1>Встречайте супер письмо</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['e-mail'].'</p>';
    }

    $mail->Body = $body;

    //Отправляем
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>