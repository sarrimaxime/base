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

    <title><?php echo $title; ?></title>
    <meta name="description" content="<?php echo $description; ?>">

    <link rel="stylesheet" type="text/css" href="<?php echo CSS_ABS; ?>style.mobile.css">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

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
<body>

	
    
    <!-- INTRO -->

    <?php $screen = $content->screens->screen[0]; ?>

    <section class="screen" id="intro">
        <div id="intro-loop">
            <img src="<?php echo MEDIAS; ?>mobile/screens/intro/poster.jpg" alt="">
        </div>

        <div class="front">
            <span class="button" id="play-video"></span>
            <a href="" id="logo">
                <img src="<?php echo IMG; ?>withings-activite-logo-mobile-white.png" />
            </a>
            <h1 class="title"><?php echo $screen->subtitle1; ?></h1>
        </div>

    </section>

    <!-- END INTRO -->


    <!-- Life in motion -->

    <?php $screen = $content->screens->screen[0]; ?>

    <section class="screen" id="life-is-motion">
        <header class="centered">
            <h2 class="title"><?php echo $screen->title; ?></h2>
            <p class="text"><?php echo $screen->text1; ?></p>
        </header>

        <div class="slider">
            <!-- <div class="slides-images"> -->
                <div class="slide">
                    <img class="bottom-align" src="<?php echo MEDIAS; ?>mobile/screens/life-in-motion/life-in-motion-slider-1.jpg">
                    <p class="text"><?php echo $screen->watch->text1; ?></p>
                </div>
                <div class="slide">
                    <img class="bottom-align" src="<?php echo MEDIAS; ?>mobile/screens/life-in-motion/life-in-motion-slider-2.jpg">
                    <p class="text"><strong><?php echo $screen->watch->text2->title; ?></strong> <?php echo $screen->watch->text2->text; ?></p>
                </div>
                <div class="slide">
                    <img class="bottom-align" src="<?php echo MEDIAS; ?>mobile/screens/life-in-motion/life-in-motion-slider-3.jpg">
                    <p class="text"><strong><?php echo $screen->watch->text3->title; ?></strong> <?php echo $screen->watch->text3->text; ?></p>
                </div>
            </div><!-- 
            <div class="slides-nav">
                <ul></ul>
            </div>
            <div class="slides-text">
                <div class="slide">
                    <h3>Withings introduces Activité</h3>
                    <p>a new generation watch combining time &amp; activity tracking</p>
                </div>
                <div class="slide">
                    <h3>Withings introduces Activité</h3>
                    <p>a new generation watch combining time &amp; activity tracking</p>
                </div>
                <div class="slide">
                    <h3>Withings introduces Activité</h3>
                    <p>a new generation watch combining time &amp; activity tracking</p>
                </div>
            </div> -->
        </div>


        <div class="context-image">
            <img src="<?php echo MEDIAS; ?>mobile/screens/life-in-motion/product-context.jpg" alt="">
        </div>

    </section>

    <!-- END Life in motion -->


    <!-- How it Works -->

    <?php $screen = $content->screens->screen[1]; ?>

    <section class="screen" id="how-it-works">
        <header class="centered">
            <h2 class="title"><?php echo $screen->title; ?></h2>
            <p class="text"><?php echo $screen->text; ?></p>
        </header>


        <div class="slider">
            
            <div class="slide">
                <img src="<?php echo MEDIAS; ?>mobile/screens/how-it-works/how-it-works-personal-coach.jpg" alt="">
                <p class="text"><?php echo $screen->details->text1->text; ?></p>
            </div>

            <div class="slide">
                <img src="<?php echo MEDIAS; ?>mobile/screens/how-it-works/how-it-works-optimize-sleep.jpg" alt="">
                <p class="text"><?php echo $screen->details->text2->text; ?></p>
            </div>

        </div>


        <div class="picture-container">
            <img src="<?php echo MEDIAS; ?>mobile/screens/how-it-works/how-it-works-activity-health-1.jpg" alt="">
        </div>
    
        <h2 class="subtitle"><?php echo $screen->details->text3->title; ?></h2>

        <div class="picture-container">
            <img src="<?php echo MEDIAS; ?>mobile/screens/how-it-works/how-it-works-activity-health-2.jpg" alt="">
        </div>

        <p class="text"><?php echo $screen->details->text3->text; ?></p>

        <div class="slider">
            <div class="slide">
                <img class="bottom-align" src="<?php echo MEDIAS; ?>mobile/screens/how-it-works/how-it-works-slider-1.jpg">
                <p class="text"><?php echo $screen->parallax; ?></p>
            </div>
        </div>

    </section>
    

    <!-- END How it Works -->

    <b class="section-separator"></b>

    <!-- Handcraft design -->

    <?php $screen = $content->screens->screen[2]; ?>

    <section class="screen" id="handcraft-design">

        <header class="centered">
            <h2 class="title"><?php echo $screen->title; ?></h2>
            <p class="text"><?php echo $screen->text; ?></p>
        </header>

        <div class="slider">
            <div class="slides">
                <div class="slide">
                    <div class="img-container">
                        <img class="bottom-align" src="<?php echo MEDIAS; ?>mobile/screens/handcraft-design/handcraft-design-slider-1.jpg">
                    </div>
                    <p class="subtitle"><?php echo $screen->slider->slide[0]->title; ?></p>
                    <p class="text"><?php echo $screen->slider->slide[0]->text; ?></p>
                </div>
                <div class="slide">
                    <div class="img-container">
                        <img class="bottom-align" src="<?php echo MEDIAS; ?>mobile/screens/handcraft-design/handcraft-design-slider-2.jpg">
                    </div>
                    <p class="subtitle"><?php echo $screen->slider->slide[1]->title; ?></p>
                    <p class="text"><?php echo $screen->slider->slide[1]->text; ?></p>
                </div>
            </div>
            <div class="slides-nav">
                <ul></ul>
            </div>
        </div>
    
    </section>
    <!-- END Handcraft design -->
    

    <!-- Technicals -->

    <?php $screen = $content->screens->screen[3]; ?>

    <section class="screen" id="technicals">
    
        <b class="section-separator"></b>

        <div class="centered">
            <h2 class="title"><?php echo $screen->title; ?></h2>
            <p class="text"><?php echo $screen->text; ?></p>
        </div>


        <div class="slider">
            <div class="slides">
                <div class="slide">
                    <div class="img-container">
                        <img class="bottom-align" src="<?php echo MEDIAS; ?>mobile/screens/technicals/technicals-slider-1.jpg">
                    </div>
                </div>
            </div>
            <div class="slides-nav">
                <ul></ul>
            </div>
        </div>

    </section>

    <!-- ENDTechnicals -->

    <b class="section-separator"></b>

    <!-- Full specs -->

    <?php $screen = $content->screens->screen[4]; ?>

    <section class="screen" id="full-specs">
        <header class="centered">
            <h2 class="title">Specifications</h2>
            <p class="text">Two models: black and silver</p>
            <p class="text">Activité is entirely Swiss-made and water (5ATM) resistant</p>
            <p class="text">Withings Activité does not need to be recharged and works with a CR2025 button cell lasting a full year</p>
        </header>

        <div class="watches">
            <span class="price">390 USD</span>
            <p>
                <img class="left" src="<?php echo MEDIAS; ?>mobile/screens/withings-activite-black.png" alt="Withings Activité black"/>
                <img src="<?php echo MEDIAS; ?>mobile/screens/withings-activite-brown.png" alt="Withings Activité brown"/>
            </p>
        </div>

        <div class="slider">

            <b class="section-separator"></b>

            <div class="slides">
                    <?php foreach ($screen->specs->spec as $spec){ ?>
                        <div class="slide">
                            <h3><?php echo $spec->title; ?></h3>
                            <p class="text"><?php echo $spec->text; ?></p>
                        </div>
                    <?php } ?>
            </div>
            <div class="slider-nav"></div>
        </div>
        
    </section>

    <!-- END Full specs -->

    <!-- footer -->

    <?php 
        $header = $content->header;
        $form = $content->form;
    ?>

    <footer id="main-footer">
        <p class="call-action">
            <a href="#"><?php echo $header->notify; ?></a>
        </p>

        <form id="keep-form" method="post" action="http://email.withings.com/form.php?form=60">
            <p class="text"><?php echo $form->text; ?></p>
            <p>
                <input type="email" class="field" name="email" placeholder="Email" />
                <input type="hidden" name="format" value="h" />
                <input type="hidden" name="CustomFields[59]" id="CustomFields_59_60" value="<?php echo $language; ?>">
                <input type="submit" class="submit" value="submit"/>
            </p>
            <p class="message"></p>
        </form>

        <div class="infos-container">
            <div class="infos infos-logo">
                <a href=""><img src="<?php echo IMG; ?>withings-activite-logo-mobile-colors.png" /></a>
            </div>
            <div class="infos infos-links">
                <ul>
                    <li class="text">
                        <a target="_blank" href="http://www.withings.com/">Go to <span>www.withings.com</span></a>
                    </li>
                    <li class="text">
                        <a target="_blank" href="">Official Product page</a>
                    </li>
                </ul>
            </div>
            <div class="infos infos-socials">
                <h3>Follow us on</h3>
                <ul>
                    <li><a href="https://www.facebook.com/withings" target="blank" class="social-facebook"></a></li>
                    <li><a href="https://twitter.com/Withings" target="blank" class="social-twitter"></a></li>
                    <li><a href="http://instagram.com/withings" target="blank" class="social-instagram"></a></li>
                    <li style="margin-right: 0;"><a href="https://plus.google.com/+withings/posts" target="blank" class="social-google-plus"></a></li>
                </ul>
            </div>
        </div>

    </footer>

    <!-- END footer -->

<?php
        $url .=  ROOT_WEB . $_SERVER['REQUEST_URI'];
        $fbLink = "https://www.facebook.com/sharer/sharer.php?u=" . $url;
        $twitterLink = "https://twitter.com/intent/tweet?text=" . urlencode($meta->title) . ' ' . $url;
        $googleLink = "https://plus.google.com/share?" . $url;

        $form->success = str_replace('[facebook]', $fbLink, $form->success);
        $form->success = str_replace('[twitter]', $twitterLink, $form->success);
        $form->success = str_replace('[google]', $googleLink, $form->success);

        $form->already = str_replace('[facebook]', $fbLink, $form->success);
        $form->already = str_replace('[twitter]', $twitterLink, $form->success);
        $form->already = str_replace('[google]', $googleLink, $form->success);
    ?>
    <script>
        var mediasPath = '<?php echo MEDIAS; ?>';
        var videosPath = '<?php echo VIDEOS; ?>';
        var FORM = {
            'error': '<?php echo $form->error; ?>',
            'success':'<?php echo $form->success; ?>',
            'already': '<?php echo $form->already; ?>'
        }
    </script>

    <script type="text/javascript" src="<?php echo JS_ABS; ?>script.mobile.js"></script>

    </body>
</html>

