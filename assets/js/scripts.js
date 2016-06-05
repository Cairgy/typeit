var Promo = {

  examples : {
    $example1 : $('#example1'),
    $example2 : $('#example2'),
    $example3 : $('#example3'),
    $example4 : $('#example4')
  }, 

  init : function() {
    this.setHeaderSize();
    this.smoothScroll();
    this.buttonResets();
    this.headerTyping();
    this.mobileMenu();
    this.showCode();
    this.fixedMenu();
    this.demoForm();
    this.example1();
    this.example2();
    this.example3();
    this.example4();
  }, 

  setHeaderSize : function() {
    $('#header').height($(window).height());

    $('.Body--home').find('section').find('h2').typeIt({
      speed: 50,
      autoStart: false
    });

    $('.Body--home').find('section').find('h3').typeIt({
      speed: 50,
      autoStart: false
    });
  }, 

  headerTyping : function() {
    $('#typeit-box').typeIt({
      speed: 100,
      startDelay: 1250, 
      callback: function() {
        $('#typeit-box-code-link').addClass('is-visible');
      }
    })
    .tiType('A jQuery pl')
    .tiPause(500)
    .tiDelete(12)
    .tiPause(500)
    .tiType('The <strong>most versatile</strong> jquery')
    .tiPause(200)
    .tiDelete(5)
    .tiType('Query typing plugin on the net.')
    .tiPause(500)
    .tiDelete(11)
    .tiPause(350)
    .tiType('on the ')
    .tiPause(600)
    .tiType('<em>planet.</em>');
  }, 

  example1 : function() {
    this.examples.$example1.typeIt({
      strings: 'This is a simple string.',
      speed: 50,
      autoStart: false
    });
  },

  example2 : function() {
    this.examples.$example2.typeIt({
      strings: ["This is a great string.","But here is a better one."],
      speed: 50,
      breakLines: false,
      autoStart: false
    });
  },
  

  example3 : function() {
    this.examples.$example3.typeIt({
      strings: ["This is a great string.", "And here we have another great string."],
      speed: 50,
      breakLines: true,
      autoStart: false
    });
  },

  example4 : function() {
    this.examples.$example4.typeIt({
      speed: 50,
      autoStart: false
    })
    .tiType('Wll')
    .tiPause(500)
    .tiDelete(2)
    .tiType('ell, ')
    .tiPause(1000)
    .tiType('I guess I\'m typing..')
    .tiBreak()
    .tiPause(750)
    .tiType(' but I don\'t really know what to say')
    .tiSettings({speed: 700})
    .tiType('...')
    .tiPause(750)
    .tiSettings({speed: 50})
    .tiDelete()
    .tiType('IS THAT SO <strong>WRONG??</strong>');
  },

  buttonResets : function() {
    var $sections = $('section');

    $sections.on('click','#btn-example1', function() {
      if (Promo.examples.$example1.data('typeit') !== undefined) {
        Promo.examples.$example1.removeData('typeit');
      }
      Promo.examples.$example1.html('');
      Promo.example1();
    });

    $sections.on('click','#btn-example2',function() {
      if (Promo.examples.$example2.data('typeit') !== undefined) {
        Promo.examples.$example2.removeData('typeit');
      }
      Promo.examples.$example2.html('');
      Promo.example2();
    });

    $sections.on('click','#btn-example3', function() {
      if (Promo.examples.$example3.data('typeit') !== undefined) {
        Promo.examples.$example3.removeData('typeit');
      }
      Promo.examples.$example3.html('');
      Promo.example3();
    });

    $sections.on('click','#btn-example4', function() {
      if (Promo.examples.$example4.data('typeit') !== undefined) {
        Promo.examples.$example4.removeData('typeit');
      }
      Promo.examples.$example4.html('');
      Promo.example4();
    });
  }, 

  demoForm : function() {
    $('#iSpeed').val('100');
    $('#iBreakDelay').val('750');
    $('#iCursorSpeed').val('1000');
    $('#iStartDelay').val('250');
    $('#iLoopDelay').val('750');

    $('#TIInput').on('click','#TISubmit', function(e){

      e.preventDefault();

      var tiOutput = $('#TIOutput');
      var curData = tiOutput.data('typeit');

      // if there's another process going on, stop it and wipe the output box
      if(curData !== undefined) {
        clearTimeout(curData.tTO);
        clearTimeout(curData.dTO);
        curData.s.loop = false;
        tiOutput.removeData();
      }

      tiOutput.html('');

      // get variables figured out
      var strings;
      var cleanedstrings = [];
      if($('#stringTI').val() === '') {
        cleanedstrings = 'You didn\'t enter a string!';
      } else {
        strings = $('#stringTI').val().split('\n');
        // remove empty array item
        for (var i = 0; i < strings.length; i++) {
          if (strings[i] !== undefined && strings[i] !== null && strings[i] !== "") {
            cleanedstrings.push(strings[i]);
          }
        }
      }

      var newHeight = ($('#stringTI').val()) ? (cleanedstrings.length * 38) + 40 : 75;
      var speed = $('#iSpeed').val();
      var html = $('#iHTML').val() === 'true' ? true : false;
      var lifeLike = $('#iLifeLike').val() === 'true' ? true : false;
      var cursor = $('#iCursor').val() === 'true' ? true : false;
      var cursorSpeed = $('#iCursorSpeed').val();
      var breakLines = $('#iBreakLines').val() === 'true' ? true : false;
      var breakDelay = $('#iBreakDelay').val();
      var breakStart = $('#iBreakStart').val();
      var startDelay = $('#iStartDelay').val();
      var loop = $('#iLoop').val() === 'true' ? true : false;
      var loopDelay = $('#iLoopDelay').val();
      var startDelete = $('#iStartDelete').val() === 'true' ? true : false;

      // hide the temp text
      $('#tempText').animate({
        opacity: 0
      });

      // expand the container
      $('#TIOutputBox').animate({
        height: newHeight
      }, function() {

        $('html, body').animate({
            scrollTop: $("#TIOutputBox").offset().top - 200
        }, 800);

        setTimeout(function() {

          tiOutput.typeIt({
              strings: cleanedstrings,
              speed: Number(speed),
              lifeLike: lifeLike,
              cursor: cursor,
              cursorSpeed: Number(cursorSpeed),
              breakLines: breakLines,
              breakDelay: Number(breakDelay),
              startDelay: Number(startDelay),
              loop: loop,
              loopDelay: Number(loopDelay),
              html: html,
              startDelete: startDelete
            });
        }, 800);
      });
    });
  }, 

  smoothScroll : function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 300, function() {
            $('.SectionList').removeClass('is-open');
          });
          return false;
        }
      }
    });
  }, 

  mobileMenu : function() {
    var $sidebar = $('.Docs-sidebar');

    $('.Docs').on('click','#menu-toggle', function() {
      $('.SectionList').toggleClass('is-open');
    });
  }, 

  fixedMenu : function() {
    var $list = $('.SectionList');

    if($(window).width() > 600 && $list.length) {
      var $list = $('.SectionList');
      var $content = $('.Docs-content');
      var $listPos = $list.offset().top;
      var $listWidth = $list.outerWidth();

      $(window).scroll(function(){    
        if ($(this).scrollTop() > $listPos){ 
          $list.addClass('is-fixed').css('width', $listWidth);
          $content.css('margin-left', $listWidth);
        }
        else{
          $list.removeClass('is-fixed').css('width', '');
          $content.css('margin-left', '');
        }
      });
    }
  },

  showCode : function() {
    var $header = $('#header');
    var $code = $('#typeit-box-code');

    $header.on('click', '#typeit-box-code-link', function(e) {
      $code.addClass('is-visible');
    });

    $header.on('click', '#typeit-box-code-close, #typeit-box-code', function(e) {
      $code.removeClass('is-visible');
    });
  }
}

$(document).ready(function() {
  Promo.init();
});

$(window).resize(function() {
  Promo.setHeaderSize();
});
