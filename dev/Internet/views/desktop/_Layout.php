<?php

    $data = $this->data;
    $device = $data['device'];

    $content = $data['content'];
    $meta = $content->meta;
    $form = $content->form;
    //$template = $data['params']['template'];

    $title = $meta->title;
    $description = $meta->text;
    $picture = MEDIAS.'facebook-share.jpg';

    if (MODE == 'prod' && isset($_SERVER['HTTP_X_FORWARDED_HOST'])){
        $url = 'http://' . $_SERVER['HTTP_X_FORWARDED_HOST'];
    } else {
        $url = 'http://' . $_SERVER['HTTP_HOST'];
    }

?>


<!DOCTYPE html>
<!--[if IE 9 ]><html class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html><!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <title>Base</title>
    <meta name="description" content="<?php echo $description; ?>">

    <link rel="stylesheet" type="text/css" href="<?php echo CSS_ABS; ?>style.css">

    <!-- SOCIAL DATAS -->
    <!-- GOOGLE PLUS -->
    <meta itemprop="name" content="<?php echo $title; ?>">
    <meta itemprop="description" content="<?php echo $description; ?>">

    <!-- FACEBOOK -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?php echo $title; ?>">
    <meta property="og:url" content="<?php echo $url . ROOT_WEB . $_SERVER['REQUEST_URI']; ?>">
    <meta property="og:image" content="<?php echo $url.$picture; ?>">
    <meta property="og:site_name" content="Pulse">
    <meta property="og:description" content="<?php echo $description; ?>">


    <!-- TWITTER -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@pulse">
    <meta name="twitter:creator" content="@pulse">
    <meta name="twitter:title" content="<?php echo $title; ?>">
    <meta name="twitter:description" content="<?php echo $description; ?>">
    <meta name="twitter:image" content="<?php echo $picture; ?>">

    <link rel="icon" type="image/gif" href="<?php echo MEDIAS.'favicon/'; ?>favicon.png">

    <!--[if lte IE 8]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>
    <![endif]-->

</head>
<body class="<?php echo $data['device']; ?>">
    <?php include_once('partials/header.php'); ?>
    
    <?php /*<section id="<?php echo $template; ?>" class="ajaxContainer">*/?>
	<?php echo $view; ?>
    <?php /*</section>*/ ?>


    <?php include_once('partials/footer.php'); ?>
    <script>
        var mediasPath = '<?php echo MEDIAS; ?>';
        var videosPath = '<?php echo VIDEOS; ?>';
    </script>

    <script type="text/javascript" src="<?php echo JS_ABS; ?>script.js"></script>

    </body>
</html>

