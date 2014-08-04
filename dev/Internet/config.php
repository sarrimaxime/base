<?php
/**
 * consts
 */

if (preg_match_all('#\b(.free|.dev|.xip.io)\b#', $_SERVER['HTTP_HOST'], $matches)){
    define('ENV', 'dev');
}
else {
    define('ENV', 'prod');
}

define('NOLANG', true);
define('COMPLEXEDLANG', false);


define('SERVER_ROOT', $_SERVER['DOCUMENT_ROOT']."/");
if (ENV == 'prod'){
    define('ROOT_WEB', str_replace('index.php', '', $_SERVER['SCRIPT_NAME']));
}
else {
    define('ROOT_WEB', str_replace('index.php', '', $_SERVER['SCRIPT_NAME']));
}
define('ROOT', str_replace('index.php', '', $_SERVER['SCRIPT_FILENAME']));
define('MEDIAS', ROOT_WEB.'medias/');
//define('VIDEOS', MEDIAS.'videos/');
define('IMG', ROOT_WEB.'img/');
define('MEDIAS_ABS', ROOT_WEB.'medias/');
define('CSS_ABS', ROOT_WEB.'css/');
define('JS_ABS', ROOT_WEB.'js/');


// CHECK LANG
if (NOLANG == false){
    $langs = array();

    if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        // break up string into pieces (languages and q factors)
        preg_match_all('/([a-z]{1,8}(-[a-z]{1,8})?)\s*(;\s*q\s*=\s*(1|0\.[0-9]+))?/i', $_SERVER['HTTP_ACCEPT_LANGUAGE'], $lang_parse);

        if (count($lang_parse[1])) {
            // create a list like "en" => 0.8
            $langs = array_combine($lang_parse[1], $lang_parse[4]);

            if (COMPLEXEDLANG == true){
                $tmp = array();

                // set default to 1 for any without q factor
                foreach ($langs as $lang => $val) {
                    if( strlen($lang) == 5 )
                    {
                        $lang = substr($lang, 0,2) .'-'. strtoupper( substr($lang, 3,2) );
                        $tmp[$lang] = $val;
                    }

                    if ($val === '') $tmp[$lang] = 1;
                }

                $langs = $tmp;
            }

            // sort list based on value
            arsort($langs, SORT_NUMERIC);
        }
    }

    // look through sorted list and use first one that matches our languages
    $def = 'en';

    $availableLangs = getcwd().'/xml/';
    $folders = scandir($availableLangs);

    $lang = "";
    foreach ($langs as $langg=>$perc){
        $limit = (COMPLEXEDLANG == true) ? 5 : 2;
        if (strlen($langg) == $limit){
            $lang = $langg;
            break;
        }
    }

    foreach ($folders as $folder){
        if (substr($folder, 0, 1) != '.'){
            if ($folder == $lang){
              $def = $folder;
            }
        }
    }
}
else {
    $def = '';
}

define('DEFAULT_LANGUAGE', $def);
