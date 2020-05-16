function playAnimation(iso) {
  var animationName = ""

  if (["jump", "sprung", "skid", "bounced", "drowning"].includes(iso.action)) {
    animationName = iso.action + "-" + iso.direction
  }
  else if (iso.action == "hurt") {
    animationName = iso.action + "-" + iso.hurtDIR
  }
  else if (iso.action == "dead") {
    iso.alpha = 0.75;
    animationName = "dead"
  }
  // else if (iso.action === "skidding") {
  //   animationName = "skid" + iso.direction
  // }
  else {
    animationName = iso.action + "-" + iso.direction + iso.direction2
  }

  if (iso.animations.currentAnim.name !== animationName) {
    iso.animations.play(animationName)
  }
}

function createAnimations(iso) {
  iso.animations.add('stand-d',[0,1,2,2,2,1,0,3,4,4,4,3],6,true);
  iso.animations.add('stand-l',[10,11,12,12,12,11,10,13,14,14,14,13],6,true);
  iso.animations.add('stand-u',[22,23,24,24,24,25,26,27,20,20,20,21],6,true);
  iso.animations.add('stand-r',[32,33,34,34,34,35,36,37,30,30,30,31],6,true);
  iso.animations.add('dead',   [9],6,true);
  iso.animations.add('walk-dr',[260,261,262,263,264,265,266,267,268,269],12,true);
  iso.animations.add('walk-d', [40,41,42,43,44,45,46,47,48,49],12,true);
  iso.animations.add('walk-dl',[270,271,272,273,274,275,276,277,278,279],12,true);
  iso.animations.add('walk-ld',[280,281,282,283,284,285,286,287,288,289],12,true);
  iso.animations.add('walk-l', [50,51,52,53,54,55,56,57,58,59],12,true);
  iso.animations.add('walk-lu',[290,291,292,293,294,295,296,297,298,299],12,true);
  iso.animations.add('walk-ul',[300,301,302,303,304,305,306,307,308,309],12,true);
  iso.animations.add('walk-u', [60,61,62,63,64,65,66,67,68,69],12,true);
  iso.animations.add('walk-ur',[310,311,312,313,314,315,316,317,318,319],12,true);
  iso.animations.add('walk-ru',[320,321,322,323,324,325,326,327,328,329],12,true);
  iso.animations.add('walk-r', [70,71,72,73,74,75,76,77,78,79],12,true);
  iso.animations.add('walk-rd',[330,331,332,333,334,335,336,337,338,339],12,true);
  iso.animations.add('jump-d', [80,81,80,82,80,83,80,84],10,true);
  iso.animations.add('jump-l', [80,85,80,86,80,87,80,88],10,true);
  iso.animations.add('jump-r', [90,91,90,92,90,93,90,94],10,true);
  iso.animations.add('jump-u', [90,95,90,96,90,97,90,98],10,true);
  iso.animations.add('run-dr', [100,101,102,103,104,105,106,107,108,109],35,true);
  iso.animations.add('run-d',  [110,111,112,113,114,115,116,117,118,119],35,true);
  iso.animations.add('run-dl', [120,121,122,123,124,125,126,127,128,129],35,true);
  iso.animations.add('run-lu', [130,131,132,133,134,135,136,137,138,139],35,true);
  iso.animations.add('run-l',  [140,141,142,143,144,145,146,147,148,149],35,true);
  iso.animations.add('run-ld', [150,151,152,153,154,155,156,157,158,159],35,true);
  iso.animations.add('run-ur', [160,161,162,163,164,165,166,167,168,169],35,true);
  iso.animations.add('run-u',  [170,171,172,173,174,175,176,177,178,179],35,true);
  iso.animations.add('run-ul', [180,181,182,183,184,185,186,187,188,189],35,true);
  iso.animations.add('run-ru', [190,191,192,193,194,195,196,197,198,199],35,true);
  iso.animations.add('run-r',  [200,201,202,203,204,205,206,207,208,209],35,true);
  iso.animations.add('run-rd', [210,211,212,213,214,215,216,217,218,219],35,true);
  iso.animations.add('skid-d', [220,220,220,221,222,223,224,225],10);
  iso.animations.add('skid-l', [230,230,230,231,232,233,234,235],10);
  iso.animations.add('skid-u', [240,240,240,241,242,243,244,245],10);
  iso.animations.add('skid-r', [250,250,250,251,252,253,254,255],10);
  iso.animations.add('hurt-d', [340,349,341,349,342,349,343,349,344,349,345,349,346,349],10,true);
  iso.animations.add('hurt-l', [350,359,351,359,352,359,353,359,354,359,355,359,356,359],15,true);
  iso.animations.add('hurt-u', [360,369,361,369,362,369,363,369,364,369,365,369,366,369],15,true);
  iso.animations.add('hurt-r', [370,379,371,379,372,379,373,379,374,379,375,379,376,379],15,true);
  iso.animations.add('bounced-d',[380,380,380,380,381,382,383,384,385,386,387,388],15,false);
  iso.animations.add('bounced-l',[390,390,390,390,391,392,393,394,395,396,397,398],15,false);
  iso.animations.add('bounced-u',[400,400,400,400,401,402,403,404,405,406,407,408],15,false);
  iso.animations.add('bounced-r',[410,410,410,410,411,412,413,414,415,416,417,418],15,false);
  iso.animations.add('wobble-d',[420,421,422,423,424,425,426,427,428,429,430,431,432,433],15,false);
  iso.animations.add('wobble-l',[436,437,438,439,440,441,442,443,444,445,446,447,448,449],15,false);
  iso.animations.add('wobble-u',[450,451,452,453,454,455,456,457,458,459,460,461,462,463],15,false);
  iso.animations.add('wobble-r',[466,467,468,469,460,471,472,473,474,475,476,477,478,479],15,false);
  iso.animations.add('sprung-d',[480,481,482,483,484,485],12,false);
  iso.animations.add('sprung-l',[490,491,492,493,494,495],12,false);
  iso.animations.add('sprung-u',[500,501,502,503,504,505],12,true);
  iso.animations.add('sprung-r',[510,511,512,513,514,515],12,true);
  iso.animations.add('falling-d',[486,487,488],12,false);
  iso.animations.add('falling-l',[496,497,498],12,false);
  iso.animations.add('falling-u',[506],12,true);
  iso.animations.add('falling-r',[516],12,true);
  iso.animations.add('drowning-d',[525,526,527,528,529,525,526,527,528,529,537,538,539,533,534,535,536,5],12,false);
  iso.animations.add('drowning-l',[520,521,522,523,524,520,521,522,523,524,530,531,532,533,534,535,536,5],12,false);
  iso.animations.add('drowning-u',[520,521,522,523,524,520,521,522,523,524,530,531,532,533,534,535,536,5],12,false);
  iso.animations.add('drowning-r',[525,526,527,528,529,525,526,527,528,529,537,538,539,533,534,535,536,5],12,false);

  iso.animations.add('sink-' , [168,169,170,171],10,true);
}