// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ImageTextModePCBoard = (function(_super) {
    __extends(ImageTextModePCBoard, _super);

    function ImageTextModePCBoard(options) {
      var k, v;
      ImageTextModePCBoard.__super__.constructor.apply(this, arguments);
      this.tabstop = 8;
      this.linewrap = 80;
      this.codes = {
        POFF: '',
        WAIT: ''
      };
      for (k in options) {
        if (!__hasProp.call(options, k)) continue;
        v = options[k];
        this[k] = v;
      }
    }

    ImageTextModePCBoard.prototype.parse = function(content) {
      var ch, code, i, key, val, _i, _j, _ref, _results;
      this.screen = [];
      this.state = 0;
      this.x = 0;
      this.y = 0;
      this.attr = 7;
      _ref = this.codes;
      for (key in _ref) {
        val = _ref[key];
        code = new RegExp('@' + key + '@', 'g');
        content.replace(code, val);
      }
      content = content.split('');
      _results = [];
      while (ch = content.shift()) {
        if (this.state === 0) {
          switch (ch) {
            case "\x1a":
              _results.push(this.state = 2);
              break;
            case '@':
              _results.push(this.state = 1);
              break;
            case "\n":
              this.x = 0;
              _results.push(this.y++);
              break;
            case "\r":
              break;
            case "\t":
              i = (this.x + 1) % this.tabstop;
              _results.push((function() {
                var _results1;
                _results1 = [];
                while (i-- > 0) {
                  _results1.push(this.putpixel(' '));
                }
                return _results1;
              }).call(this));
              break;
            default:
              _results.push(this.putpixel(ch));
          }
        } else if (this.state === 1) {
          if (ch === 'X') {
            this.attr = (parseInt(content.shift(), 16) << 4) + parseInt(content.shift(), 16);
          } else if (ch + content.slice(0, 3).join('') === 'CLS@') {
            for (_i = 1; _i <= 3; _i++) {
              content.shift();
            }
            this.screen = [];
          } else if (ch + content.slice(0, 3).join('') === 'POS:') {
            for (_j = 1; _j <= 3; _j++) {
              content.shift();
            }
            this.x = content.shift();
            if (content[0] !== '@') {
              this.x += content.shift();
            }
            this.x--;
            content.shift();
          } else {
            this.putpixel('@');
            this.putpixel(ch);
          }
          _results.push(this.state = 0);
        } else if (this.state === 2) {
          break;
        } else {
          _results.push(this.state = 0);
        }
      }
      return _results;
    };

    ImageTextModePCBoard.prototype.putpixel = function(ch) {
      if (this.screen[this.y] == null) {
        this.screen[this.y] = [];
      }
      this.screen[this.y][this.x] = {
        ch: ch,
        attr: this.attr
      };
      if (++this.x >= this.linewrap) {
        this.x = 0;
        return this.y++;
      }
    };

    return ImageTextModePCBoard;

  })(this.ImageTextMode);

}).call(this);
