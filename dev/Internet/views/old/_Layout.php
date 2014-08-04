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

    <title>Withings Activité</title>
    <meta name="description" content="<?php echo $description; ?>">

    <link rel="stylesheet" type="text/css" href="<?php echo CSS_ABS; ?>style.css">

    <!-- SOCIAL DATAS -->
    <!-- GOOGLE PLUS -->
    <meta itemprop="name" content="<?php echo $title; ?>">
    <meta itemprop="description" content="<?php echo $description; ?>">

    <!-- FACEBOOK -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?php echo $title; ?>">
    <meta property="og:url" content="<?php echo "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>">
    <meta property="og:image" content="<?php echo "http://".$_SERVER["HTTP_HOST"].$picture; ?>">
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
    
    <?php /*<section id="<?php echo $template; ?>" class="ajaxContainer">*/?>
    <?php echo $view; ?>
    <?php /*</section>*/ ?>

    <script>
        var mediasPath = '<?php echo MEDIAS; ?>';
        var videosPath = '<?php echo VIDEOS; ?>';
        var FORM = {
            'error': '<?php echo $form->error; ?>',
            'success':'<?php echo $form->success; ?>',
            'already': '<?php echo $form->already; ?>'
        }
    </script>

    <script type="text/javascript" src="//static.criteo.net/js/ld/ld.js"async="true"></script>
    <script type="text/javascript">

        // Google analytics
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-6686090-3']);
        _gaq.push(['_setDomainName', 'withings.com']);
        _gaq.push(['_setAllowLinker', true]);
        _gaq.push(['_trackPageview']);

        (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

        // Ignition one
        (function() {
        var h = "com-withings.netmng.com";
        var a = "2738";
        var t = document.createElement("script");
        t.type = "text/javascript"; t.async = true;
        var p = "https:"==document.location.protocol?"https://":"http://";
        var m = document.referrer.match(/https?:\/\/([a-z]+\.[a-z\.]+)/i);
        var r = (m && m[1] != document.location.hostname) ? ("&ref=" + escape(document.referrer)) : "";
        t.src = p + h + "/?async=1&aid=" + a + r;

        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(t, s);
        })();

        //Adroll
        adroll_adv_id = "EQBDI5AK45ADDD25N4HFMQ";
        adroll_pix_id = "7N46IBRAQVDVFODWQ62X3E";
        (function () {
        var oldonload = window.onload;
        window.onload = function(){
           __adroll_loaded=true;
           var scr = document.createElement("script");
           var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
           scr.setAttribute('async', 'true');
           scr.type = "text/javascript";
           scr.src = host + "/j/roundtrip.js";
           ((document.getElementsByTagName('head') || [null])[0] ||
            document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
           if(oldonload){oldonload()}};
        }());

        // Criteo
        window.criteo_q= window.criteo_q|| [];
        window.criteo_q.push(
        { event: "setAccount", account: 11843 },
        { event: "setSiteType", type: "d" },
        { event: "viewHome" }
        );
        
    </script>

    <script type="text/javascript" src="<?php echo JS_ABS; ?>script.js"></script>

    </body>
</html>

