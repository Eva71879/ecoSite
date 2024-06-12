<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);

    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    // $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'username'; // Логин на почте
    $mail->Password   = 'password'; // Пароль для внешнего приложения
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('sender@mail.ru', 'Клиент'); // Адрес созданной почты и имя отправителя

    // Получатель письма
    $mail->addAddress('recipient@yandex.ru');  // адрес, куда ждешь получения письма

    //Тело письма
    $body = '<html><h1>Добрый день. </h1><br><h2>Новая заявка.</h2>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя клиента:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>Почта клиента:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Номер телефона:</strong> '.$_POST['phone'].'</p>';
    }

    $mail->IsHTML(true);
    $mail->Subject = 'Заявка на экологическую консультацию';
    $mail->Body = $body;

    //Отправляем
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Заявка отправлена!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

    ?>