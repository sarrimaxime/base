<?php
    

    //class Utils {


    	function toLower($str){

            $str = str_replace('<br/>', '-', $str);
            $str = strtolower(trim(preg_replace('~[^0-9a-z]+~i', '-', html_entity_decode(preg_replace('~&([a-z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml);~i', '$1', htmlentities($str, ENT_QUOTES, 'UTF-8')), ENT_QUOTES, 'UTF-8')), '-'));

            return $str;

        } 

        function getAverageColor($src){
            
        	$file = SERVER_ROOT.substr($src, 1);

            if (file_exists($file)){
                $img = imagecreatefromjpeg($file);
                $imgw = imagesx($img);
                $imgh = imagesy($img);
                
                $n = $imgw * $imgh;
                
                $pixel = imagecreatetruecolor(1, 1);
                imagecopyresampled($pixel, $img, 0, 0, 0, 0, 1, 1, $imgw, $imgh);
                $rgb = imagecolorat($pixel, 0, 0);
                $color = imagecolorsforindex($pixel, $rgb);
                
                $i = 0;

                #$min = min($color['red'], $color['green'], $color['blue']);
                #if ($min < 50){
                #    $up = 50 - $min;
                #    $color['red'] += $up;
                #    $color['green'] += $up;
                #    $color['blue'] += $up;
                #}


                $i++;
            }
            else {
                $color['red'] = '200';
                $color['green'] = '200';
                $color['blue'] = '200';
            }
                                    
            return 'rgb('.$color['red'].','.$color['green'].','.$color['blue'].')';
            
        }

        function convertHexaToRGB($code){

            $code = '#'.$code;

            if(preg_match("/^[#]([0-9a-fA-F]{6})$/",$code)){

                $hex_R = substr($code,1,2);
                $hex_G = substr($code,3,2);
                $hex_B = substr($code,5,2);

                $RGB = hexdec($hex_R).",".hexdec($hex_G).",".hexdec($hex_B);

            }

            return 'rgb('.$RGB.')';

        }

        function xml2array ( $xmlObject, $out = array () )
        {
            foreach ( (array) $xmlObject as $index => $node )
                $out[$index] = ( is_object ( $node ) ) ? xml2array ( $node ) : $node;

            return $out;
        }

    //}