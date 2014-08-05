// Generated by CoffeeScript 1.7.1
(function() {
  var Sahli, ansiorascii, arraytocolor, booltoint, colortoarray, colortoname, dec2hex, dumpjson, hex2dec, inttobool, loadsahli, newsahli, statustobool;

  $(function() {
    return $("h1").hide().slideDown(500);
  });

  $(function() {
    return $("#newsahli").button({
      disabled: false
    }).click(function() {
      return newsahli();
    });
  });

  $(function() {
    return $("#loadsahli").button({
      disabled: false
    }).click(function() {
      return loadsahli();
    });
  });

  $(function() {
    $(".hidden").hide();
    $("#entryamiga").button({
      icons: {
        primary: "ui-icon-gear"
      }
    }).click(function() {
      var stuff;
      stuff = $(this).children();
      if (this.value === "1") {
        stuff[1].textContent = 'Ansi';
        return this.value = "0";
      } else {
        stuff[1].textContent = 'Ascii';
        return this.value = "1";
      }
    });
    $(".45box").css({
      width: '45%',
      display: 'inline-block'
    });
    $(".groupbox p").css({
      margin: "0 0 .25em 0"
    });
    $("#entryfilepick").change(function() {
      if (this.files[0] != null) {
        return $("#entryfile").val(this.files[0].name);
      }
    });
    return $("#entryfile").click(function() {
      return $("#entryfilepick").click();
    });
  });

  Sahli = (function() {
    function Sahli() {
      this.emptyfiledef = {
        "file": "",
        "name": "",
        "amiga": true,
        "width": "",
        "author": "",
        "font": "Propaz",
        "color": [0, 0, 0, 0],
        "bg": [0, 0, 0, 0],
        "line1": "",
        "line2": "",
        "text": ""
      };
      this.emptyslidesdef = {
        "background": "",
        "template": "",
        "css": ""
      };
      this.empty = {
        "slides": this.emptyslidesdef,
        "filedata": []
      };
    }

    Sahli.prototype.loader = function() {
      return $.ajax({
        url: '../list.sahli',
        dataType: "json",
        success: (function(_this) {
          return function(result) {
            _this.data = result;
            return _this.edit();
          };
        })(this)
      });
    };

    Sahli.prototype.edit = function() {
      $('#buttonbox').hide();
      $('#listsave').button({
        icons: {
          primary: "ui-icon-disk"
        }
      }).click((function(_this) {
        return function() {
          return console.log(dumpjson(_this.data));
        };
      })(this));
      return this.buildlist(this.data);
    };

    Sahli.prototype.buildlist = function(data) {
      var item, x, _i, _len, _ref;
      $('#list').show(100);
      x = 0;
      _ref = this.data.filedata;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        $('#sortlist').append(this.additem(item, x++));
      }
      return $('#sortlist').sortable({
        start: function(event, ui) {
          return ui.item.data({
            startpos: ui.item.index()
          });
        },
        stop: (function(_this) {
          return function(event, ui) {
            var e, name, s, _j, _len1, _ref1;
            s = ui.item.data().startpos;
            e = ui.item.index();
            _this.data.filedata = _this.rearrangearray(s, e, _this.data.filedata);
            _ref1 = _this.data.filedata;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              name = _ref1[_j];
              console.log(name.author);
            }
            return console.log('---');
          };
        })(this)
      });
    };

    Sahli.prototype.rearrangearray = function(startpos, endpos, a) {
      var alen, moving, tarr;
      moving = a[startpos];
      alen = a.length;
      tarr = a.slice(0, startpos).concat(a.slice(startpos + 1));
      return tarr.slice(0, endpos).concat([moving].concat(tarr.slice(endpos)));
    };

    Sahli.prototype.additem = function(item, pos) {
      var entry;
      entry = this.genentryline(item, pos);
      return entry.dblclick((function(_this) {
        return function() {
          return _this.editline(item, pos);
        };
      })(this));
    };

    Sahli.prototype.genentryline = function(item, pos) {
      var amigastatus, arrows, delbutton, entry;
      arrows = "<span class='ui-icon ui-icon-arrowthick-2-n-s'></span>";
      amigastatus = ansiorascii(booltoint(item.amiga));
      delbutton = $("<span class='righty' id=del-" + pos + ">delete</span>").click((function(_this) {
        return function(event) {
          pos = this.id.replace("del-", "");
          console.log(_this.data.filedata.splice(pos, 1));
          return this.parentNode.remove();
        };
      })(this));
      entry = $("<li class='entry' id='" + item.file + "'>" + arrows + amigastatus + " | " + item.author + " : " + item.name + " : " + item.file + "</li>");
      return entry.append(delbutton);
    };

    Sahli.prototype.save = function() {
      var entry, pos;
      pos = $("#entryindex").val();
      entry = this.data.filedata[pos];
      entry.name = $("#entryname").val();
      entry.author = $("#entryauthor").val();
      entry.amiga = statustobool($("#entryamiga").children()[1].textContent);
      console.log($("#entryamiga").children()[1].textContent, entry.amiga, entry.author);
      entry.color = colortoarray($("#entrycolor").val());
      entry.bg = colortoarray($("#entrybg").val());
      entry.width = $("#entrywidth").val();
      entry.line1 = $("#entryline1").val();
      entry.line2 = $("#entryline2").val();
      entry.text = $("#entrytext").val();
      return entry.file = $("#entryfile").val();
    };

    Sahli.prototype.editline = function(data, pos) {
      $("#formica").dialog({
        width: '800',
        modal: false,
        title: "Entry " + data.file + " ",
        buttons: [
          {
            text: "Cancel",
            icons: {
              primary: 'ui-icon-trash'
            },
            click: function() {
              return $(this).dialog("close");
            }
          }, {
            text: "Save",
            icons: {
              primary: 'ui-icon-disk'
            },
            click: (function(_this) {
              return function(event) {
                event.preventDefault();
                _this.save();
                return $(this).dialog("close");
              };
            })(this)
          }
        ]
      });
      data.amiga = booltoint(data.amiga);
      $("#entryindex").val(pos);
      $("#entryname").val(data.name);
      $("#entryauthor").val(data.author);
      $("#entryamiga").val(data.amiga);
      $("#entryamiga").children()[1].textContent = ansiorascii(data.amiga);
      $("#entryfont").val(data.font);
      $("#entrycolor").val(colortoname(arraytocolor(data.color)));
      $("#entrybg").val(colortoname(arraytocolor(data.bg)));
      $("#entrywidth").val(data.width);
      $("#entryline1").val(data.line1);
      $("#entryline2").val(data.line2);
      $("#entrytext").val(data.text);
      return $("#entryfile").val(data.file);
    };

    return Sahli;

  })();

  dumpjson = function(obj) {
    return JSON.stringify(obj, null, "\t");
  };

  booltoint = function(bool) {
    return bool + 1 - 1;
  };

  inttobool = function(intstr) {
    return (intstr === 1).toString();
  };

  statustobool = function(status) {
    if (status === 'Ascii') {
      return true;
    } else {
      return false;
    }
  };

  ansiorascii = function(status) {
    if (status === 0) {
      return "Ansi";
    } else {
      return "Ascii";
    }
  };

  dec2hex = function(num) {
    return "" + (('000' + num.toString(16)).slice(-2));
  };

  hex2dec = function(num) {
    return parseInt(num, 16);
  };

  arraytocolor = function(array) {
    var c, x;
    c = ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        x = array[_i];
        _results.push(dec2hex(x));
      }
      return _results;
    })()).slice(0, 3).join('');
    return "#" + c;
  };

  colortoarray = function(color) {
    var c1, i, x;
    color = color.slice(1);
    c1 = [color.slice(0, 2), color.slice(2, 4), color.slice(4, 6)];
    x = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = c1.length; _i < _len; _i++) {
        i = c1[_i];
        _results.push(hex2dec(i));
      }
      return _results;
    })();
    x.push(0);
    return x;
  };

  colortoname = function(color) {
    var names, x;
    names = {
      "#E0E0E0": "Light Grey",
      "#A0A0E0": "Light Blue",
      "#9AFE2E": "Light Green",
      "#FF0000": "Red",
      "#FF8000": "Orange",
      "#FFFF00": "Yellow",
      "#00f000": "Green",
      "#2EFEF7": "Cyan",
      "#2EFEF7": "Blue",
      "#0B0B3B": "Navy",
      "#FF00FF": "Magenta",
      "#8000FF": "Purple",
      "#0A2A0A": "Dark Green",
      "#3B3B3B": "Dark Grey",
      "#FFFFFF": "White",
      "#000000": "Black"
    };
    color = color.toUpperCase();
    return x = hex2dec(color.slice(1)) > 8421504 ? "#FFFFFF" : "#000000";
  };

  newsahli = function() {
    var sahli;
    sahli = new Sahli;
    sahli.data = sahli.empty;
    sahli.data.filedata.push(sahli.emptyfiledef);
    return sahli.edit();
  };

  loadsahli = function() {
    var sahli;
    sahli = new Sahli;
    return sahli.loader('list.sahli');
  };

}).call(this);
