// Generated by CoffeeScript 1.7.1
(function() {
  var Sahli, ansiorascii, arraytocolor, booltoint, colorindex, colortoarray, colortoname, dec2hex, dumpjson, emptyfiledef, hex2dec, inttobool, loadsahli, newsahli, resolvefiletype, statustobool;

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

  emptyfiledef = (function() {
    function emptyfiledef() {
      this.file = "";
      this.name = "";
      this.amiga = true;
      this.filetype = 'plain';
      this.width = "";
      this.author = "";
      this.font = "Propaz";
      this.color = [255, 255, 255, 255];
      this.bg = [0, 0, 0, 0];
      this.line1 = "";
      this.line2 = "";
      this.text = "";
    }

    return emptyfiledef;

  })();

  Sahli = (function() {
    function Sahli() {
      this.emptyfiledef = new emptyfiledef;
      this.bob = {
        "file": "",
        "name": "",
        "amiga": true,
        "filetype": 'plain',
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
        "location": "",
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
      $('#dirlocation').change((function(_this) {
        return function(event) {
          return _this.data.location = event.target.value;
        };
      })(this));
      $('#listsave').button({
        icons: {
          primary: "ui-icon-disk"
        }
      }).click((function(_this) {
        return function() {
          $('#sahlioutput').text(dumpjson(_this.data));
          $('#dumparea').show(100);
          return console.log(dumpjson(_this.data));
        };
      })(this));
      $('#listlist').button({
        icons: {
          primary: "ui-icon-folder-open"
        }
      }).click((function(_this) {
        return function() {
          return alert('clicked');
        };
      })(this));
      $('#listappend').button({
        icons: {
          primary: "ui-icon-1-n"
        }
      }).click((function(_this) {
        return function(event) {
          var newentry;
          newentry = new emptyfiledef;
          _this.data.filedata.push(newentry);
          return _this.buildlist(_this.data);
        };
      })(this));
      $('#listdisplay').button({
        icons: {
          primary: "ui-icon-refresh"
        }
      }).click((function(_this) {
        return function() {
          return _this.buildlist(_this.data);
        };
      })(this));
      $('#closespan').click(function() {
        $(this.parentElement.parentElement).hide();
        return $('#sahlioutput').text('');
      });
      return this.buildlist(this.data);
    };

    Sahli.prototype.buildlist = function(data) {
      var i, item, x, _i, _j, _len, _len1, _ref, _ref1;
      $('#list').show(100);
      $('#list ol li').remove();
      _ref = this.data.filedata;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        console.log(i.author);
      }
      x = 0;
      $('#dirlocation').val(this.data.location);
      _ref1 = this.data.filedata;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        item = _ref1[_j];
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
            var e, name, s, _k, _len2, _ref2;
            s = ui.item.data().startpos;
            e = ui.item.index();
            _this.data.filedata = _this.rearrangearray(s, e, _this.data.filedata);
            _ref2 = _this.data.filedata;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              name = _ref2[_k];
              console.log(name.author, name.name, name.file);
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
          pos = event.currentTarget.id.replace("del-", "");
          _this.data.filedata.splice(pos, 1);
          return _this.buildlist(_this.data);
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
      entry.file = $("#entryfile").val();
      return this.buildlist(this.data);
    };

    Sahli.prototype.editline = function(data, pos) {
      var bcol, fcol;
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
                return event.currentTarget.previousElementSibling.click();
              };
            })(this)
          }
        ]
      });
      data.amiga = booltoint(data.amiga);
      fcol = colortoname(arraytocolor(data.color));
      bcol = colortoname(arraytocolor(data.bg));
      $("#entryindex").val(pos);
      $("#entryname").val(data.name);
      $("#entryauthor").val(data.author);
      $("#entryfiletpye").val(data.filetype);
      $("#entryfiletype").children()[resolvefiletype(data.filetype)].selected = true;
      $("#entryamiga").val(data.amiga);
      $("#entryamiga").children()[1].textContent = ansiorascii(data.amiga);
      $("#entryfont").val(data.font);
      $("#entrycolor").val(fcol);
      $("#entrycolor").children()[colorindex(fcol)].selected = true;
      $("#entrybg").val(bcol);
      $("#entrybg").children()[colorindex(bcol)].selected = true;
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

  resolvefiletype = function(filetype) {
    var options;
    options = {
      "plain": 0,
      "ansi": 1,
      "xbin": 2,
      "ice": 3,
      "adf": 4,
      "avatar": 5,
      "bin": 6,
      "idf": 7,
      "pcboard": 8,
      "tundra": 9
    };
    return options[filetype];
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
    var bw, colorname, names, ret;
    names = {
      "#E0E0E0": "Light Grey",
      "#A0A0E0": "Light Blue",
      "#9AFE2E": "Light Green",
      "#FF0000": "Red",
      "#FF8000": "Orange",
      "#FFFF00": "Yellow",
      "#00F000": "Green",
      "#2EFEF7": "Cyan",
      "#002EF7": "Blue",
      "#0B0B3B": "Navy",
      "#FF00FF": "Magenta",
      "#8000FF": "Purple",
      "#0A2A0A": "Dark Green",
      "#3B3B3B": "Dark Grey",
      "#FFFFFF": "White",
      "#000000": "Black"
    };
    color = color.toUpperCase();
    colorname = names[color];
    bw = hex2dec(color.slice(1)) > 8421504 ? 'White' : "Black";
    return ret = colorname != null ? colorname : bw;
  };

  colorindex = function(colorname) {
    var names;
    names = {
      "Light Grey": 0,
      "Light Blue": 1,
      "Light Green": 2,
      "Red": 3,
      "Orange": 4,
      "Yellow": 5,
      "Green": 6,
      "Cyan": 7,
      "Blue": 8,
      "Navy": 9,
      "Magenta": 10,
      "Purple": 11,
      "Dark Green": 12,
      "Dark Grey": 13,
      "White": 14,
      "Black": 15
    };
    return names[colorname];
  };

  newsahli = function() {
    var newentry, sahli;
    sahli = new Sahli;
    sahli.data = sahli.empty;
    newentry = new emptyfiledef;
    sahli.data.filedata.push(newentry);
    return sahli.edit();
  };

  loadsahli = function() {
    var sahli;
    sahli = new Sahli;
    return sahli.loader('list.sahli');
  };

}).call(this);
